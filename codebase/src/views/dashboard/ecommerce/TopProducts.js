import { useState, useEffect } from 'react'
// ** Third Party Components

import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card, CardHeader, CardTitle } from 'reactstrap'

const BestProductsTable = ({ data }) => {
  const [dataforTable, setDataforTable] = useState([])

  useEffect(() => {
    setDataforTable(data)
  }, [data])

  const SalesCalculator = ({ row }) => {
    return row?.sales
  }
  const basicColumns = [
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
      minWidth: '200px'
    },

    {
      name: 'Sales',
      selector: 'sales',
      sortable: true,
      maxWidth: '200px',
      cell: row => <SalesCalculator row={row} />
    },
    {
      name: 'Orders',
      selector: 'orders',
      sortable: true,
      maxWidth: '20px',
      cell: row => row.orders
    }
  ]
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Top Selling Products</CardTitle>
      </CardHeader>
      <DataTable
        noHeader
        pagination
        data={dataforTable}
        columns={basicColumns}
        paginationPerPage={5}
        className='react-dataTable'
        sortIcon={<ChevronDown size={10} />}
        paginationRowsPerPageOptions={[5, 10, 15, 20]}
      />
    </Card>
  )
}

export default BestProductsTable
