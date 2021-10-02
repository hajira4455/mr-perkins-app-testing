import { useState } from 'react'
import classnames from 'classnames'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import { isObjEmpty } from '@utils'
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Input,
  FormGroup,
  Label,
  CustomInput,
  Button
} from 'reactstrap'
import themeConfig from '@configs/themeConfig'
import * as authActions from '@src/redux/actions/auth'
import '@styles/base/pages/page-auth.scss'

const Login = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { register, errors, handleSubmit } = useForm()

  const source = require('@src/assets/images/logo/background.jpeg').default

  const onSubmit = () => {
    if (isObjEmpty(errors)) {
      dispatch(authActions.submitLoginWithFireBase(email, password, false))
    }
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
              Welcome to the Club! 👋
            </CardTitle>
            <CardText className='mb-2'>
              La Magia está en el Mixer | Inicie sesión en su cuenta
            </CardText>

            <Form
              className='auth-login-form mt-2'
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormGroup>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <Input
                  autoFocus
                  type='email'
                  value={email}
                  id='login-email'
                  name='login-email'
                  placeholder='john@example.com'
                  onChange={e => setEmail(e.target.value)}
                  className={classnames({
                    'is-invalid': errors['login-email']
                  })}
                  innerRef={register({
                    required: true,
                    validate: value => value !== ''
                  })}
                />
              </FormGroup>
              <FormGroup>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                  {/* <Link to='/forgot-password'>
                    <small>Recuperar Contraseña</small>
                  </Link> */}
                </div>
                <InputPasswordToggle
                  value={password}
                  id='login-password'
                  name='login-password'
                  className='input-group-merge'
                  onChange={e => setPassword(e.target.value)}
                  className={classnames({
                    'is-invalid': errors['login-password']
                  })}
                  innerRef={register({
                    required: true,
                    validate: value => value !== ''
                  })}
                />
              </FormGroup>
              <FormGroup>
                <CustomInput
                  type='checkbox'
                  className='custom-control-Primary'
                  id='remember-me'
                  label='Recuérdame'
                />
              </FormGroup>
              <Button.Ripple type='submit' color='primary' block>
                Acceder
              </Button.Ripple>
            </Form>
            <p className='text-center mt-2'>
              <span className='mr-25'>¿No tienes una cuenta?</span>
              <Link to='/register'>
                <span>Regístrate</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login
