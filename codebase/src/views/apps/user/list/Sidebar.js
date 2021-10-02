// ** React Import
import { useState } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import { isObjEmpty } from '@utils'

// ** Third Party Components
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import { Button, FormGroup, Label, FormText, Form, Input } from 'reactstrap'

// ** Store & Actions
import { addUser } from '../store/action'
import { useDispatch } from 'react-redux'

const SidebarNewUsers = ({ open, toggleSidebar, LoadData }) => {
  // ** States
  const [role, setRole] = useState('user')
  const [type, setType] = useState('horeca')

  // ** Store Vars
  const dispatch = useDispatch()

  // ** Vars
  const { register, errors, handleSubmit } = useForm()

  // ** Function to handle form submit
  const onSubmit = values => {
    if (isObjEmpty(errors)) {
      toggleSidebar()
      dispatch(
        addUser({
          password: values.password,
          name: values['name'],
          type: role,
          businessName: values.businessName,
          phone: values.contact,
          email: values.email,
          status: 'active',
          business: type,
          img: ''
        })
      ).then(res => {
        console.log(res)
        LoadData()
      })
    }
  }

  return (
    <Sidebar
      size='lg'
      open={open}
      title='New User'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for='full-name'>
            Full Name <span className='text-danger'>*</span>
          </Label>
          <Input
            name='name'
            id='full-name'
            placeholder='John Doe'
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['full-name'] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='businessName'>
            Business Name <span className='text-danger'>*</span>
          </Label>
          <Input
            name='businessName'
            id='businessName'
            placeholder='Business Name'
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['businessName'] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='email'>
            Email <span className='text-danger'>*</span>
          </Label>
          <Input
            type='email'
            name='email'
            id='email'
            placeholder='john.doe@example.com'
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['email'] })}
          />
          <FormText color='muted'>
            You can use letters, numbers & periods
          </FormText>
        </FormGroup>
        <FormGroup>
          <Label for='contact'>
            Contact <span className='text-danger'>*</span>
          </Label>
          <Input
            name='contact'
            id='contact'
            placeholder='(397) 294-5153'
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['contact'] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='ruc'>
            RUN or DNI <span className='text-danger'>*</span>
          </Label>
          <Input
            name='ruc'
            id='ruc'
            placeholder='RUC or DNI Number'
            type="number"
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['ruc'] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='user-role'>User Role</Label>
          <Input
            type='select'
            id='user-role'
            name='user-role'
            value={role}
            onChange={e => setRole(e.target.value)}
          >
            <option value='empresa'>Empresa</option>
            <option value='persona'>Persona</option>
            <option value='admin'>Admin</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for='user-role'>User Type</Label>
          <Input
            type='select'
            id='user-role'
            name='user-role'
            value={type}
            onChange={e => setType(e.target.value)}
          >
            <option value='horeca'>Horeca</option>
            <option value='distribution'>Distribution</option>
            <option value='retail_online'>Retail & Online</option>
            <option value='friend'>Friend</option>
            <option value='other'>Other</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for='password'>
            Password <span className='text-danger'>*</span>
          </Label>
          <Input
            type='password'
            name='password'
            id='password'
            placeholder='password'
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['password'] })}
          />
        </FormGroup>
        <Button type='submit' className='mr-1' color='primary'>
          Submit
        </Button>
        <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
          Cancel
        </Button>
      </Form>
    </Sidebar>
  )
}

export default SidebarNewUsers
