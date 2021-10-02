// ** React Imports
import { useEffect, useState } from 'react'
import { firestore } from '@src/utility/firebase'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

// ** Third Party Components
import classnames from 'classnames'
import { Star, ShoppingCart, Heart } from 'react-feather'
import { Card, CardBody, CardText, Button, Badge } from 'reactstrap'

const SingleProductCard = ({ item }) => {
  const { userData } = useSelector(state => state.auth)
  const properUser = userData.user
  const [details, setDetails] = useState({})
  useEffect(async () => {
    if (item.brand) {
      const ref = firestore
        .collection('categories')
        .doc(typeof item.brand !== 'object' ? item.brand : item.brand.id)
      const doc = await ref.get()
      if (!doc.exists) {
        console.log('not found user')
      }
      const data = doc.data()
      data.id = item.brand
      item = { ...item, brand: data }
      setDetails(item)
    }
  }, [properUser])

  function PriceDisplay () {
    if (properUser && properUser.categories && details.brand) {
      const found = properUser.categories.filter(
        item => item.title === details.brand.categoryName
      )
      if (found.length > 0) {
        return found[0].value
      } else {
        return details.brand.price
      }
    } else if (details.brand) {
      return details.brand.price
    }
  }
  return (
    <Card className='ecommerce-card' key={item.name}>
      <div className='item-img text-center mx-auto'>
        <Link to={`/product-detail/${item.id}`}>
          <img
            className='img-fluid card-img-top'
            src={item.img}
            alt={item.name}
          />
        </Link>
      </div>
      <CardBody>
        <div className='item-wrapper'>
          <div className='item-rating'>
            <ul className='unstyled-list list-inline'>
              {new Array(5).fill().map((listItem, index) => {
                return (
                  <li key={index} className='ratings-list-item mr-25'>
                    <Star
                      className='filled-star'
                      // className={classnames({
                      //   'filled-star': index + 1 <= item.rating,
                      //   'unfilled-star': index + 1 > item.rating
                      // })}
                    />
                  </li>
                )
              })}
            </ul>
          </div>
          <div className='item-cost'>
            <h6 className='item-price'>
              $ {PriceDisplay() ? PriceDisplay() : item.price}
            </h6>
          </div>
        </div>
        <h6 className='item-name'>
          <Link className='text-body' to={`/product-detail/${item.id}`}>
            {item.name}
          </Link>
          <CardText tag='span' className='item-company'>
            By{' '}
            <a
              className='company-name'
              href='/'
              onClick={e => e.preventDefault()}
            >
              {item.brand}
            </a>
          </CardText>
        </h6>
        <CardText className='item-description'>{item.description}</CardText>
      </CardBody>
      <div className='item-options text-center'>
        <div className='item-wrapper'>
          <div className='item-cost'>
            <h4 className='item-price'>${item.price}</h4>
            {item.hasFreeShipping ? (
              <CardText className='shipping'>
                <Badge color='light-success'>Free Shipping</Badge>
              </CardText>
            ) : null}
          </div>
        </div>
        <Button
          color='primary'
          tag={Link}
          to={`/product-detail/${item.id}`}
          className='btn-cart move-cart'

          /*eslint-disable */

          /*eslint-enable */
        >
          <ShoppingCart className='mr-50' size={14} />
          <span>{item.isInCart ? 'View In Cart' : 'Add To Cart'}</span>
        </Button>
      </div>
    </Card>
  )
}

export default SingleProductCard
