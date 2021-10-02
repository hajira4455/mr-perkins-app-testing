import { MoreVertical, Edit, Trash } from 'react-feather'
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
const TableSmall = ({ products }) => {
  return (
    <Table size='sm' responsive>
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Created at</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.length &&
          products.map((item, index) => {
            return (
              <tr key={`trno-${index}`}>
                <td class='d-flex'>
                  <div
                    className='image_container d-inline-block'
                    style={{
                      width: '40px',
                      height: '40px',
                      marginRight: '10px',
                      backgroundImage: `url(${item.img})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  ></div>
                  {/* <img
                    className='mr-75'
                    src={item.img}
                    alt='angular'
                    height='18'
                    width='18'
                  /> */}
                  <span className='align-self-center font-weight-bold'>
                    {item.name}
                  </span>
                </td>
                <td>$ {item.price}</td>
                <td>{dateParser(item.created.seconds)}</td>
                <td>
                  <Badge pill color='light-primary' className='mr-1'>
                    Active
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
                      <DropdownItem href='/' onClick={e => e.preventDefault()}>
                        <Edit className='mr-50' size={15} />{' '}
                        <span className='align-middle'>Edit</span>
                      </DropdownItem>
                      <DropdownItem href='/' onClick={e => e.preventDefault()}>
                        <Trash className='mr-50' size={15} />{' '}
                        <span className='align-middle'>Delete</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>
              </tr>
            )
          })}
      </tbody>
    </Table>
  )
}

export default TableSmall
