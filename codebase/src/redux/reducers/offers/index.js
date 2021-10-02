// ** Initial State
const initialState = {
  offers: []
}

const OffersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_OFFERS':
      return { ...state, offers: action.data }

    case 'Offer_Delete':
      const cats = state.offers
      cats.splice(
        cats.indexOf(cats.filter(item => item.id === action.id)[0]),
        1
      )
      return { ...state, offers: cats }
    default:
      return state
  }
}

export default OffersReducer
