// ** Initial State
const initialState = {
  categories: []
}

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'All_Categories_Fetched':
      return { ...state, categories: action.data }
    case 'Category_Added':
      const categories = [...state.categories, action.data]
      return { ...state, categories }
    case 'Category_Updated':
      console.log(action.data)
      const category = state.categories
      category.filter(item => {
        if (item.id === action.data.id) {
          item.categoryName = action.data.categoryName
          item.price = action.data.price
        }
      })
      return { ...state }
    case 'Category_Delete':
      const cats = state.categories
      cats.splice(
        cats.indexOf(cats.filter(item => item.id === action.id)[0]),
        1
      )
      return { ...state, categories: cats }
    default:
      return state
  }
}

export default CategoryReducer
