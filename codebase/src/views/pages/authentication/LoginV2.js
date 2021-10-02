import { useSkin } from '@hooks/useSkin'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Mail, GitHub } from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import { Row, Col, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput, Button } from 'reactstrap'
import themeConfig from '@configs/themeConfig'
import '@styles/base/pages/page-auth.scss'

const LoginV2 = () => {
  const [skin, setSkin] = useSkin()

  // const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg'
  // const source = require(`@src/assets/images/background.jpeg/${illustration}`).default
  const source = require('@src/assets/images/logo/background.jpeg').default
  return (
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          <img style={{ maxWidth: '155px' }} src={themeConfig.app.appLogoImage} alt='logo' />
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-0' lg='8' sm='12'>
          <div
            className='w-100 h-100 d-lg-flex align-items-center justify-content-center'
            style={{ backgroundColor: '#effbf7' }}
          >
            <img className='img-fluid' src={source} alt='Login V2' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-0 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='font-weight-bold mb-1'>
              Welcome to the Club! 👋
            </CardTitle>
            <CardText className='mb-2'>
              La Magia está en el Mixer | Inicie sesión en su cuenta
            </CardText>
            <Form className='auth-login-form mt-2' onSubmit={e => e.preventDefault()}>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <Input type='email' id='login-email' placeholder='john@example.com' autoFocus />
              </FormGroup>
              <FormGroup>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                  <Link to='/pages/forgot-password-v2'>
                    <small>Recuperar Contraseña</small>
                  </Link>
                </div>
                <InputPasswordToggle className='input-group-merge' id='login-password' />
              </FormGroup>
              <FormGroup>
                <CustomInput type='checkbox' className='custom-control-Primary' id='remember-me' label='Recuérdame' />
              </FormGroup>
              <Button.Ripple color='primary' block>
                Acceder
              </Button.Ripple>
            </Form>
            <p className='text-center mt-2'>
              <span className='mr-25'>
                ¿No tienes una cuenta?
              </span>
              <Link to='/pages/register-v2'>
                <span>Regístrate</span>
              </Link>
            </p>
            {
              /*
                <div className='divider my-2'>
                  <div className='divider-text'>or</div>
                </div>
                <div className='auth-footer-btn d-flex justify-content-center'>
                  <Button.Ripple color='facebook'>
                    <Facebook size={14} />
                  </Button.Ripple>
                  <Button.Ripple color='twitter'>
                    <Twitter size={14} />
                  </Button.Ripple>
                  <Button.Ripple color='google'>
                    <Mail size={14} />
                  </Button.Ripple>
                  <Button.Ripple className='mr-0' color='github'>
                    <GitHub size={14} />
                  </Button.Ripple>
                </div>
              */
            }
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default LoginV2
