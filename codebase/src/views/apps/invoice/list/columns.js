// ** React Imports

import { Link } from 'react-router-dom'
import moment from 'moment'
// ** Custom Components
import Avatar from '@components/avatar'

import avatarImg from '@src/assets/images/portrait/small/avatar-s-20.jpg'

// ** Store & Actions
import { getData, deleteInvoice } from '../store/actions'
import { store } from '@store/storeConfig/store'

// ** Third Party Components
import {
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  UncontrolledTooltip
} from 'reactstrap'
import {
  Eye,
  Send,
  MoreVertical,
  Trash,
  CheckCircle,
  Save,
  ArrowDownCircle,
  Info,
  PieChart,
  Repeat
} from 'react-feather'

// ** Vars
const invoiceStatusObj = {
  Sent: { color: 'light-secondary', icon: Send },
  Paid: { color: 'light-success', icon: CheckCircle },
  Draft: { color: 'light-primary', icon: Save },
  Downloaded: { color: 'light-info', icon: ArrowDownCircle },
  'Past Due': { color: 'light-danger', icon: Info },
  'Partial Payment': { color: 'light-warning', icon: PieChart }
}

// ** renders client column
const renderClient = row => {
  const stateNum = Math.floor(Math.random() * 6),
    states = [
      'light-success',
      'light-danger',
      'light-warning',
      'light-info',
      'light-primary',
      'light-secondary'
    ],
    color = states[stateNum]
  return ''
  // if (row.avatar.length) {
  //   return <Avatar className='mr-50' img={row.avatar} width='32' height='32' />
  // } else {
  //   return <Avatar color={color} className='mr-50' content={row.client ? row.client.name : 'John Doe'} initials />
  // }
}
const dateParser = timestamp => {
  const date = new Date(timestamp * 1000)
  return date
}
const TotalCounter = products => {
  return products.reduce((a, b) => +a + +Number(b.total), 0)
}
const ElementTotalCounter = products => {
  return products.reduce(
    (a, b) => +a + +Number(b.productPrice ? b.productPrice.split('/')[1] : '1'),
    0
  )
}
const statusFinder = state => {
  if (state === 'ENTREGADO') {
    return (
      <Badge color="success">{state}</Badge>
    )
  } else if (state === 'PROGRAMADO') {
    return (
      <Badge color="info">{state}</Badge>
    )
  } else if (state === 'PENDIENTE') {
    return (
      <Badge color="danger">{state}</Badge>
    )
  } else if (state === 'Despacho') {
    return (
      <Badge color="warning">{state}</Badge>
    )
  } else if (state === 'EN TRANSITO') {
    return (
      <Badge color="light-primary">{state}</Badge>
    )
  } else {
    return state
  }
}

// ** Table columns
export const columns = props => {
  return [
    {
      name: 'Predido',
      minWidth: '',
      selector: 'id',
      cell: row => <Link to={`/invoice/preview/${row.id}`}>{`#${parseInt(row.number)}`}</Link>
    },
    {
      name: 'Product',
      minWidth: '',
      selector: 'id',
      cell: row => (
        <Avatar img={row?.elements[0]?.productImage || avatarImg} />
      )
    },

    {
      name: 'CLIENTE',
      minWidth: '250px',
      selector: 'client',
      sortable: true,
      cell: row => {
        const name = row.name ? row.name : 'Name Not Present',
          email = row.email ? row.email : 'EMAILNOTFOUND'
        return (
          <div className='d-flex justify-content-left align-items-center'>
            {/* {renderClient(row)} */}
            <Avatar color="light-primary" className='mr-50' content={row.name ? row.name : 'John Doe'} initials />

            <div className='d-flex flex-column'>

              <h6 className='user-name text-truncate text-capitalize mb-0'>
                {name.toLowerCase().slice(0, 25)}
              </h6>
              <small className='text-truncate text-muted mb-0'>{email}</small>
            </div>
          </div>
        )
      }
    },
    {
      name: 'Total',
      selector: 'total',
      sortable: true,
      minWidth: '100px',
      cell: row => (
        <span>
          $
          {row.products
            ? TotalCounter(row.products)
            : ElementTotalCounter(row.elements) || 0}
        </span>
      )
    },
    {
      name: 'ESTADO',
      selector: 'state',
      sortable: true,
      minWidth: '',
      cell: row => statusFinder(row.state)
    },
    {
      name: 'FECHA',
      selector: 'dueDate',
      sortable: true,
      minWidth: '200px',
      cell: row => (
        moment(dateParser(row.created ? row.created.seconds : row.date.seconds)
        ).format("Do MMM YY")
      )
    },
    {
      name: 'Action',
      minWidth: '110px',
      selector: '',
      sortable: true,
      cell: row => (
        <div className='column-action d-flex align-items-center'>

          <Link to={`/invoice/preview/${row.id}`} >
            <Repeat size={17} id={`send-tooltip-${row.id}`} />
            <UncontrolledTooltip
              placement='top'
              target={`send-tooltip-${row.id}`}
            >
              Repeat Order
            </UncontrolledTooltip>
          </Link><Link to={`/invoice/preview/${row.id}`} id={`pw-tooltip-${row.id}`}>
            <Eye size={17} className='mx-1' />
          </Link>
          <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.id}`}>
            Preview Invoice
          </UncontrolledTooltip>
          <UncontrolledDropdown>
            <DropdownToggle tag='span'>
              <MoreVertical size={17} className='cursor-pointer' />
            </DropdownToggle>
            <DropdownMenu right>
              {/* <DropdownItem
                  tag='a'
                  href='/'
                  className='w-100'
                  onClick={e => e.preventDefault()}
                >
                  <Download size={14} className='mr-50' />
                  <span className='align-middle'>Download</span>
                </DropdownItem> */}
              {/* <DropdownItem
                  tag={Link}
                  to={`/apps/invoice/edit/${row.id}`}
                  className='w-100'
                >
                  <Edit size={14} className='mr-50' />
                  <span className='align-middle'>Edit</span>
                </DropdownItem> */}
              <DropdownItem
                tag='a'
                href='/'
                className='w-100'
                onClick={e => {
                  e.preventDefault()
                  store.dispatch(deleteInvoice(row.id)).then(res => {
                    console.log(res)
                    store.dispatch(
                      getData({
                        page: 1,
                        perPage: 10,
                        status: '',
                        q: props.q
                      })
                    )
                  })
                }}
              >
                <Trash size={14} className='mr-50' />
                <span className='align-middle'>Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  ]
}
