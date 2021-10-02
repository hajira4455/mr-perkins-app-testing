// **  Initial State
const initialState = {
  userData: {},
  isAuthenticated: {
    authenticated: JSON.parse(localStorage.getItem("userData"))
  }
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        userData: action.data,
        [action.config.storageTokenKeyName]:
          action[action.config.storageTokenKeyName],
        [action.config.storageRefreshTokenKeyName]:
          action[action.config.storageRefreshTokenKeyName]
      }
    case 'LOGIN_WITH_EMAIL': {
      return {
        ...state,
        userData: action.payload,
        isAuthenticated: {
          authenticated: true
        }
      }
    }
    case 'CHANGE_AUTHENTICATED': {
      return { ...state, isAuthenticated: action.payload }
    }
    case 'LOGOUT':
      const obj = { ...action }
      delete obj.type
      return {
        ...state,
        userData: {},
        ...obj,
        isAuthenticated: {
          authenticated: false
        }
      }
    default:
      return state
  }
}

export default authReducer
