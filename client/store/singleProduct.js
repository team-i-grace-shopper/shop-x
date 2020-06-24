import axios from 'axios'

//action types
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

//action creators
export const getSingleProduct = product => ({
  type: GET_SINGLE_PRODUCT,
  product
})

//state
const initialState = {}

//thunk
export function fetchSingleProductThunk(id) {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${id}`)
      dispatch(getSingleProduct(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}
