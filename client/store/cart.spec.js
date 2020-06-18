/* eslint-disable no-warning-comments */
/* global describe beforeEach afterEach it */

/**
 * Your reducer should get at least one test case for each action it consumes
 * Each action creator deserves a test case (even though they seem very simple - think of it as a free pass)!
 * For thunk creators and thunks, you should test that they:
 * Make the appropriate network request(s) (if they do this)
 * Eventually invoke the dispatch method with certain actions (spying on the dispatch method using sinon is recommended here)
 * Note the emphasis on actions - you should test that the dispatch method is invoked with certain action objects - NOT that certain action creators were invoked (see below)
 * For thunk creators and thunks, you should NOT test:
 * The actual result of the network request - this is the job of your server tests!
 * That certain (synchronous) action creators are invoked - this is the job of your action creator tests.
 */

// TODO: Edit specs to test redux
import {expect} from 'chai'
import {addProductFromServer} from './cart'
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

  const initialState = {user: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('add product to cart', () => {
    it('adds the correct product using the ADD PRODUCT action', async () => {
      const fakeProduct = {
        name: 'Sample Experience',
        description: 'Sample Text',
        price: 99,
        category: 'Miscellaneous'
      }
      mockAxios.onGet('/products').replyOnce(200, fakeProduct)
      await store.dispatch(addProductFromServer())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('ADD_PRODUCT')
      expect(actions[0].product).to.be.deep.equal(fakeProduct)
    })
  })

  // describe('remove product from cart', () => {
  //   it('logout: eventually dispatches the REMOVE_USER action', async () => {
  //     mockAxios.onPost('/auth/logout').replyOnce(204)
  //     await store.dispatch(logout())
  //     const actions = store.getActions()
  //     expect(actions[0].type).to.be.equal('REMOVE_USER')
  //     expect(history.location.pathname).to.be.equal('/login')
  //   })
  // })
})
