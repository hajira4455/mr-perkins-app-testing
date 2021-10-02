import React from 'react'
import { Row, Col, Card, CardTitle, CardBody } from 'reactstrap'
const Contact = () => {
  return (
    <div>
      <Row>
        <Col md={6}>
          <Card className='p-2'>
            <CardTitle>Bank Details</CardTitle>
            <CardBody>
              <Row>
                <Col md={6} className='font-weight-bold'>
                  Razon Social:
                </Col>
                <Col md={6}>Vigo Group Sac</Col>
                <Col md={6} className='font-weight-bold'>
                  Ruc:
                </Col>
                <Col md={6}>20601104165</Col>

                <Col md={12}>BCP Cte cte Soles</Col>
                <Col md={6} className='font-weight-bold'>
                  Bcp:
                </Col>
                <Col md={6}>193-2298652-0-05</Col>
                <Col md={6} className='font-weight-bold'>
                  CCI:
                </Col>
                <Col md={6}>002-193-002298652005-18</Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="p-2">
            <CardTitle>Contact Details</CardTitle>
            <CardBody>
              <Row>
                <Col md={6} className='font-weight-bold'>
                  Title
                </Col>
                <Col md={6}>VIGO GROUP SAC</Col>
                <Col md={6} className='font-weight-bold'>
                  Ruc:
                </Col>
                <Col md={6}>20601104165</Col>
                <Col md={6} className='font-weight-bold'>
                  Address:
                </Col>
                <Col md={6}>
                  LUIS FELIPE VILLARAN 1010, OFICINA 102, SAN ISIDRO
                </Col>
                <Col md={6}>TEL</Col>
                <Col md={6} className='font-weight-bold'>
                  982096494
                </Col>

                <Col md={6} className='font-weight-bold'>
                  EMAIL:
                </Col>
                <Col md={6}>hola@mrperkins.com.pe , admin@vigogroup.pe</Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Contact
