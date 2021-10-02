import React, { useEffect, useState, Fragment } from 'react'
import { Row, Col, Card, CardBody, CardText, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import CardMedal from '@src/views/ui-elements/cards/advance/CardMedal'
import medal from '@src/assets/images/logo/mrperkinslogo.jpeg'

const ClientDashboard = ({
  allData,
  userData,
  thisMonthOrders,
  lastMothsOrders
}) => {
  const monthlySaleCaluclator = () => {
    const thismonthInvoices = allData.filter(data => {
      return (
        new Date(data.created.seconds * 1000).getMonth() ===
        new Date().getMonth()
      )
    })
    let totalBudget = 0
    thismonthInvoices.map(item => {
      if (item.products) {
        item.products.map(prod => {
          totalBudget = totalBudget + Number(prod.total)
        })
      }
    })
    return totalBudget
  }
  const PreviousMonthSaleCaluclator = () => {
    const thismonthInvoices = allData.filter(data => {
      return (
        new Date(data.created.seconds * 1000).getMonth() ===
        new Date().getMonth() - 1
      )
    })
    let totalBudget = 0
    thismonthInvoices.map(item => {
      if (item.products) {
        item.products.map(prod => {
          totalBudget = totalBudget + Number(prod.total)
        })
      }
    })
    return totalBudget
  }
  const OrdersSorted = () => {
    return allData
      .sort(function (a, b) {
        return (
          new Date(a.created.seconds * 1000) -
          new Date(b.created.seconds * 1000)
        )
      })
      .reverse()
  }
  return (
    <Row>
      <Fragment>
        <Col xl='4' md='6' xs='12'>
          <CardMedal
            thisMonthSales={monthlySaleCaluclator}
            title1='Your Monthly Purchase'
            title2=''
            PreviousMonthSale={PreviousMonthSaleCaluclator}
            type={userData.type}
            price={true}
            buttonTitle='View Purchases'
          />
        </Col>
        <Col xl='4' md='6' xs='12'>
          <CardMedal
            thisMonthSales={thisMonthOrders}
            title1='This Months Order'
            title2=''
            PreviousMonthSale={lastMothsOrders}
            type={userData.type}
            price={false}
            buttonTitle='View Orders'
          />
        </Col>
        <Col xl='4' md='6' xs='12'>
          <Card className='card-congratulations-medal '>
            <CardBody>
              <div className='leftts'>
                <CardText className='font-small-3'>
                  Status Of Last Order{' '}
                </CardText>

                <h3 className='mb-75'>
                  <a href='/' onClick={e => e.preventDefault()}>
                    {OrdersSorted().length > 0 && OrdersSorted()[0].status}
                  </a>
                  &nbsp;
                </h3>
              </div>
              <img
                className='congratulation-medal'
                width='100px'
                style={{ marginTop: '20px', right: '7px' }}
                src={medal}
                alt='Medal Pic'
              />
              <Link to='/orders'>
                <Button.Ripple className='mt-1' color='primary'>
                  View Order
                </Button.Ripple>
              </Link>
            </CardBody>
          </Card>
        </Col>
      </Fragment>
    </Row>
  )
}

export default ClientDashboard
