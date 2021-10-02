// ** React Imports
import InnerProduct from './innerProduct'
import { Row } from 'reactstrap'

const ProductCards = props => {
  // ** Props
  const { products } = props

  // ** Handle Move/Add to cart

  // ** Handle Wishlist item toggle

  // ** Renders products
  const renderProducts = () => {
    if (products.length) {
      return products.map(item => {
        return <InnerProduct item={item} key={item.id} />
      })
    }
  }

  return <Row>{renderProducts()}</Row>
}

export default ProductCards
