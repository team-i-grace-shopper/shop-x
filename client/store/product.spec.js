/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {products, fetchProducts, removeProduct} from './allProducts'
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
      mockAxios.onGet('/api/products').replyOnce(200, fakeExp)
      await store.dispatch(fetchProducts())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_PRODUCTS')
      console.log('actions', actions[0])
      expect(actions[0].requestedProducts).to.be.deep.equal(fakeExp)
    })
  })

  describe('deleteProduct', () => {
    it('dispatches the REMOVE PRODUCT action', async () => {
      const fakeExp = {
        id: 1,
        name: 'PHILADELPHIA DISCOVERY FLIGHT LESSON',
        description:
          'Get into the pilot seat, learn the basics of aviation and take the controls of a single engine light aircraft during this half hour Introductory Flying Lesson. The adventure begins when you meet your Certified Flight Instructor at the Cross Keys Airport in Williamstown, New Jersey!'
      }
      console.log('mock', mockAxios.axiosInstance.delete)
      mockAxios.axiosInstance.delete('/api/products/1')
      const actions = store.getActions()
      await store.dispatch(removeProduct())
      expect(actions[0].type).to.be.equal('DELETE_PRODUCT')
      expect(actions[0].requestedProducts).to.be.deep.equal(undefined)
    })
  })
})
