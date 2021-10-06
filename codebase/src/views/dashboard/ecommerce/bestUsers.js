import { useState, useEffect } from 'react'
// ** Third Party Components

import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card, CardHeader, CardTitle } from 'reactstrap'

const BestUsersTable = ({ data, unsortedData }) => {
  const sortedData = unsortedData()
  const [dataforTable, setDataforTable] = useState([])

  useEffect(() => {
    sortedData.sort((a, b) => {
      if (a.value < b.value) return -1
      return a.value > b.value ? 1 : 0
    })
    // setSelectedRows(sortedData.reverse().slice(0, 30))
    const filteredData = []
    sortedData
      .reverse()
      .slice(0, 30)
      .map(item => {
        const found = data.filter(id => id.id === item.id)[0]
        // found.sales = item.value
        filteredData.push(found)
      })
    setDataforTable(filteredData)
  }, [unsortedData])

  const SalesCalculator = ({ row }) => {
    return row.sales
  }
  const basicColumns = [
    {
      name: 'ID',
      selector: 'id',
      sortable: true,
      maxWidth: '300px'
    },
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
      minWidth: '300px'
    },
    {
      name: 'Email',
      selector: 'email',
      sortable: true,
      minWidth: '200px'
    },
    {
      name: 'Sales',
      selector: 'sales',
      sortable: true,
      maxWidth: '20px',
      cell: row => <SalesCalculator row={row} />
    }
  ]
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Top Purchasing Clients</CardTitle>
      </CardHeader>
      <DataTable
        noHeader
        pagination
        data={dataforTable}
        columns={basicColumns}
        className='react-dataTable'
        sortIcon={<ChevronDown size={10} />}

        paginationPerPage={15}
        paginationRowsPerPageOptions={[15, 25, 50, 100]}
      />
    </Card>
  )
}

export default BestUsersTable
