const initialState = {
  products: [],
  wishlist: [],
  cart: [],
  productDetail: {},
  params: {},
  totalProducts: 0
}

const ecommerceReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return {
        ...state,
        products: action.data.products,
        params: action.data.params,
        totalProducts: action.data.total
      }
    case 'GET_WISHLIST':
      return { ...state, wishlist: action.data.products }
    case 'DELETE_WISHLIST_ITEM':
      return { ...state }
    case 'GET_CART':
      return { ...state, cart: action.data.products }
    case 'DELETE_CART_ITEM':
      return { ...stagetProductste }
    case 'ADD_TO_WISHLIST':
      return { ...state }
    case 'ADD_TO_CART':
      return { ...state }
    case 'GET_PRODUCT':
      return { ...state, productDetail: action.data }
    default:
      return state
  }
}

export default ecommerceReducer
