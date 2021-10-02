// ** React Imports
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

// ** Third Party Components
import { Card, CardBody, Button, Input, CustomInput, Label } from 'reactstrap'

const AddActions = () => {
  return (
    <Fragment>
      <Card className='invoice-action-wrapper'>
        <CardBody>
          <Button.Ripple color='primary' block className='mb-75'>
            Save Order
          </Button.Ripple>
          <Button.Ripple color='primary' block outline className='mb-75'>
            Preview
          </Button.Ripple>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default AddActions
