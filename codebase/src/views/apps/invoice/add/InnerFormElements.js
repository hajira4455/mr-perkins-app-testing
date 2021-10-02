import React, { useEffect, useState } from 'react'
import {
  CardText,
  Row,
  Col,
  Input,
  Label,
  FormGroup,
  CardHeader,
  CardTitle,
  CardBody,
  CustomInput
} from 'reactstrap'
import NumberInput from '@components/number-input'
import { X, Check } from 'react-feather'
import { firestore } from '@src/utility/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { SetInvoiceData } from '../store/actions'
function InnerFormElements({
  deleteForm,
  PackingOptions,
  products,
  userData,
  formID
}) {
  const dispatch = useDispatch()
  const [selected, setSelected] = useState({})
  const [custom, setCustom] = useState(false)
  const [selectedPacking, setSelectedPacking] = useState(null)
  const [multiple, setMultiple] = useState(1)
  const ChangeSelector = async id => {
    const found = products.filter(item => item.id === id)[0]
    if (found && found.brand && typeof found.brand === 'string') {
      const id = found.brand
      const ref = firestore.collection('categories').doc(id)
      const doc = await ref.get()
      if (doc.exists) {
        if (userData.cateogries) {
          const userBrand = userData.cateogries.filter(
            item => item.title === found.brand.categoryName
          )
          found.brand = userBrand
          found.brand.id = id
          setSelected(found)
        } else {
          found.brand = doc.data()
          found.brand.id = id
          setSelected(found)
        }
      }
    } else {
      setSelected(found)
    }
  }
  useEffect(() => {
    if (products.length) {
      ChangeSelector(products[0].id)
    }
  }, [products])
  useEffect(() => {
    setSelectedPacking(PackingOptions[0].value.toString())
  }, [products])
  const packingChange = e => {
    setSelectedPacking(e.target.value)
  }

  function GetPriceInNumber({ selected, selectedPacking, multiple }) {
    if (selected !== {}) {
      const price = selected.price
        ? selected.price
        : selected.brand
          ? selected.brand.price
            ? selected.brand.price
            : selected.brand.value
          : 1
      dispatch(
        SetInvoiceData({
          formID,
          product: {
            product: selected,
            qty: Number(multiple) * Number(selectedPacking),
            total: (
              Number(multiple) *
              Number(selectedPacking) *
              Number(price)
            ).toFixed(2)
          }
        })
      )
      return (
        Number(multiple) *
        Number(selectedPacking) *
        Number(price)
      ).toFixed(2)
    }
  }
  return (
    <Row id={`formRepeat-${formID}`}>
      <Col
        className='d-flex product-details-border position-relative pr-0'
        sm='12'
      >
        <Row className='w-100 pr-lg-0 pr-1 py-2'>
          <Col className='my-lg-0 my-2 text-center' lg='2' sm='12'>
            <CardText className='col-title mb-md-2 mb-0'>Cantidad</CardText>
            <FormGroup>
              <NumberInput
                size='sm'
                value={multiple}
                onChange={count => setMultiple(count)}
              />
            </FormGroup>
          </Col>
          <Col className='my-lg-0 my-2 text-center' lg='2' sm='12'>
            <CardText className='col-title mb-md-2 mb-0'>Presentación</CardText>
            <Input
              type='select'
              defaultValue='1'
              placeholder='1'
              onChange={packingChange}
            >
              {PackingOptions.map((item, index) => {
                return (
                  <option key={`option--${index}`} value={item.value}>
                    {item.title}
                  </option>
                )
              })}
            </Input>
          </Col>

          <Col className='mb-lg-0 mb-2 mt-lg-0 mt-2' lg='4' sm='12'>
            <CardText className='col-title mb-md-50 mb-0'>Producto</CardText>
            <Input
              type='select'
              className='item-details'
              onChange={e => {
                ChangeSelector(e.target.value)
              }}
              value={selected && selected.id}
            >
              {products.length > 0 &&
                products.map(item => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  )
                })}
            </Input>
          </Col>
          <Col className='my-lg-0 my-2' lg='2' sm='12'>
            <CardText className='col-title mb-md-2 mb-0'>Precio</CardText>
            <Input
              type='number'
              defaultValue={
                selected
                  ? selected.brand
                    ? selected.brand.price
                      ? selected.brand.price
                      : selected.brand.value
                    : selected.price
                  : ''
              }
              placeholder='price'
              disabled={true}
            />
          </Col>

          <Col className='my-lg-0 mt-2' lg='2' sm='12'>
            <CardText className='col-title mb-md-50 mb-0'>Subtotal</CardText>
            <CardText className='mb-0'>
              ${' '}
              <GetPriceInNumber
                selected={selected}
                selectedPacking={selectedPacking}
                multiple={multiple}
              />
            </CardText>
          </Col>
        </Row>
        <div className='d-flex flex-column align-items-center justify-content-start border-left invoice-product-actions py-50 px-25'>
          <X
            size={18}
            className='cursor-pointer'
            onClick={e => {
              deleteForm(e, formID)
            }}
          />
        </div>
      </Col>
    </Row>
  )
}

export default InnerFormElements
