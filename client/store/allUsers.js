import axios from 'axios'

// ACTION TYPE(S)
const GET_ALL_USERS = 'GET_ALL_USERS'

// ACTION CREATOR(S)
export const getAllUsers = allUsers => ({
  type: GET_ALL_USERS,
  allUsers
})

// INITIAL STATE
const initialState = []

// THUNK CREATOR(S)
export const getAllUsersFromServer = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/users')
      dispatch(getAllUsers(data || initialState))
    } catch (error) {
      console.log(error)
    }
  }
}

// REDUCER
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.allUsers
    default:
      return state
  }
}
