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
  const [data, setData] = useState()

  // ** Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.ecommerce)

  // ** Get products
  useEffect(() => {
    setData(store)
    const dubStore = { ...store }
    dubStore.products.sort(function (a, b) {
      return a.category - b.category
    })
    setData(dubStore)
    dispatch(
      getProducts({
        q: '',
        sortBy: 'featured',
        perPage: 100,
        page: 1
      })
    )
  }, [dispatch])
  return (
    <Fragment>
      {data && data.products &&
        <Products
          store={data}
          dispatch={dispatch}
          activeView={activeView}
          getProducts={getProducts}
          setActiveView={setActiveView}
        />}
    </Fragment>
  )
}
export default Shop
