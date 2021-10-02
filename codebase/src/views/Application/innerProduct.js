import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { firestore } from '@src/utility/firebase'
import { Card, CardBody, CardText, Col, Badge } from 'reactstrap'
import { useSelector } from 'react-redux'
const InnerProduct = ({ item }) => {
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
    <Col md={3} key={`product${item.id}`}>
      <Card className='ecommerce-card' key={item.name}>
        <div className='item-img text-center'>
          <Link to={`/product-detail/${item.id}`}>
            <div
              className='imageContainer'
              style={{
                width: '100%',
                height: '300px',
                marginRight: '10px',
                backgroundImage: `url(${item.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            ></div>
          </Link>
        </div>
        <CardBody>
          <div className='item-wrapper'>
            <div className='item-cost'>
              <h6 className='item-price'>
                {' '}
                ${PriceDisplay() ? PriceDisplay() : item.price}
              </h6>
            </div>
          </div>
          <h6 className='item-name'>
            <Link
              className='text-body'
              to={`/apps/ecommerce/product-detail/${item.slug}`}
            >
              {item.name}
            </Link>
            {item.brand ? (
              <CardText tag='span' className='item-company'>
                <br />
                By {details.brand ? details.brand.categoryName : ''}
              </CardText>
            ) : (
              ''
            )}
          </h6>
          <CardText className='item-description'>{item.description}</CardText>
        </CardBody>
        <div className='item-options text-center'>
          <div className='item-wrapper'>
            <div className='item-cost'>
              <h4 className='item-price'>
                ${PriceDisplay() ? PriceDisplay() : item.price}
              </h4>
              {item.hasFreeShipping ? (
                <CardText className='shipping'>
                  <Badge color='light-success'>Free Shipping</Badge>
                </CardText>
              ) : null}
            </div>
          </div>
        </div>
      </Card>
    </Col>
  )
}

export default InnerProduct
