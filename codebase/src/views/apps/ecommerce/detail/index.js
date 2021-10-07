// ** React Imports
import { useEffect, useState, Fragment } from 'react'
import { useParams } from 'react-router-dom'

// ** Product detail components
import ItemFeatures from './ItemFeatures'
import ProductDetails from './ProductDetails'
import RelatedProducts from './RelatedProducts'

// ** Third Party Components
import { Card, CardBody } from 'reactstrap'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../store/actions'
import { getProductsData } from '../../../../redux/actions/clients'

import '@styles/base/pages/app-ecommerce-details.scss'

const Details = () => {
  // ** Vars
  const params = useParams().product
  const productId = params
  const [relatedProducts, setRelatedProducts] = useState([])
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.ecommerce)
  const { allProducts } = useSelector(state => state.products)

  // ** ComponentDidMount : Get product
  useEffect(() => {
    dispatch(getProduct(productId))
  }, [productId])
  useEffect(() => {
    dispatch(getProductsData())
  }, [])
  useEffect(() => {
    const newArr = allProducts.filter(item => item.id !== productId)
    setRelatedProducts(newArr)
  }, [allProducts, productId])

  return (
    <Fragment>
      <div className='app-ecommerce-details'>
        {Object.keys(store.productDetail).length ? (
          <Card>
            <CardBody>
              <ProductDetails
                dispatch={dispatch}
                productId={productId}
                getProduct={getProduct}
                data={store.productDetail}
              />
            </CardBody>
            {/* <ItemFeatures /> */}
            <CardBody>
              <RelatedProducts relatedProds={relatedProducts} />
            </CardBody>
          </Card>
        ) : null}
      </div>
    </Fragment>
  )
}

export default Details
