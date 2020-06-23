import history from '../history'

/**
 * ACTION TYPES
 */
const ADD_PRODUCT = 'ADD_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const EMPTY_CART = 'EMPTY_CART'
/**
 * INITIAL STATE
 */
//
const defaultCart = {
  addedItems: [],
  cartTotal: 0
}

/**
 * ACTION CREATORS
 */
const addProduct = product => ({type: ADD_PRODUCT, product})
const removeProduct = productId => ({type: REMOVE_PRODUCT, productId})
const emptyCart = () => ({type: EMPTY_CART})
/**
 * THUNK CREATORS
 */
export const addProductFromServer = id => async dispatch => {
  try {
    // TODO: update path to product
    const res = await axios.get('/api/products/:id')
    dispatch(addProduct(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const addProductFromLocalStore = () => dispatch => {
  try {
    const data = window.localStorage.getItem('cart')
    dispatch(addProduct(data))
  } catch (error) {
    console.log(error)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultCart, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        addedItems: [...state, action.product],
        currentTotal: state.currentTotal + action.product.price
      }
    case REMOVE_PRODUCT: {
      const updatedOrder = state.addedItems.filter(
        product => product.id !== action.productId
      )
      const updatedCartTotal = state.cartTotal - action.product.price

      return {
        addedItems: updatedOrder,
        currentTotal: updatedCartTotal
      }
    }
    case EMPTY_CART:
      return defaultCart

    default:
      return state
  }
}
