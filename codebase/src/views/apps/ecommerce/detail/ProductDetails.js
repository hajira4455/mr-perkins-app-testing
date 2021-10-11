// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Star, ShoppingCart, Trash2, DollarSign } from 'react-feather'
import {
  Row,
  Col,
  CardText,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap'
import { useSelector } from 'react-redux'
import { firestore } from '@src/utility/firebase'
import { deleteProduct } from '../store/actions'
const Product = props => {
  const { userData } = useSelector(state => state.auth)
  const properUser = userData.user
  const [details, setDetails] = useState({})
  const [modalOpened, setModalOpened] = useState(false)
  const history = useHistory()
  // ** Props
  const { data, dispatch, addToCart } = props

  useEffect(async () => {
    if (data.brand) {
      const ref = firestore.collection('categories').doc(data.brand)
      const doc = await ref.get()
      if (!doc.exists) {
        console.log('not found user')
      }
      setDetails({ ...data, brand: doc.data() })
    }
  }, [properUser])

  function PriceDisplay() {
    if (properUser && properUser.categories && details.brand) {
      const found = properUser.categories.filter(
        item => item.title === details.brand.categoryName
      )
      if (found.length > 0) {
        return found[0].value
      } else {
        return details.brand.price
      }
    } else if (details.brand) {
      return details.brand.price
    }
  }
  // ** State

  // ** Renders color options

  // ** Handle Move/Add to cart
  const deleteProductMethod = () => {
    dispatch(deleteProduct(details.id)).then(res => {
      history.push('/products')
    })
  }

  // ** Condition btn tag
  const CartBtnTag = Link
  const textHandler = (name) => {
    if (name === "TL") {
      return (
        <p>
          Es un agua tónica de 34 calorías por botella. Ligera y fresca, acompaña perfectamente a los mejores destilados resaltando sus aromas y manteniendo una burbuja pequeña y delicada.
          <br />
          <br />
          Presentación:
          <br />
          <br />
          Caja x 24 <br />
          Caja x 24 (En 4Packs) <br />
          Fourpacks <br />
          Unidades
        </p>
      )
    }
    if (name === "LG") {
      return (
        <p>
          Es una bebida peruana refrescante, elaborada con un agradable sabor a hierbaluisa y un final cítrico balanceado. Disfrútala sola o acompañando a un pisco de calidad.
          <br />
          Presentación:
          <br />
          Caja x 24 <br />
          Caja x 24 (En 4Packs) <br />
          Fourpacks <br />
          Unidades
        </p>
      )
    }
    if (name === "GA") {
      return (
        <p>
          Nuestra Ginger Ale es una bebida peruana que ofrece el equilibrio perfecto de jengibres frescos y un dulzor sutil, de gran aroma y perfecto picor. Disfrútala con los mejores piscos y otros destilados.
          <br />
          <br />
          Presentación:
          <br />
          <br />
          Caja x 24 <br />
          Caja x 24 (En 4Packs) <br />
          Fourpacks <br />
          Unidades
        </p>
      )
    }
    if (name === "TD") {
      return (
        <p>
          Del árbol de la quina se producen las mejores aguas tónicas del mundo. Es un agua tónica de carácter seco con dulzor reducido para que tu destilado favorito sea el protagonista de cualquier cóctel.
          <br />
          <br />
          Presentación:
          <br />
          <br />
          Caja x 24 <br />
          Caja x 24 (En 4Packs) <br />
          Fourpacks <br />
          Unidades <br />
        </p>
      )
    }
    if (name === "TA") {
      return (
        <p>
          La Tónica Amazónica Mr Perkins, inspirada en la rica selva amazónica, exhibe toques de Camu Camu y Pitahaya que le dan un sabor exótico y único. Combina perfecto con destilados de perfil cítricos, además de ser versátil en combinación con la mayoría de destilados de calidad.
          <br />
          <br />
          Presentación:
          <br />
          <br />
          Caja x 24  <br />
          Caja x 24 (En 4Packs)  <br />
          Fourpacks <br />
          Unidades  <br />
        </p>
      )
    }
    if (name === "GBL") {
      return (
        <p>
          Con tan solo 30 calorías por botella, nuestra nueva Ginger Beer Light conserva el intenso sabor de jengibres frescos ofreciendo un equilibrio perfecto de picor y burbuja delicada.
          <br />
          <br />
          Presentación:
          <br />
          <br />
          Caja x 24 <br />
          Caja x 24 (En 4Packs)  <br />
          Fourpacks  <br />
          Unidades  <br />
        </p>
      )
    }
    if (name === "TO") {
      return (
        <p>
          Del árbol de la Quina, originario del Perú, se producen las mejores aguas tónicas del mundo. Es así como nace Mr. Perkins, Perú-Kina, un agua tónica original, premium, natural y de calidad mundial. <br />
          <br />
          <br />
          Presentación:
          <br />
          <br />
          Caja x 24  <br />
          Caja x 24 (En 4Packs)  <br />
          Fourpacks  <br />
          Unidades  <br />
        </p>
      )
    }
    if (name === "TB") {
      return (
        <p>
          Del árbol de la quina; originario del Perú, se producen las mejores aguas tónicas del mundo. Es una agua de aroma y sabor frutal, con notas frutales que harán resaltar a tu destilado preferido. <br />
          Presentación:
          <br />
          <br />
          Caja x 24  <br />
          Caja x 24 (En 4Packs)  <br />
          Fourpacks  <br />
          Unidades  <br />
        </p>
      )
    }
    if (name === "PS") {
      return (
        <p>
          Nuestra Pink Soda es una bebida peruana elaborada con selectas toronjas que, junto con notas aromáticas de mandarina, ofrece una perfecta armonía entre ligeramente amargo y muy refrescante.
          <br />
          <br />
          Presentación:
          <br />
          <br />
          Caja x 24  <br />
          Caja x 24 (En 4Packs)  <br />
          Fourpacks  <br />
          Unidades  <br />
        </p>
      )
    }
    if (name === "GB") {
      return (
        <p>
          Nuestra Ginger Beer es una bebida elaborada con el mejor jengibre orgánico del Perú, el cual le brinda un sabor robusto y picante que a la vez es refrescante. Disfrútala sola o como protagonista en un Dark & Stormy o un Pisco Mule.<br />
          <br />
          <br />
          Presentación:
          <br />
          <br />
          Caja x 24  <br />
          Caja x 24 (En 4Packs)  <br />
          Fourpacks  <br />
          Unidades
        </p>
      )
    } else {
      return (
        <p></p>
      )
    }
  }


  return (
    <Row className='my-2'>
      <Col
        className='d-flex align-items-center justify-content-center mb-2 mb-md-0'
        md='5'
        xs='12'
      >
        <div className='d-flex align-items-center justify-content-center'>
          <img
            className='img-fluid product-img'
            src={data.img}
            alt={data.name}
          />
        </div>
      </Col>
      <Col md='7' xs='12'>
        <h4>{data.name}</h4>
        <div className='ecommerce-details-price d-flex flex-wrap mt-1'>
          <h4 className='item-price mr-1'>
            S/{PriceDisplay() ? PriceDisplay() : data.price}
          </h4>
          <ul className='unstyled-list list-inline'>
            {new Array(5).fill().map((listItem, index) => {
              return (
                <li key={index} className='ratings-list-item mr-25'>
                  <Star className='filled-star' />
                </li>
              )
            })}
          </ul>
        </div>
        <CardText>
          Disponibilidad -<span className='text-success ml-25'>En stock</span>
        </CardText>
        <CardText>{data.detail}</CardText>
        <CardText>

          {
            textHandler(data.type)
          }
        </CardText>

        <hr />
        <div className='d-flex flex-column flex-sm-row pt-1'>
          <Button
            tag={CartBtnTag}
            className='btn-cart mr-0 mr-sm-1 mb-1 mb-sm-0'
            color='primary'
            to='/create_order'
          >
            {/* <ShoppingCart className='mr-50' size={14} /> */}
            Realizar Pedido
          </Button>
          {userData.type && userData.type.toLowerCase() === 'admin' && (
            <Fragment>
              <Modal
                isOpen={modalOpened}
                toggle={() => setModalOpened(!modalOpened)}
                className='modal-dialog-centered'
                modalClassName={'modal-danger'}
              >
                <ModalHeader toggle={() => setModalOpened(!modalOpened)}>
                  Delete Product
                </ModalHeader>
                <ModalBody>
                  Are you sure you wanna delete this product, (Deleting product
                  will remove this product from all users view)
                </ModalBody>
                <ModalFooter>
                  <Button.Ripple
                    outline
                    color='primary'
                    onClick={() => setModalOpened(!modalOpened)}
                  >
                    Cancel
                  </Button.Ripple>
                  <Button.Ripple
                    outline
                    color='danger'
                    onClick={deleteProductMethod}
                  >
                    Delete
                  </Button.Ripple>
                </ModalFooter>
              </Modal>
            </Fragment>
          )}
        </div>
      </Col>
    </Row>
  )
}

export default Product
