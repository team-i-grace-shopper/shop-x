import axios from 'axios'
import history from '../history'

//action types
const GET_PRODUCTS = 'GET_PRODUCTS'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

//action creators
export const getProducts = requestedProducts => ({
  type: GET_PRODUCTS,
  requestedProducts
})

export const removeProduct = requestedProduct => ({
  type: DELETE_PRODUCT,
  requestedProduct
})

//state
const initialState = []

//thunk
export const fetchProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products`)
      dispatch(getProducts(data || initialState))
      history.push('/shop')
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteProduct = id => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/products/${id}`)
      dispatch(removeProduct(data || initialState))
    } catch (error) {
      console.log(error)
    }
  }
}

//reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {...state, products: action.requestedProducts}
    case DELETE_PRODUCT:
      return {...state}
    default:
      return state
  }
}
