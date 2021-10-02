import React, { useEffect, useState } from 'react'
import {
  Row,
  Col,
  Card,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Media
} from 'reactstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

import { X } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'

import {
  CreateOffer,
  GetOffersData,
  deleteOffer
} from '../../redux/actions/offers'
const NewsAndOffers = () => {
  const [allOffers, setAllOffers] = useState([])
  const { offers } = useSelector(state => state.offers)
  const dispatch = useDispatch()
  const formSubmit = e => {
    e.preventDefault()
    const data = new FormData(e.target)
    const form = {}
    for (const [key, value] of data.entries()) {
      form[key] = value
    }
    dispatch(CreateOffer(form)).then(res => {
      MySwal.fire({
        title: 'Offer Saved',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        showClass: {
          popup: 'animate__animated animate__bounceIn'
        },
        buttonsStyling: false
      })
    })
  }
  useEffect(() => {
    dispatch(GetOffersData())
  }, [])

  useEffect(() => {
    setAllOffers(offers)
  }, [offers])

  const handleConfirmText = id => {
    return MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ml-1'
      },
      buttonsStyling: false
    })
      .then(result => {
        dispatch(deleteOffer(id))
        return result
      })
      .then(function (result) {
        if (result.value) {
          MySwal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            customClass: {
              confirmButton: 'btn btn-success'
            }
          })
        }
      })
  }
  return (
    <div>
      <Row>
        <Col md={6}>
          <Card className='p-2'>
            <CardTitle>Create New Offer</CardTitle>
            <CardBody>
              <Form onSubmit={formSubmit} encType='multipart/form-data'>
                <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
                  <Label for='image' className='mr-sm-2'>
                    Offer Image
                  </Label>
                  <Input type='file' name='image' id='image' />
                </FormGroup>
                <FormGroup className='mb-2 mr-sm-2'>
                  <Label for='captions' className='mr-sm-2'>
                    Caption
                  </Label>
                  <Input
                    type='text'
                    name='captions'
                    id='captions'
                    placeholder='caption title for image'
                  />
                </FormGroup>
                <FormGroup className='mb-2 mr-sm-2'>
                  <Label for='validTill' className='mr-sm-2'>
                    Valid Till
                  </Label>
                  <Input
                    type='text'
                    name='validTill'
                    id='validTill'
                    placeholder='Validitiy of the offer'
                  />
                </FormGroup>
                <Button>Submit</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
        <Col md={6}>
          <Card className='p-2'>
            <CardTitle>All Offers</CardTitle>
            <CardBody>
              <div className='singleOffer'>
                {allOffers.length > 0 &&
                  allOffers.map(item => {
                    return (
                      <Row key={item.id}>
                        <Col md={11}>
                          <Media>
                            <Media left href='#'>
                              <div
                                className='imagedisplayer'
                                style={{
                                  width: '300px',
                                  height: '300px',
                                  backgroundImage: `url(${item.image})`,
                                  backgroundRepeat: 'no-repeat',
                                  backgroundPosition: 'center',
                                  backgroundSize: 'contain'
                                }}
                              ></div>
                              {/* <Media
                                object
                                src={item.image}
                                height='300'
                                width='300'
                                alt='Generic placeholder image'
                              /> */}
                            </Media>
                            <Media body>
                              <Media heading>{item.captions}</Media>
                            </Media>
                          </Media>
                        </Col>
                        <Col md={1}>
                          <Button
                            color='primary'
                            onClick={() => {
                              handleConfirmText(item.id)
                            }}
                            outline
                            size='sm'
                          >
                            <X size={14} className='mr-25'></X>
                          </Button>
                        </Col>
                      </Row>
                    )
                  })}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default NewsAndOffers
