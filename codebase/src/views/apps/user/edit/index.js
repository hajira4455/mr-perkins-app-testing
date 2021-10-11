// ** React Imports
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** User Edit Components
import SocialTab from './Social'
import AccountTab from './Account'
import InfoTab from './Information'

// ** Store & Actions
import { getUser } from '../store/action'
import { useSelector, useDispatch } from 'react-redux'
import { FetchCategories } from '../../../../redux/actions/clients'
// ** Third Party Components
import { User, Info, DollarSign } from 'react-feather'
import {
  Card,
  CardBody,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Alert
} from 'reactstrap'
import Toasts from './Toast'

// ** Styles
import '@styles/react/apps/app-users.scss'

const UserEdit = () => {
  // ** States & Vars
  const [activeTab, setActiveTab] = useState('1'),
    [ShowToast, setShowToast] = useState({
      state: false,
      total: 0,
      transfered: 0
    }),
    store = useSelector(state => state.users),
    Categories = useSelector(state => state.Clients),
    dispatch = useDispatch(),
    fullLOcation = location.pathname.split('/'),
    [cats, setCats] = useState(Categories.categories || [])

  useEffect(() => {
    setCats(Categories.categories)
  }, [Categories.categories])
  const id = fullLOcation[fullLOcation.length - 1]

  // ** Function to toggle tabs
  const toggle = tab => setActiveTab(tab)

  // ** Function to get userDollarSign on mount
  useEffect(() => {
    dispatch(getUser(id))
  }, [dispatch])
  useEffect(() => {
    dispatch(FetchCategories())
  }, [])
  return store.selectedUser !== null && store.selectedUser !== undefined ? (
    <Row className='app-user-edit'>
      <Col
        md={{ size: 6, offset: 6 }}
        className='position-absolute'
        style={{ zIndex: 112 }}
      >
        <Toasts toastInfo={ShowToast} />
      </Col>
      <Col sm='12'>
        <Card>
          <CardBody className='pt-2'>
            <Nav pills>
              <NavItem>
                <NavLink active={activeTab === '1'} onClick={() => toggle('1')}>
                  <User size={14} />
                  <span className='align-middle d-none d-sm-block'>
                   Me Cuenta
                  </span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={activeTab === '2'} onClick={() => toggle('2')}>
                  <Info size={14} />
                  <span className='align-middle d-none d-sm-block'>
                    Informacion
                  </span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={activeTab === '3'} onClick={() => toggle('3')}>
                  <DollarSign size={14} />
                  <span className='align-middle d-none d-sm-block'>Precios</span>
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId='1'>
                <AccountTab
                  selectedUser={store.selectedUser}
                  setShowToast={setShowToast}
                  ShowToast={ShowToast}
                />
              </TabPane>
              <TabPane tabId='2'>
                <InfoTab
                  selectedUser={store.selectedUser}
                  setShowToast={setShowToast}
                  ShowToast={ShowToast}
                />
              </TabPane>
              <TabPane tabId='3'>
                <SocialTab
                  selectedUser={store.selectedUser}
                  setShowToast={setShowToast}
                  ShowToast={ShowToast}
                  cats={cats}
                />
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </Col>
    </Row>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>User not found</h4>
      <div className='alert-body'>
        User with id: {id} doesn't exist. Check list of all Users:{' '}
        <Link to='/apps/user/list'>Users List</Link>
      </div>
    </Alert>
  )
}
export default UserEdit
