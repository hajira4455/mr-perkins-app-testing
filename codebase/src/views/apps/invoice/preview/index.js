import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// ** Third Party Components
import axios from 'axios'
import { Row, Col, Alert } from 'reactstrap'

// ** Invoice Preview Components
import PreviewCard from './PreviewCard'
import PreviewActions from './PreviewActions'
import SendInvoiceSidebar from '../shared-sidebar/SidebarSendInvoice'
import AddPaymentSidebar from '../shared-sidebar/SidebarAddPayment'
import { GetSingleInvoice } from '../store/actions'
// ** Styles
import '@styles/base/pages/app-invoice.scss'

const InvoicePreview = () => {
  // ** Vars
  const dispatch = useDispatch()
  const { id } = useParams()
  // ** States
  const [data, setData] = useState(null)
  const [sendSidebarOpen, setSendSidebarOpen] = useState(false)
  const [addPaymentOpen, setAddPaymentOpen] = useState(false)
  const { selectedInvoice } = useSelector(state => state.invoice)
  const { userData } = useSelector(state => state.auth)
  // ** Functions to toggle add & send sidebar
  const toggleSendSidebar = () => setSendSidebarOpen(!sendSidebarOpen)
  const toggleAddSidebar = () => setAddPaymentOpen(!addPaymentOpen)

  // ** Get invoice on mount based on id
  useEffect(() => {
    dispatch(GetSingleInvoice(id))
  }, [])
  useEffect(() => {
    setData(selectedInvoice)
  }, [selectedInvoice])

  return data !== null ? (
    <div className='invoice-preview-wrapper'>
      <Row className='invoice-preview'>
        <Col  xl={9} md={8} sm={12}>
          <PreviewCard data={data} userData={userData} />
        </Col>
  
        <Col xl={3} md={4} sm={12}>
          <PreviewActions
            id={id}
            setSendSidebarOpen={setSendSidebarOpen}
            setAddPaymentOpen={setAddPaymentOpen}
          />
        </Col>
      </Row>
      <SendInvoiceSidebar
        toggleSidebar={toggleSendSidebar}
        open={sendSidebarOpen}
      />
      <AddPaymentSidebar
        toggleSidebar={toggleAddSidebar}
        open={addPaymentOpen}
      />
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>Invoice not found</h4>
      <div className='alert-body'>
        Invoice with id: {id} doesn't exist. Check list of all invoices:{' '}
        <Link to='/orders'>Invoice List</Link>
      </div>
    </Alert>
  )
}

export default InvoicePreview
