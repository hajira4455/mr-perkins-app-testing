// ** React Imports
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

// ** Store & Actions
import { getUser, getUserInvoices } from '../store/action'
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap
import { Row, Col, Alert, Card, CardHeader, CardTitle } from 'reactstrap'

// ** User View Components
import UserInfoCard from './UserInfoCard'
import RecentInvoicesTable from './RecentInvoicesTable'

// ** Styles
import '@styles/react/apps/app-users.scss'

const UserView = props => {
  // ** Vars
  const store = useSelector(state => state.users),
    dispatch = useDispatch(),
    fullLOcation = location.pathname.split('/')
  const id = fullLOcation[fullLOcation.length - 1]
  const FetchData = () => {
    dispatch(getUser(id)).then(data => {
      dispatch(getUserInvoices(data.selectedUser.email))
    })
  }
  // ** Get suer on mount
  useEffect(() => {
    FetchData()
  }, [dispatch])

  return store.selectedUser !== null && store.selectedUser !== undefined ? (
    <div className='app-user-view'>
      <Row>
        <Col xl='12' lg='12' md='12'>
          <UserInfoCard
            selectedUser={store.selectedUser}
            FetchData={FetchData}
          />
        </Col>
      </Row>

      <Row>
        <Col sm='12'>
          <Card>
            <CardHeader>
              <CardTitle tag='h4'>Recent Invoices</CardTitle>
            </CardHeader>
            <RecentInvoicesTable items={store.selectedUserInvoices} />
          </Card>
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>User not found</h4>
      <div className='alert-body'>
        User with id: {id} doesn't exist. Check list of all Users:{' '}
        <Link to='/clients'>Users List</Link>
      </div>
    </Alert>
  )
}

export default UserView
