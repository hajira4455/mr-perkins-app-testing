// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Custom Components
import Repeater from '@components/repeater'
import { useDispatch, useSelector } from 'react-redux'
// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { SlideDown } from 'react-slidedown'
import { X, Plus, Hash } from 'react-feather'
import MrPerkinsLogo from '../../../../assets/images/logo/FIRMA-01-01.png'
import { getProductsData } from '../../../../redux/actions/clients'
import { SaveInvoice, deleteInvoiceData } from '../store/actions'
import InnerForm from './InnerFormElements'
import CreateInvoice from './CreateInvoice'
import ClientCard from './ClientCard'
import { useHistory } from 'react-router-dom'
import {
  Card,
  CardBody,
  CardText,
  Row,
  Col,
  Input,
  InputGroup,
  FormGroup,
  Label,
  Button,
  Form
} from 'reactstrap'

// ** Styles
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'

const AddCard = ({ userData }) => {
  // ** States
  const history = useHistory()
  const dispatch = useDispatch()
  const { allProducts } = useSelector(state => state.products)
  const [count, setCount] = useState(1)
  const [picker, setPicker] = useState(new Date())
  const [dueDatepicker, setDueDatePicker] = useState(new Date())
  const [products, setProducts] = useState([])
  const [auth, setAuth] = useState(null)
  const [note, setNote] = useState('')

  useEffect(() => {
    dispatch(getProductsData())
  }, [])

  useEffect(() => {
    if (allProducts.length > 0) {
      setProducts(allProducts)
    }
  }, [allProducts])

  useEffect(() => {
    setAuth(userData)
  }, [userData])

  // ** Deletes form
  const deleteForm = (e, formID) => {
    e.preventDefault()
    dispatch(deleteInvoiceData(formID))
    e.target.closest('.repeater-wrapper').remove()
  }
  // const guidGenerator = () => {
  //   const S4 = function () {
  //     return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  //   }
  //   return `${S4()}${S4()}${S4()}`
  // }
  const PackingOptions = [
    { title: 'Unidades', value: 1 },
    { title: 'Fourpacks', value: 4 },
    // { title: '6 Bottles Packing', value: 6 },
    { title: 'Caja x 24 (En Fourpack)', value: 8 },
    // { title: '12 Bottles Packing', value: 12 },
    { title: 'Caja x 24', value: 24 }
  ]
  const SaveInvoiceMethod = () => {
    dispatch(SaveInvoice({ note, date: picker, dueDate: dueDatepicker })).then(
      res => {
        history.push('/orders')
      }
    )
  }
  return (
    <Fragment>
      <Card className='invoice-preview-card mb-0'>
        {/* Header */}
        <CardBody className='invoice-padding pb-0'>
          <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0'>
            <div>
              <div className='justify-content-start align-items-end logo-wrapper'>

                <img
                  src={MrPerkinsLogo}
                  style={{ width: '5rem' }}
                  alt='mr perkins'
                />
                <h2 class="brand-text">Mr Perkins</h2>
              </div>
              <p className='card-text mb-25'>
                Luis Felipe Villaran 1010 - 102
              </p>
              <p className='card-text mb-25'>San Isidro,Lima - Peru</p>
              <p className='card-text mb-0'>
                +(511) 924 063 822, +(511) 982 096 494
              </p>
            </div>
            <div className='invoice-number-date mt-md-0 mt-2'>
              {/* <div className='d-flex align-items-center justify-content-md-end mb-1'>
                <h4 className='invoice-title'>Invoice</h4>
                <InputGroup className='input-group-merge invoice-edit-input-group disabled'>
                  <Input
                    type='text'
                    className='invoice-edit-input'
                    value={guidGenerator()}
                    placeholder={'Invoice ID'}
                    disabled
                  />
                </InputGroup>
              </div> */}
              
              <div className='d-flex align-items-center mb-1'>
                <span className='title'>Pedidos:</span>
                <div
                  className='form-control invoice-edit-input due-date-picker'
                ># 5037</div>
              </div>
              {auth && auth.type === 'admin' && (
                <div className='d-flex align-items-center mb-1'>
                  <span className='title'>Fecha:</span>
                  <Flatpickr
                    value={picker}
                    onChange={date => setPicker(date)}
                    className='form-control invoice-edit-input due-date-picker'
                  />
                </div>
              )}
              <div className='d-flex align-items-center'>
                <span className='title'>Despacho:</span>
                <Flatpickr
                  value={dueDatepicker}
                  onChange={date => setDueDatePicker(date)}
                  className='form-control invoice-edit-input due-date-picker'
                />
              </div>
            </div>
          </div>
        </CardBody>
        {/* /Header */}

        <hr className='invoice-spacing' />
        {/* Address and Contact */}
        {auth && auth.type === 'admin' && <ClientCard />}
        {/* /Address and Contact */}

        {/* Product Details */}
        <CardBody className='invoice-padding invoice-product-details'>
          <Form id='uniquieIDform'>
            <Repeater count={count}>
              {i => {
                const Tag = i === 0 ? 'div' : SlideDown
                return (
                  <Tag key={i} className='repeater-wrapper'>
                    <InnerForm
                      deleteForm={deleteForm}
                      PackingOptions={PackingOptions}
                      products={products}
                      userData={userData}
                      formID={`form${i}`}
                    />
                  </Tag>
                )
              }}
            </Repeater>
          </Form>
          <Row className='mt-1'>
            <Col sm='12' className='px-0'>
              <Button.Ripple
                color='primary'
                size='sm'
                className='btn-add-new'
                onClick={() => setCount(count + 1)}
              >
                <Plus size={14} className='mr-25'></Plus>
                <span className='align-middle'>Agregar mas</span>
              </Button.Ripple>
            </Col>
          </Row>
        </CardBody>

        {/* /Product Details */}

        {/* Invoice Total */}
        <CardBody className='invoice-padding'>
          <Row className='invoice-sales-total-wrapper d-flex justify-content-between'>
            <Col
              className=''
              md={{ size: 8 }}
              xs={{ size: 12 }}
            >
              {/* <FormGroup className='mb-2 w-full'> */}
              <Label for='note' className=' form-label font-weight-bold'>
                Nota:
              </Label>
              <Input
                type='textarea'
                rows='5'
                id='note'
                placeholder='Instrucciones sobre tu pedido'
                onChange={e => {
                  setNote(e.target.value)
                }}
                value={note}
              />
              {/* </FormGroup> */}
            </Col>
            <Col
              className='mt-2 d-flex align-items-center'
              md={{ size: 4, order: 2 }}
              xs={{ size: 12, order: 1 }}
            >
              <div className='invoice-total-wrapper'>
                <CreateInvoice />
                <Button.Ripple className="w-100 mt-2" color='primary' onClick={SaveInvoiceMethod}>
                  Enviar pedido
                </Button.Ripple>
              </div>
            </Col>
          </Row>
        </CardBody>
        {/* /Invoice Total */}
        {/* <hr className='invoice-spacing mt-0' /> */}

      </Card>
    </Fragment>
  )
}

export default AddCard
