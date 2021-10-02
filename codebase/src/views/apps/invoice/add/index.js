// ** Invoice Add Components
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddCard from './AddCard'
import AddActions from './AddActions'

// ** Third Party Components
import { Row, Col } from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'

const InvoiceAdd = () => {
  const { userData } = useSelector(state => state.auth)

  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser(userData)
  }, [userData])

  return (
    <div className='invoice-add-wrapper'>
      <Row className='invoice-add d-flex justify-content-center'>
        <Col xl={9} md={8} sm={12} xsm={12}>
          <AddCard userData={user} />
        </Col>
      </Row>
    </div>
  )
}

export default InvoiceAdd
