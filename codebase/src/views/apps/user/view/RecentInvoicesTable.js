import { MoreVertical, Eye, Trash } from 'react-feather'
import { Link } from 'react-router-dom'
import {
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from 'reactstrap'
const dateParser = timestamp => {
  const date = new Date(timestamp * 1000)
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
}
const TableSmall = ({ items }) => {
  const TotalCounter = products => {
    return products.reduce((a, b) => +a + +Number(b.total), 0)
  }
  const ElementTotalCounter = products => {
    return products.reduce(
      (a, b) => +a + +Number(b.productPrice.split('/')[1]),
      0
    )
  }
  return (
    <Table size='sm' responsive>
      <thead>
        <tr>
          <th>Invoice ID</th>
          <th>Products</th>
          <th>Total</th>
          <th>Created at</th>
          <th>Nroguia</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.length > 0 &&
          items.map((item, index) => {
            return (
              <tr key={`invoiceno-${index}`}>
                <td className='d-flex'>
                  <span className='align-self-center font-weight-bold'>
                    <Link to={`/invoice/preview/${item.id}`}>{item.id}</Link>
                  </span>
                </td>
                <td>
                  {item.elements
                    ? item.elements.length
                    : item.products
                    ? item.products.length
                    : ''}
                </td>
                <td>
                  {item.products
                    ? TotalCounter(item.products)
                    : item.elements
                    ? ElementTotalCounter(item.elements)
                    : null}
                </td>
                <td>{dateParser(item.created.seconds)}</td>
                <td>
                  <Badge pill color='light-primary' className='mr-1'>
                    {item.nroGuia}
                  </Badge>
                </td>
                <td>
                  <UncontrolledDropdown>
                    <DropdownToggle
                      className='icon-btn hide-arrow'
                      color='transparent'
                      size='sm'
                      caret
                    >
                      <MoreVertical size={15} />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem
                        tag={Link}
                        to={`/invoice/preview/${item.id}`}
                      >
                        <Eye className='mr-50' size={15} />{' '}
                        <span className='align-middle'>View</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>
              </tr>
            )
          })}
        {items.length < 1 && (
          <tr>
            <td colSpan='5' className='text-center py-2'>
              <h4>No Invoices found</h4>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

export default TableSmall
