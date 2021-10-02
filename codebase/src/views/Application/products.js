import { Fragment, useEffect, useState, useRef } from 'react'
import {
  Row,
  Col,
  CardBody,
  CardText,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'
import prism from 'prismjs'
import ReactDOM from 'react-dom'
import FileUploader from './uploadWrapper'
import Select from 'react-select'
import {
  getProductsData,
  FetchCategories,
  CreateProduct
} from '../../redux/actions/clients'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from './ProductCard'
const Tables = () => {
  const dispatch = useDispatch()
  const FormRef = useRef()
  const [modalOpened, setModalOpened] = useState(false)
  const [Brands, setBrands] = useState([])
  const [File, setFile] = useState()
  const [User, setUser] = useState({})
  const [Products, setAllProducts] = useState([])
  const { allProducts } = useSelector(state => state.products)
  const { userData } = useSelector(state => state.auth)
  const { categories } = useSelector(state => state.Clients)

  useEffect(() => {
    prism.highlightAll()
  })
  useEffect(() => {
    setAllProducts(allProducts)
  }, [allProducts])
  const FetchData = () => {
    dispatch(getProductsData())
    dispatch(FetchCategories())
  }
  useEffect(() => {
    FetchData()
  }, [])
  useEffect(() => {
    setUser(userData)
  }, [userData])
  useEffect(() => {
    const newArr = categories.map(item => {
      return {
        value: item.id,
        label: item.categoryName
      }
    })
    setBrands(newArr)
  }, [categories])

  const SaveProduct = () => {
    const formData = new FormData(ReactDOM.findDOMNode(FormRef.current))
    const form = {}
    for (const [key, value] of formData.entries()) {
      form[key] = value
    }
    form['img'] = File.data
    // console.log(form)
    dispatch(CreateProduct(form)).then(success => {
      dispatch(getProductsData())
      setModalOpened(!modalOpened)
    })
  }
  return (
    <Fragment>
      {User.type && User.type.toLowerCase() === 'admin' && (
        <Fragment>
          <Button.Ripple
            className='my-1'
            color='primary'
            outline
            onClick={() => setModalOpened(!modalOpened)}
          >
            Add New
          </Button.Ripple>
          <Modal
            isOpen={modalOpened}
            toggle={() => setModalOpened(!modalOpened)}
            className='modal-dialog-centered'
          >
            <ModalHeader toggle={() => setModalOpened(!modalOpened)}>
              Create New Product
            </ModalHeader>
            <ModalBody>
              <FileUploader setFile={setFile} />
              <Form ref={FormRef}>
                <Row>
                  <Col sm='12'>
                    <FormGroup>
                      <Label for='catName'>Product Name</Label>
                      <Input
                        type='text'
                        name='name'
                        id='catName'
                        placeholder='Product Name'
                      />
                    </FormGroup>
                  </Col>
                  <Col sm='12'>
                    <FormGroup>
                      <Label for='brand'>Brand</Label>
                      <Select
                        className='react-select'
                        classNamePrefix='select'
                        defaultValue={Brands[0]}
                        name='brand'
                        id='brand'
                        options={Brands}
                        isClearable
                      />
                    </FormGroup>
                  </Col>
                  <Col sm='12'>
                    <FormGroup>
                      <Label for='details'>Details</Label>
                      <Input
                        type='textarea'
                        name='detail'
                        id='details'
                        rows='3'
                        placeholder='Product Details'
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color='primary' onClick={SaveProduct}>
                Publish
              </Button>
            </ModalFooter>
          </Modal>
        </Fragment>
      )}

      <Row>
        <Col sm='12'>
          <ProductCard products={Products} />
        </Col>
      </Row>
    </Fragment>
  )
}

export default Tables
