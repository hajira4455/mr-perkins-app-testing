import { useState } from 'react'
import { isObjEmpty } from '@utils'
import classnames from 'classnames'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import * as authActions from '@src/redux/actions/auth'

import {
  Row,
  Col,
  CardTitle,
  CardText,
  FormGroup,
  Label,
  Button,
  Form,
  Input,
  CustomInput
} from 'reactstrap'
import themeConfig from '@configs/themeConfig'
import '@styles/base/pages/page-auth.scss'

const Register = () => {
  const history = useHistory()

  const dispatch = useDispatch()

  const { register, errors, handleSubmit, trigger } = useForm()

  const [email, setEmail] = useState('')
  const [valErrors, setValErrors] = useState({})
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const source = require('@src/assets/images/logo/background.jpeg').default

  const onSubmit = () => {
    if (isObjEmpty(errors)) {
      dispatch(
        authActions.submitRegisterWithFireBase(username, email, password)
      )
        .then(result => {
          dispatch(authActions.handleLogout())
          return result
        })
        .then(result => {
          if (result.user) {
            history.push('/login')
          }
        })
    }
  }

  const handleUsernameChange = e => {
    const errs = valErrors
    if (errs.username) delete errs.username
    setUsername(e.target.value)
    setValErrors(errs)
  }

  const handleEmailChange = e => {
    const errs = valErrors
    if (errs.email) delete errs.email
    setEmail(e.target.value)
    setValErrors(errs)
  }

  return (
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          <img
            style={{ maxWidth: '155px' }}
            src={themeConfig.app.appLogoImage}
            alt='logo'
          />
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-0' lg='8' sm='12'>
          <div
            className='w-100 h-100 d-lg-flex align-items-center justify-content-center'
            style={{ backgroundColor: '#effbf7' }}
          >
            <img className='img-fluid' src={source} alt='Login V2' />
          </div>
        </Col>
        <Col
          className='d-flex align-items-center auth-bg px-2 p-lg-5'
          lg='4'
          sm='12'
        >
          <Col className='px-xl-0 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='font-weight-bold mb-1'>
              Join The Club 💜
            </CardTitle>
            <CardText className='mb-2'>
              Le damos la bienvenida a Vigo Group | Envíe, reciba y administre
              pedidos
            </CardText>
            <Form
              action='/'
              className='auth-register-form mt-2'
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormGroup>
                <Label className='form-label' for='register-username'>
                  Name
                </Label>
                <Input
                  autoFocus
                  type='text'
                  value={username}
                  placeholder='johndoe'
                  id='register-username'
                  name='register-username'
                  onChange={handleUsernameChange}
                  className={classnames({
                    'is-invalid': errors['register-username']
                  })}
                  innerRef={register({
                    required: true,
                    validate: value => value !== ''
                  })}
                />
                {Object.keys(valErrors).length && valErrors.username ? (
                  <small className='text-danger'>{valErrors.username}</small>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-email'>
                  Email
                </Label>
                <Input
                  type='email'
                  value={email}
                  id='register-email'
                  name='register-email'
                  onChange={handleEmailChange}
                  placeholder='john@example.com'
                  className={classnames({
                    'is-invalid': errors['register-email']
                  })}
                  innerRef={register({
                    required: true,
                    validate: value => value !== ''
                  })}
                />
                {Object.keys(valErrors).length && valErrors.email ? (
                  <small className='text-danger'>{valErrors.email}</small>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-password'>
                  Password
                </Label>
                <InputPasswordToggle
                  value={password}
                  id='register-password'
                  name='register-password'
                  className='input-group-merge'
                  onChange={e => setPassword(e.target.value)}
                  className={classnames({
                    'is-invalid': errors['register-password']
                  })}
                  innerRef={register({
                    required: true,
                    validate: value => value !== ''
                  })}
                />
              </FormGroup>

              <Button.Ripple type='submit' block color='primary'>
                Registrar
              </Button.Ripple>
            </Form>
            <p className='text-center mt-2'>
              <span className='mr-25'>¿Ya tienes una cuenta?</span>
              <Link to='/login'>
                <span>Iniciar sesión</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Register
