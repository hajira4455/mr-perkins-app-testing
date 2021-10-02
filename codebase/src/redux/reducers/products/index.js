// ** Initial State
const initialState = {
  allProducts: [],
  selectedSingleProduct: {}
}

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PRODUCT_DATA':
      return { ...state, allProducts: action.data }
    case 'Selected_single_product':
      return { ...state, selectedSingleProduct: action.data }
    case 'Product_Deleted':
      const allProducts = state.allProducts.filter(
        item => item.id !== action.id
      )
      return { ...state, allProducts }
    default:
      return state
  }
}

export default ProductReducer
