import { useState, useEffect, Fragment } from 'react'
import { Card, CardBody, CardText, Button } from 'reactstrap'
import medal from '@src/assets/images/logo/FIRMA-01-01.png'
import { TrendingUp, TrendingDown } from 'react-feather'
import { Link } from 'react-router-dom'
import Avatar from '@components/avatar'
import { numberFormat } from '../../../../utility/Utils'
const CardMedal = ({
  thisMonthSales,
  title1,
  title2,
  PreviousMonthSale,
  type = 'user',
  price,
  buttonTitle
}) => {
  const [Status, setStatus] = useState(true)

  useEffect(() => {
    if (PreviousMonthSale && thisMonthSales) {
      setStatus(thisMonthSales() > PreviousMonthSale() ? Status : !Status)
    }
  }, [thisMonthSales(), PreviousMonthSale()])
  return (
    <Card className='card-congratulations-medal '>
      <CardBody>
        <div className='leftts'>
          <CardText className='font-small-3'>{title1} </CardText>

          <h3 className='mb-75'>
            <a href='/' onClick={e => e.preventDefault()}>
              {price ? 'S/' : ''} {numberFormat(thisMonthSales())}
            </a>
            &nbsp;
            <Fragment>
              {Status ? (
                <Avatar
                  color='light-success'
                  icon={<TrendingUp size={24} />}
                  className='mr-2'
                />
              ) : (
                <Avatar
                  color='light-danger'
                  icon={<TrendingDown size={24} />}
                  className='mr-2'
                />
              )}
            </Fragment>
          </h3>
         {/* <CardText className='font-small-3'>{title2} </CardText> */}
        </div>
        <img
          className='congratulation-medal'
          width='100px'
          style={{ marginTop: '47px', right: '20px' }}
          src={medal}
          alt='Medal Pic'
        />
        <Link to='/orders'>
          <Button.Ripple className='mt-1' color='primary'>
            {buttonTitle}
          </Button.Ripple>
        </Link>
      </CardBody>
    </Card>
  )
}

export default CardMedal
