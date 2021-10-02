// ** Third Party Components
import { useEffect, useState } from 'react'

import {
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from 'reactstrap'
import { DollarSign } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { SaveAndUpdateCategories } from '../store/action'
const UserSocialTab = ({ cats }) => {
  const dispatch = useDispatch(),
    SelectedUser = useSelector(state => state.users),
    [User, setUser] = useState({})
  useEffect(() => {
    setUser(SelectedUser.selectedUser)
  }, [SelectedUser.selectedUser])
  const DynamicallyChangeValue = (index, value) => {
    const user = { ...User }
    user.categories[index].value = value
    setUser(user)
  }
  const HandleSubmit = e => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const prices = []
    for (const [key, value] of formData.entries()) {
      prices.push({ title: key, value })
    }
    dispatch(SaveAndUpdateCategories({ id: User.id, prices })).then(success => {
      console.log(success)
    })
  }
  return (
    <Form onSubmit={HandleSubmit}>
      <Row>
        {cats.length > 0 &&
          cats.map((item, index) => {
            return (
              <Col lg='4' md='6' sm='12' key={item.id}>
                <Label for='twitter'>{item.categoryName}</Label>
                <FormGroup tag={InputGroup} className='input-group-merge'>
                  <InputGroupAddon addonType='prepend'>
                    <InputGroupText>
                      <DollarSign size={17} />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id={item.categoryName}
                    name={item.categoryName}
                    placeholder='price'
                    value={
                      User.categories
                        ? User.categories[index]
                          ? User.categories[index].value !== ''
                            ? User.categories[index].value
                            : item.price
                          : item.price
                        : item.price
                    }
                    onChange={e => {
                      DynamicallyChangeValue(index, e.target.value)
                    }}
                  />
                </FormGroup>
              </Col>
            )
          })}
        <Col className='d-flex flex-sm-row flex-column mt-2' sm='12'>
          <Button className='mb-1 mb-sm-0 mr-0 mr-sm-1' color='primary'>
            Save Changes
          </Button>
        </Col>
      </Row>
    </Form>
  )
}
export default UserSocialTab
