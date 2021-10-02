const initialState = {
  data: [],
  total: 1,
  params: {},
  allData: [],
  createInvoice: {},
  invoiceCreatorDetails: {},
  selectedInvoice: {}
}

const invoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_INVOICE_DATA':
      return {
        ...state,
        allData: action.allData,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'SET_FORM_DATA':
      let createInvoice = state.createInvoice
      createInvoice = {
        ...createInvoice,
        [action.data.formID]: action.data.details
      }
      return {
        ...state,
        createInvoice
      }

    case 'INVOICE_CREATOR_DETAILS':
      return { ...state, invoiceCreatorDetails: action.data }
    case 'DELETE_INVOICE_DATA':
      const Data = state.createInvoice
      delete Data[action.data]
      return { ...state, createInvoice: Data }
    case 'GET_SINGLE_INVOICE':
      return { ...state, selectedInvoice: action.data }
    case 'DELETE_INVOICE':
     
      return { ...state }

    default:
      return { ...state }
  }
}
export default invoiceReducer
