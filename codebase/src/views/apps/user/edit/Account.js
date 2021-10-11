// ** React Imports
import { useState, useEffect } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'
import { useDispatch } from 'react-redux'

// ** Third Party Components
import { Lock, Edit, Trash2 } from 'react-feather'
import {
  Media,
  Row,
  Col,
  Button,
  Form,
  Input,
  Label,
  FormGroup
} from 'reactstrap'
import { UpdateUser } from '../store/action'
const UserAccountTab = ({ selectedUser, setShowToast, ShowToast }) => {
  // ** States_delegate
  const [img, setImg] = useState(null)
  const [File, setFIle] = useState(null)
  const [userData, setUserData] = useState(selectedUser)
  const dispatch = useDispatch()

  // ** Function to change user image
  const onChange = e => {
    const reader = new FileReader(),
      files = e.target.files
    reader.onload = function () {
      setImg(reader.result)
      setFIle(files[0])
    }
    reader.readAsDataURL(files[0])
  }

  // ** Update user image on mount or change
  useEffect(() => {
    if (
      selectedUser !== null ||
      (selectedUser !== null &&
        userData !== null &&
        selectedUser.id !== userData.id)
    ) {
      setUserData(selectedUser)
      if (selectedUser.img) {
        return setImg(selectedUser.img)
      } else {
        return setImg(null)
      }
    }
  }, [selectedUser])

  // ** Renders User
  const renderUserAvatar = () => {
    if (!(img && img.length)) {
      const stateNum = Math.floor(Math.random() * 6),
        states = [
          'light-success',
          'light-danger',
          'light-warning',
          'light-info',
          'light-primary',
          'light-secondary'
        ],
        color = states[stateNum]
      return (
        <Avatar
          initials
          color={color}
          className='rounded mr-2 my-25'
          content={selectedUser.name}
          contentStyles={{
            borderRadius: 0,
            fontSize: 'calc(36px)',
            width: '100%',
            height: '100%',
            color: "#7367f0"
          }}
          style={{
            height: '90px',
            width: '90px'
          }}
        />
      )
    } else {
      return (
        <div
          className='img mr-2'
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            width: '90px',
            height: '90px',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }}
        ></div>
      )
    }
  }
  const ChangeHandler = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }
  const submitForm = () => {
    dispatch(UpdateUser(userData.id, userData, ShowToast, setShowToast, File))
  }
  const paymentOptions = [
    'Cash',
    '7 Days',
    '15 Days',
    '30 Days',
    '45 Days',
    '60 Days '
  ]
  return (
    <Row>
      <Col sm='12'>
        <Media className='mb-2'>
          {renderUserAvatar()}
          <Media className='mt-50' body>
            <h4>{selectedUser.name} </h4>
            <div className='d-flex flex-wrap mt-1 px-0'>
              <Button.Ripple
                id='change-img'
                tag={Label}
                className='mr-75 mb-0'
                color='primary'
              >
                <span className='d-none d-sm-block btn-sm'>Editar</span>
                <span className='d-block d-sm-none'>
                  <Edit size={14} />
                </span>
                <input
                  type='file'
                  hidden
                  id='change-img'
                  onChange={onChange}
                  accept='image/*'
                />
              </Button.Ripple>

            </div>
          </Media>
        </Media>
      </Col>
      <Col sm='12'>
        <Form onSubmit={e => e.preventDefault()}>
          <Row>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='username'>Usuario</Label>
                <Input
                  type='text'
                  id='username'
                  name='name'
                  placeholder='Username'
                  onChange={ChangeHandler}
                  value={userData && userData.name}
                />
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='businessName'>Compania</Label>
                <Input
                  type='text'
                  id='businessName'
                  name='businessName'
                  placeholder='Business Name'
                  onChange={ChangeHandler}
                  value={userData && userData.businessName}
                />
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='status'>Forma de Pago</Label>
                <Input
                  type='select'
                  name='paymentType'
                  onChange={ChangeHandler}
                  id='status'
                  value={userData && userData.paymentType}
                >
                  {paymentOptions.map(item => {
                    return (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    )
                  })}
                </Input>
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='status'>Status</Label>
                <Input
                  type='select'
                  name='status'
                  id='status'
                  value={userData && userData.status}
                  onChange={ChangeHandler}
                >
                  <option value='pending'>Pending</option>
                  <option value='active'>Active</option>
                  <option value='inactive'>Inactive</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='type'>Role</Label>
                <Input
                  type='select'
                  name='type'
                  id='type'
                  value={userData && userData.type}
                  onChange={ChangeHandler}
                >
                  <option value='user'>User</option>
                  {/* <option value='empresa'>Empersa</option>
                  <option value='persona'>Persona</option>
                  <option value='friend'>Friend</option> */}
                  <option value='admin'>Admin</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='company'>Type</Label>
                <Input
                  type='text'
                  id='company'
                  name='company'
                  value={userData && userData.company}
                  placeholder='Horeca'
                  onChange={ChangeHandler}
                />
              </FormGroup>
            </Col>
            <Col className='d-flex flex-sm-row flex-column mt-2' sm='12'>
              <Button.Ripple
                className='mb-1 mb-sm-0 mr-0 mr-sm-1'
                type='submit'
                color='primary'
                onClick={submitForm}
              >
                Guardar Cambios
              </Button.Ripple>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}
export default UserAccountTab
