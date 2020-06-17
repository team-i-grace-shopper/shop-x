/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {products, fetchProducts} from './allProducts'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {products: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchProducts', () => {
    it('dispatches the GET PRODUCTS action', async () => {
      const fakeExp = {
        name: 'PHILADELPHIA DISCOVERY FLIGHT LESSON',
        description:
          'Get into the pilot seat, learn the basics of aviation and take the controls of a single engine light aircraft during this half hour Introductory Flying Lesson. The adventure begins when you meet your Certified Flight Instructor at the Cross Keys Airport in Williamstown, New Jersey!'
      }
      mockAxios.onGet('/api/shop').replyOnce(200, fakeExp)
      await store.dispatch(fetchProducts())
      const actions = store.getActions()
      console.log('*****', actions)
      expect(actions[0].type).to.be.equal('GET_PRODUCTS')
      expect(actions[0].products).to.be.deep.equal(fakeExp)
    })
  })
})
