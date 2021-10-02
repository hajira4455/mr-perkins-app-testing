// ** Initial State
const initialState = {
  allData: [],
  data: [],
  total: 1,
  params: {},
  selectedUserInvoices: [],
  selectedUser: null
}

const users = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA':
      return { ...state, allData: action.data }
    case 'GET_DATA':
      return {
        ...state,
        data: action.data.users.length > 0 ? action.data : [],
        total: action.totalPages,
        params: action.params
      }
    case 'GET_USER':
      return { ...state, selectedUser: action.selectedUser }
    case 'GET_USER_INVOICES_DATA':
      return { ...state, selectedUserInvoices: action.data }
    case 'USER_DELETED':
      const allData = state.allData
      allData.splice(
        allData.indexOf(allData.filter(item => item.id === action.id)[0]),
        1
      )
      return { ...state, allData }
    default:
      return { ...state }
  }
}
export default users
