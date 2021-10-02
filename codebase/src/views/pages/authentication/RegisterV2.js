import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSkin } from '@hooks/useSkin'
import { Facebook, Twitter, Mail, GitHub } from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import { Row, Col, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput, Button } from 'reactstrap'
import themeConfig from '@configs/themeConfig'
import '@styles/base/pages/page-auth.scss'

const RegisterV2 = () => {
  const [skin, setSkin] = useSkin()

  // const illustration = skin === 'dark' ? 'register-v2-dark.svg' : 'register-v2.svg'
  // const source = require(`@src/assets/images/pages/${illustration}`).default
  const source = require('@src/assets/images/logo/background.jpeg').default

  const RememberMe = () => {
    return (
      <Fragment>
        I agree to
        <a className='ml-25' href='/' onClick={e => e.preventDefault()}>
          privacy policy & terms
        </a>
      </Fragment>
    )
  }
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
              Join The Club 💜
            </CardTitle>
            <CardText className='mb-2'>
              Le damos la bienvenida a Vigo Group | Envíe, reciba y administre pedidos
            </CardText>
            <Form className='auth-register-form mt-2' onSubmit={e => e.preventDefault()}>
              <FormGroup>
                <Label className='form-label' for='register-username'>
                  Nombre y Apellido
                </Label>
                <Input type='text' id='register-username' placeholder='johndoe' autoFocus />
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-email'>
                  Email
                </Label>
                <Input type='email' id='register-email' placeholder='john@example.com' />
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-password'>
                  Contraseña
                </Label>
                <InputPasswordToggle className='input-group-merge' id='register-password' />
              </FormGroup>
              {/*<FormGroup>
                <CustomInput
                  type='checkbox'
                  className='custom-control-Primary'
                  id='remember-me'
                  label={<RememberMe />}
                />
              </FormGroup>*/}
              <Button.Ripple color='primary' block>
                Registrar
              </Button.Ripple>
            </Form>
            <p className='text-center mt-2'>
              <span className='mr-25'>¿Ya tienes una cuenta?</span>
              <Link to='/pages/login-v1'>
                <span>Iniciar sesión</span>
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

export default RegisterV2
