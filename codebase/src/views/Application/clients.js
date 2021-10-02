// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col } from 'reactstrap'

// ** Tables
import TableMultilingual from '../tables/data-tables/basic/TableMultilingual'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const Tables = () => {
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle='Dashboard'
        breadCrumbParent='Home'
        breadCrumbActive='Clients Table'
      />
      <Row>
        <Col sm='12'>
          <TableMultilingual />
        </Col>
      </Row>
    </Fragment>
  )
}

export default Tables
