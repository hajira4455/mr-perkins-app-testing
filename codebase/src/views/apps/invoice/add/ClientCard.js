// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Custom Components
import { useDispatch, useSelector } from 'react-redux'

import { getAllData } from '../../user/store/action'
import { SetInvoiceDetails } from '../store/actions'
// ** Third Party Components
import axios from 'axios'
import { X, Plus, Hash } from 'react-feather'
import Select, { components } from 'react-select'
import { selectThemeColors } from '@utils'
import { Card, CardBody, Row, Col, Button } from 'reactstrap'
import { Link } from 'react-router-dom'

// ** Styles
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'

const AddCard = () => {
  // ** States
  const dispatch = useDispatch()
  const { allData } = useSelector(state => state.users)
  const [value, setValue] = useState({})
  const [clients, setClients] = useState(null)
  const [selected, setSelected] = useState(null)
  const [options, setOptions] = useState([
    {
      value: 'add-new',
      label: 'Add New Customer',
      type: 'button',
      color: 'flat-success'
    }
  ])

  useEffect(() => {
    dispatch(getAllData())
  }, [])
  useEffect(() => {
    const data = allData.sort((a, b) => a.name.localeCompare(b.name))
    const arr = options
    data.map(item => arr.push({ value: item.id, label: item.name }))
    setOptions([...arr])
    setClients(data)
    return () => {
      setOptions({
        value: 'add-new',
        label: 'Add New Customer',
        type: 'button',
        color: 'flat-success'
      })
      setClients([])
    }
    // setClients(data)
  }, [allData])

  // ** Custom Options Component
  const OptionComponent = ({ data, ...props }) => {
    if (data.type === 'button') {
      return (
        <Button
          className='text-left rounded-0'
          tag={Link}
          color={data.color}
          to='/clients'
          block
        >
          <Plus size={14} />{' '}
          <span className='align-middle ml-50'>{data.label}</span>
        </Button>
      )
    } else {
      return <components.Option {...props}> {data.label} </components.Option>
    }
  }

  // ** Invoice To OnChange
  const handleInvoiceToChange = data => {
    setValue(data)
    setSelected(clients.filter(i => i.id === data.value)[0])
    dispatch(SetInvoiceDetails(clients.filter(i => i.id === data.value)[0]))
  }

  const note =
    'It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank You!'

  return (
    <Fragment>
      <Card className='invoice-preview-card mb-0'>
        {/* Header */}

        {/* Address and Contact */}
        <CardBody className='invoice-padding pt-0'>
          <Row className='row-bill-to invoice-spacing'>
            <Col className='col-bill-to pl-0' lg='12'>

              <div className='invoice-customer d-flex flex-wrap justify-content-between align-items-baseline'>
                {clients !== null ? (
                  <Col lg='6' md='6' xsm='12' sm='12'>
                    <h6 className='invoice-to-title my-1'>Cliente:</h6>
                    <Select
                      className=' react-select'
                      classNamePrefix='select'
                      id='label'
                      value={value}
                      options={options}
                      theme={selectThemeColors}
                      components={{
                        Option: OptionComponent
                      }}
                      onChange={handleInvoiceToChange}
                    />
                    {selected !== null ? (
                      <div className='customer-details mt-1'>
                        <p className='mb-25'>{selected.name}</p>
                        <p className='mb-25'>
                          {selected.email ? selected.email : ''}
                        </p>
                        <p className='mb-25'>
                          {selected.phone ? selected.phone : ''}
                        </p>
                        <p className='mb-25'>
                          {selected.povince ? selected.povince : ''}
                        </p>
                      </div>
                    ) : null}
                  </Col>
                ) : null}

                <div className='customer-details mx-1'>
                  <h6 className='invoice-to-title my-1'>Cuenta Bancaria:</h6>
                  <p className='mb-25'>Banco:  Banco de Crédito BCP</p>
                  <p className='mb-25'> Beneficiario: Vigo Group Sac
                  </p>
                  <p className='mb-25'>
                    Ruc: 20601104165
                  </p>
                  <p className='mb-25'>
                    No. de Cuenta: 193-2298652-0-05
                  </p>
                </div>

              </div>

            </Col>
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default AddCard
