import { Fragment, useState } from 'react'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import {
  Button,
  Media,
  Label,
  Row,
  Col,
  Input,
  FormGroup,
  Alert,
  Form
} from 'reactstrap'

const GeneralTabs = ({ data }) => {
  const {
    register,
    errors,
    handleSubmit,
    control,
    setValue,
    trigger
  } = useForm()

  const [avatar, setAvatar] = useState(data.avatar ? data.avatar : '')

  const onChange = e => {
    const reader = new FileReader(),
      files = e.target.files
    reader.onload = function () {
      setAvatar(reader.result)
    }
    reader.readAsDataURL(files[0])
  }

  const onSubmit = data => trigger()

  return (
    <Fragment>
      <Form className='mt-2' onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col sm='6'>
            <FormGroup>
              <Label for='username'>Username</Label>
              <Controller
                defaultValue={data.username}
                control={control}
                as={Input}
                id='username'
                name='username'
                placeholder='Username'
                innerRef={register({ required: true })}
                onChange={e => setValue('username', e.target.value)}
                className={classnames({
                  'is-invalid': errors.username
                })}
              />
            </FormGroup>
          </Col>
          <Col sm='6'>
            <FormGroup>
              <Label for='name'>Name</Label>
              <Controller
                defaultValue={data.fullName}
                control={control}
                as={Input}
                id='name'
                name='fullName'
                placeholder='Name'
                innerRef={register({ required: true })}
                onChange={e => setValue('fullName', e.target.value)}
                className={classnames({
                  'is-invalid': errors.fullName
                })}
              />
            </FormGroup>
          </Col>
          <Col sm='6'>
            <FormGroup>
              <Label for='email'>E-mail</Label>
              <Controller
                defaultValue={data.email}
                control={control}
                as={Input}
                type='email'
                id='email'
                name='email'
                placeholder='Email'
                innerRef={register({ required: true })}
                onChange={e => setValue('email', e.target.value)}
                className={classnames({
                  'is-invalid': errors.email
                })}
              />
            </FormGroup>
          </Col>
          <Col sm='6'>
            <FormGroup>
              <Label for='company'>Company</Label>
              <Controller
                defaultValue={data.company}
                control={control}
                as={Input}
                id='company'
                name='company'
                placeholder='Company Name'
                innerRef={register({ required: true })}
                onChange={e => setValue('company', e.target.value)}
                className={classnames({
                  'is-invalid': errors.company
                })}
              />
            </FormGroup>
          </Col>
          <Col className='mt-75' sm='12'>
            <Alert className='mb-50' color='warning'>
              <h4 className='alert-heading'>
                Your email is not confirmed. Please check your inbox.
              </h4>
              <div className='alert-body'>
                <a
                  href='/'
                  className='alert-link'
                  onClick={e => e.preventDefault()}
                >
                  Resend confirmation
                </a>
              </div>
            </Alert>
          </Col>
          <Col className='mt-2' sm='12'>
            <Button.Ripple type='submit' className='mr-1' color='primary'>
              Save changes
            </Button.Ripple>
            <Button.Ripple color='secondary' outline>
              Cancel
            </Button.Ripple>
          </Col>
        </Row>
      </Form>
    </Fragment>
  )
}

export default GeneralTabs
