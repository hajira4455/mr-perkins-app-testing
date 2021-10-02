// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Shop Components
import Products from './Products'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../store/actions'

// ** Styles
import '@styles/base/pages/app-ecommerce.scss'

const Shop = () => {
  // ** States
  const [activeView, setActiveView] = useState('grid')

  // ** Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.ecommerce)

  // ** Get products
  useEffect(() => {
    dispatch(
      getProducts({
        q: '',
        sortBy: 'featured',
        perPage: 9,
        page: 1
      })
    )
  }, [dispatch])

  return (
    <Fragment>
      <Products
        store={store}
        dispatch={dispatch}
        activeView={activeView}
        getProducts={getProducts}
        setActiveView={setActiveView}
      />
    </Fragment>
  )
}
export default Shop
