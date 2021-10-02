// ** Third Party Components
import { Fragment, useState, useEffect } from 'react'
import {
  Card,
  CardBody,
  CardText,
  Row,
  Col,
  Table,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'
import MrPerkinsLogo from '../../../../assets/images/logo/mrperkinslogo.jpeg'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setInvoiceStatus } from '../store/actions'
const PreviewCard = ({ data, userData }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [invoiceState, setInvoiceState] = useState(data.state || 'unattended')
  useEffect(() => {
    setInvoiceState(data.state)
  }, [data.status])
  const dateParser = timestamp => {
    const date = new Date(timestamp * 1000)
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
  }
  const ElementsPriceTotaler = products => {
    return products
      .reduce(
        (a, b) =>
          +a + +Number(b.productPrice.split('/')[1] * Number(b.quantity)),
        0
      )
      .toFixed(2)
  }
  const ProductsPriceTotaler = products => {
    return products.reduce((a, b) => +a + +Number(b.total), 0).toFixed(2)
  }

  const tableRows = data.products ? data.products : data.elements
  const InvoiceOptions = [
    'unattended',
    'acknowledged',
    'ready to dispatch',
    'dispatched',
    'partialy dispatched',
    'not able to dispatch',
    'ENTREGADO'
  ]
  const changeHandler = e => {
    setInvoiceState(e.target.value)
  }
  const formSubmit = e => {
    e.preventDefault()
    dispatch(setInvoiceStatus({ state: invoiceState, id: data.id })).then(
      () => {
        history.push('/orders')
      }
    )
  }
  return data !== null ? (
    <Card className='invoice-preview-card'>
      <CardBody className='invoice-padding pb-0'>
        {/* Header */}
        <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0'>
          <div>
            <div className='logo-wrapper'>
              <img
                src={MrPerkinsLogo}
                style={{ width: '15rem' }}
                alt='mr perkins'
              />
            </div>
            <CardText className='mb-25'>
              Office 149, 450 South Brand Brooklyn
            </CardText>
            <CardText className='mb-25'>
              San Diego County, CA 91905, USA
            </CardText>
            <CardText className='mb-0'>
              +1 (123) 456 7891, +44 (876) 543 2198
            </CardText>
          </div>
          <div className='mt-md-0 mt-2'>
            <h4 className='invoice-title'>
              Invoice <span className='invoice-number'>#{data.id}</span>
            </h4>
            <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>Date Issued:</p>
              <p className='invoice-date'>
                {dateParser(
                  data.created
                    ? data.created.seconds
                    : data.date
                    ? data.date.seconds
                    : new Date()
                )}
              </p>
            </div>
            {data.dueDate && (
              <div className='invoice-date-wrapper'>
                <p className='invoice-date-title'>Due Date:</p>
                <p className='invoice-date'>
                  {' '}
                  {dateParser(data.dueDate.seconds)}
                </p>
              </div>
            )}
            <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>Status:</p>
              <p className='invoice-date'>{data.status || data.state}</p>
            </div>
          </div>
        </div>
        {/* /Header */}
      </CardBody>

      <hr className='invoice-spacing' />

      {/* Invoice Description */}
      <Table responsive>
        <thead>
          <tr>
            <th className='py-1'>Task description</th>
            <th className='py-1'>Rate</th>
            <th className='py-1'>QTY</th>
            <th className='py-1'>Total</th>
          </tr>
        </thead>
        <tbody>
          {tableRows &&
            tableRows.length > 0 &&
            tableRows.map((item, index) => {
              return item.product ? (
                <tr key={`newProducts-${index}`}>
                  <td className='py-1'>
                    <p className='card-text font-weight-bold mb-25'>
                      {item.product.name}
                    </p>
                    {item.product.detail && (
                      <p className='card-text text-nowrap'>
                        {item.product.detail.length > 0
                          ? `${item.product.detail.substring(0, 50)}...`
                          : item.product.detail}
                      </p>
                    )}
                  </td>
                  <td className='py-1'>
                    <span className='font-weight-bold'>
                      $
                      {item.product.brand
                        ? item.product.brand.price
                        : item.product.price}
                    </span>
                  </td>
                  <td className='py-1'>
                    <span className='font-weight-bold'>{item.qty}</span>
                  </td>
                  <td className='py-1'>
                    <span className='font-weight-bold'>
                      ${' '}
                      {item.product.brand
                        ? (
                            Number(item.product.brand.price) * Number(item.qty)
                          ).toFixed(2)
                        : (
                            Number(item.product.price) * Number(item.qty)
                          ).toFixed(2)}
                    </span>
                  </td>
                </tr>
              ) : (
                <tr key={`oldProducts-${index}`}>
                  <td className='py-1'>
                    <p className='card-text font-weight-bold mb-25'>
                      {item.productName}
                    </p>
                    <p className='card-text text-nowrap'>{item.packing}</p>
                  </td>
                  <td className='py-1'>
                    <span className='font-weight-bold'>
                      ${item.productPrice.split('/')[1]}
                    </span>
                  </td>
                  <td className='py-1'>
                    <span className='font-weight-bold'>{item.quantity}</span>
                  </td>
                  <td className='py-1'>
                    <span className='font-weight-bold'>
                      $
                      {(
                        Number(item.productPrice.split('/')[1]) *
                        Number(item.quantity)
                      ).toFixed(2)}
                    </span>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </Table>
      {/* /Invoice Description */}

      {/* Total & Sales Person */}
      <CardBody className='invoice-padding pb-0'>
        <Row className='invoice-sales-total-wrapper'>
          {/* <Col className='mt-md-0 mt-3' md='6' order={{ md: 1, lg: 2 }}>
            <CardText className='mb-0'>
              <span className='font-weight-bold'>Salesperson:</span>{' '}
              <span className='ml-75'>Alfie Solomons</span>
            </CardText>
          </Col> */}
          <Col
            className='d-flex justify-content-end'
            md='12'
            order={{ md: 2, lg: 1 }}
          >
            <div className='invoice-total-wrapper'>
              <hr className='my-50' />
              <div className='invoice-total-item'>
                <p className='invoice-total-title'>Total:</p>
                <p className='invoice-total-amount'>
                  ${' '}
                  {data.elements
                    ? ElementsPriceTotaler(data.elements)
                    : data.products
                    ? ProductsPriceTotaler(data.products)
                    : null}
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
      {/* /Total & Sales Person */}

      <hr className='invoice-spacing' />

      {/* Invoice Note */}
      <CardBody className='invoice-padding pt-0'>
        <Row>
          <Col sm='12'>
            <span className='font-weight-bold'>Note: </span>
            <span>{data.note}</span>
          </Col>
        </Row>
      </CardBody>
      {/* /Invoice Note */}
      {userData.type === 'admin' && (
        <Fragment>
          <hr className='invoice-spacing mt-0' />
          <CardBody className='invoice-padding py-0 pb-2'>
            <Row>
              <Col>
                <Form inline onSubmit={formSubmit}>
                  <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
                    <Label for='examplePassword' className='mr-sm-2'>
                      Status:
                    </Label>
                    <Input
                      type='select'
                      className='item-details'
                      onChange={changeHandler}
                      value={invoiceState}
                    >
                      {InvoiceOptions.map(item => {
                        return (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        )
                      })}
                    </Input>
                  </FormGroup>
                  <Button.Ripple type='submit' color='primary'>
                    Update
                  </Button.Ripple>
                </Form>
              </Col>
            </Row>
          </CardBody>
        </Fragment>
      )}
    </Card>
  ) : null
}

export default PreviewCard
