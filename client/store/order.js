import axios from 'axios'

//action types
const POST_ORDER = 'POST_ORDER'

//action creators
export const postSingleOrder = products => ({
  type: POST_ORDER,
  products
})

//state
const initialState = []

//thunk
export function postSingleOrderThunk() {
  return async dispatch => {
    try {
      const arrayOfProducts = JSON.parse(localStorage.getItem('cart'))
      console.log('ARRAY OF PRODUCTS IN THUNK', arrayOfProducts)
      const {data} = await axios.post(`/api/cart`, {products: arrayOfProducts})
      dispatch(postSingleOrder(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case POST_ORDER:
      return action.products
    default:
      return state
  }
}
