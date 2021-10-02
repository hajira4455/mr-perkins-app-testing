// ** React Imports
import { Row, Col, CardText } from 'reactstrap'
import { Award, Clock, Shield } from 'react-feather'

const ItemFeatures = () => {
  return (
    <div className='item-features'>
      <Row className='text-center'>
        <Col className='mb-4 mb-md-0' md='4' xs='12'>
          <div className='w-75 mx-auto'>
            <Award />
            <h4 className='mt-2 mb-1'>100% Original</h4>
            <CardText>
              This item is completely pure and orginal, and we discourges all
              the people who try or do the fraud with customers
            </CardText>
          </div>
        </Col>
        <Col className='mb-4 mb-md-0' md='4' xs='12'>
          <div className='w-75 mx-auto'>
            <Clock />
            <h4 className='mt-2 mb-1'>2 Day Replacement</h4>
            <CardText>
              if you found any of the product damaged or outdated you can return
              it within 2 days.
            </CardText>
          </div>
        </Col>
        <Col className='mb-4 mb-md-0' md='4' xs='12'>
          <div className='w-75 mx-auto'>
            <Shield />
            <h4 className='mt-2 mb-1'>Wellcome to storage</h4>
            <CardText>
              we will love if you wanna visit our storage where we keep our
              products, to check the quality and housekeeping in storage
            </CardText>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ItemFeatures
