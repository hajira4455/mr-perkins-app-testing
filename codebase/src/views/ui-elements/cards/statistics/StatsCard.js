import classnames from 'classnames'
import Avatar from '@components/avatar'
import { TrendingUp, User, Box, DollarSign } from 'react-feather'
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Row,
  Col,
  Media
} from 'reactstrap'

const StatsCard = ({ orders, users, products, cols }) => {
  const NewUsersCalculator = () => {
    if (users.length > 0) {
      const thisMonthUsers = users.filter(item => {
        if (item.created) {
          if (
            new Date(item.created.seconds * 1000).getMonth() ===
            new Date().getMonth()
          ) {
            return item
          }
        }
      })
      return thisMonthUsers.length
    }
    return 0
  }
  const data = [
    {
      title: orders(),
      subtitle: 'Orders',
      color: 'light-primary',
      icon: <TrendingUp size={24} />
    },
    {
      title: users.length,
      subtitle: 'Customers',
      color: 'light-info',
      icon: <User size={24} />
    },
    {
      title: products,
      subtitle: 'Products',
      color: 'light-danger',
      icon: <Box size={24} />
    },
    {
      title: NewUsersCalculator(),
      subtitle: 'New Customers',
      color: 'light-success',
      icon: <User size={24} />
    }
  ]

  const renderData = () => {
    return data.map((item, index) => {
      const margin = Object.keys(cols)
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin[0]}-0`]: index !== data.length - 1
          })}
        >
          <Media>
            {console.log("item", item)}
            <Avatar color={item.color} icon={item.icon} className='mr-2' />
            <Media className='my-auto' body>
              <h4 className='font-weight-bolder mb-0'>{item.title}</h4>
              <CardText className='font-small-3 mb-0'>{item.subtitle}</CardText>
            </Media>
          </Media>
        </Col>
      )
    })
  }

  return (
    <Card className='card-statistics'>
      <CardHeader>
        <CardTitle tag='h4'>Statistics</CardTitle>
        <CardText className='card-text font-small-2 mr-25 mb-0'>
          Updated 1 month ago
        </CardText>
      </CardHeader>
      <CardBody className='statistics-body'>
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
  )
}

export default StatsCard
