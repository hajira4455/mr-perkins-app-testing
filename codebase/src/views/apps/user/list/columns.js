// ** React Imports
import { Link } from 'react-router-dom'
import { Fragment } from 'react'
// ** Custom Components

// ** Store & Actions
import { getUser, getData, deleteUser } from '../store/action'
import { store } from '@store/storeConfig/store'
import { useSelector } from 'react-redux'

// ** Third Party Components
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import {
  MoreVertical,
  Star,
  FileText,
  Trash2,
  Archive,
  User,
  Settings,
  Briefcase
} from 'react-feather'

export const columns = props => {
  const { allData } = useSelector(state => state.invoice)
  const lastMonthSales = id => {
    if (allData.length > 0) {
      const filteredData = allData.filter(item => item.userID === id)
      const lmsData = filteredData.filter(item => {
        return (
          new Date(item.created.seconds * 1000).getMonth() ===
          new Date().getMonth() - 1
        )
      })
      return lmsData.length
    }
    return 0
  }
  const thisMonthSales = id => {
    if (allData.length > 0) {
      const filteredData = allData.filter(item => item.userID === id)
      const lmsData = filteredData.filter(item => {
        return (
          new Date(item.created.seconds * 1000).getMonth() ===
          new Date().getMonth()
        )
      })
      return lmsData.length
    }
    return 0
  }
  function typeFinder (type) {
    console.log(type)
    if (type === 'admin') {
      return (
        <Fragment>
          <Settings size='20' color='blue' className='mr-1' /> {type}
        </Fragment>
      )
    }
    if (type === 'empresa') {
      return (
        <Fragment>
          <Briefcase size='20' color='green' className='mr-1' /> {type}
        </Fragment>
      )
    }
    if (type === 'persona') {
      return (
        <Fragment>
          <User size='20' color='blue' className='mr-1' /> {type}
        </Fragment>
      )
    }
  }
  return [
    {
      name: 'Name',
      minWidth: '150px',
      selector: 'name',
      sortable: true,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          {/* {renderClient(row)} */}
          <div className='d-flex flex-column'>
            <Link
              to={`/clients/view/${row.id}`}
              className='user-name text-truncate mb-0'
              onClick={() => store.dispatch(getUser(row.id))}
            >
              <span className='font-weight-bold'>
                {row.name
                  ? row.name.length > 15
                    ? `${row.name.substring(0, 15)}...`
                    : row.name
                  : ''}
              </span>
            </Link>
            <small className='text-truncate text-muted mb-0'>
              @{' '}
              {row.businessName
                ? row.businessName.length > 15
                  ? `${row.businessName.substring(0, 15)}...`
                  : row.businessName
                : ''}
            </small>
          </div>
        </div>
      )
    },
    {
      name: 'Email',
      minWidth: '250px',
      selector: 'email',
      sortable: true,
      cell: row => row.email
    },
    {
      name: 'Type',
      minWidth: '160px',
      maxWidth: '200px',
      selector: 'type',
      sortable: true,
      cell: row => typeFinder(row.type)
    },
    {
      name: 'Last Month Sale',
      maxWidth: '132px',
      selector: 'role',
      cell: row => (
        <Badge color={'primary'} className='badge-sm' pill>
          {` ${lastMonthSales(row.id)} orders`}
        </Badge>
      )
    },
    {
      name: 'This Month Sale',
      maxWidth: '132px',
      selector: 'role',
      cell: row => (
        <Badge color={'success'} className='badge-sm' pill>
          {`${thisMonthSales(row.id)} orders`}
        </Badge>
      )
    },
    {
      name: 'Category',
      minWidth: '200px',
      selector: 'category',
      cell: row => (
        <span className='text-capitalize'>
          {row.category
            ? Array.from({ length: 5 }, (_, i) => i + 1).map((item, index) => {
                return (
                  <Star
                    key={`star${index}`}
                    style={{ fill: index + 1 <= row.category ? '#7367f0' : '' }}
                    color={index < row.category ? '#7367f0' : 'gray'}
                  />
                )
              })
            : Array.from({ length: 5 }, (_, i) => i + 1).map((item, index) => {
                return <Star key={`starEmpty-${index}`} color='gray' />
              })}
        </span>
      )
    },
    {
      name: 'Actions',
      maxWidth: '10px',
      cell: row => (
        <UncontrolledDropdown>
          <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem
              tag={Link}
              to={`/clients/view/${row.id}`}
              className='w-100'
              onClick={() => store.dispatch(getUser(row.id))}
            >
              <FileText size={14} className='mr-50' />
              <span className='align-middle'>Details</span>
            </DropdownItem>
            <DropdownItem
              tag={Link}
              to={`/clients/edit/${row.id}`}
              className='w-100'
              onClick={() => store.dispatch(getUser(row.id))}
            >
              <Archive size={14} className='mr-50' />
              <span className='align-middle'>Edit</span>
            </DropdownItem>
            <DropdownItem
              className='w-100'
              onClick={() =>
                store.dispatch(deleteUser(row.id)).then(res => {
                  store.dispatch(getData({ q: props.q }))
                })
              }
            >
              <Trash2 size={14} className='mr-50' />
              <span className='align-middle'>Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      )
    }
  ]
}
