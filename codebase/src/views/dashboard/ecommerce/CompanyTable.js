import { useState, Fragment } from 'react'
import {
  Table,
  Card,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Row,
  Col,
  Input,
  Form,
  Label
} from 'reactstrap'
import { Edit2, Trash2 } from 'react-feather'

import { useDispatch } from 'react-redux'
import {
  SaveCategory,
  DeleteCategory,
  UpdateCategory
} from '../../../redux/actions/clients'

const CompanyTable = ({ data }) => {
  const dispatch = useDispatch()
  const [modalOpened, setModalOpened] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editID, seteditID] = useState('')
  const [categoryName, setCategoryName] = useState()
  const [price, setPrice] = useState()
  const SaveCategoryMethod = () => {
    if (!editMode) {
      dispatch(SaveCategory({ categoryName, price })).then(() => {
        setModalOpened(!modalOpened)
        setCategoryName('')
        setPrice(0)
      })
    } else {
      dispatch(UpdateCategory({ editID, categoryName, price })).then(() => {
        setModalOpened(!modalOpened)
        setCategoryName('')
        setPrice(0)
      })
    }
  }
  const DeleteCategoryMethod = id => {
    dispatch(DeleteCategory(id))
  }
  const renderData = () => {
    return data.map(col => {
      return (
        <tr key={col.id} className='text-center'>
          <td>
            <div>
              <div className='font-weight-bolder'>{col.id}</div>
            </div>
          </td>

          <td className='text-nowrap'>
            <div className='d-flex flex-column'>
              <span className='font-weight-bolder mb-25'>
                {col.categoryName}
              </span>
              {/* <span className='font-small-2 text-muted'>in {col.time}</span> */}
            </div>
          </td>
          <td>$ {col.price}</td>
          <td>
            <div className='d-flex justify-content-center'>
              <Button.Ripple
                color='primary'
                size='sm'
                className='mr-1'
                onClick={e => {
                  setEditMode(true)
                  setModalOpened(true)
                  setCategoryName(col.categoryName)
                  setPrice(col.price)
                  seteditID(col.id)
                }}
              >
                <Edit2 />
              </Button.Ripple>
              <Button.Ripple
                color='primary'
                size='sm'
                onClick={e => {
                  DeleteCategoryMethod(col.id)
                }}
              >
                <Trash2 />
              </Button.Ripple>
            </div>
          </td>
        </tr>
      )
    })
  }

  return (
    <Fragment>
      <Card className='card-company-table'>
        <Table responsive>
          <thead>
            <tr className='text-center'>
              <th>ID</th>
              <th>Brand</th>
              <th>Default Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {renderData()}
            <tr>
              <td colSpan='4' className='text-right'>
                {' '}
                <Button
                  color='primary'
                  onClick={() => {
                    setModalOpened(!modalOpened)
                    setEditMode(false)
                    seteditID('')
                  }}
                >
                  Add New
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Card>
      <Modal
        isOpen={modalOpened}
        toggle={() => setModalOpened(!modalOpened)}
        className='modal-dialog-centered'
      >
        <ModalHeader toggle={() => setModalOpened(!modalOpened)}>
          {editMode ? 'Update Brand' : 'Create New Brand'}
        </ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col sm='12'>
                <FormGroup>
                  <Label for='catName'>Brand Name</Label>
                  <Input
                    type='text'
                    name='name'
                    id='catName'
                    placeholder='Category Name'
                    value={categoryName}
                    onChange={e => {
                      setCategoryName(e.target.value)
                    }}
                  />
                </FormGroup>
              </Col>
              <Col sm='12'>
                <FormGroup>
                  <Label for='catDefaultPrice'>Default Price</Label>
                  <Input
                    type='number'
                    name='default Price'
                    id='catDefaultPrice'
                    placeholder='Default Price'
                    value={price}
                    onChange={e => {
                      setPrice(e.target.value)
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color='primary'
            onClick={() => {
              SaveCategoryMethod()
              setEditMode(false)
              seteditID('')
            }}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  )
}

export default CompanyTable
