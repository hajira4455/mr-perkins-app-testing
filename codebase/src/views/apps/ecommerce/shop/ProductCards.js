// ** React Imports
import { Link } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import { Star, ShoppingCart, Heart } from 'react-feather'
import { Card, CardBody, CardText, Button, Badge } from 'reactstrap'
import SingleProductCard from './SingleProductCard'
const ProductCards = props => {
  // ** Props
  const { products, activeView } = props

  //  * Renders products
  const renderProducts = () => {
    if (products.length) {
      return products.map(item => {
        return <SingleProductCard key={`item-${item.id}`} item={item} />
      })
    }
  }

  return (
    <div
      className={classnames({
        'grid-view': activeView === 'grid',
        'list-view': activeView === 'list'
      })}
    >
      {renderProducts()}
    </div>
  )
}

export default ProductCards
