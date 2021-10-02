import { useState, useEffect } from 'react'
import Chart from 'react-apexcharts'
import Flatpickr from 'react-flatpickr'
import { Calendar } from 'react-feather'
import { Card, CardHeader, CardTitle, CardBody, CardSubtitle } from 'reactstrap'

const ApexBarChart = ({ info, direction, allUsers, groupByKey }) => {
  const [usersGroup, setUsersGroup] = useState([])
  useEffect(() => {
    const UsersData = {}
    const data = groupByKey(allUsers, 'province')
    Object.keys(data).map(item => {
      UsersData[item] = data[item].length
    })
    setUsersGroup(UsersData)
  }, [allUsers, groupByKey])
  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: '10%',
        endingShape: 'rounded'
      }
    },
    grid: {
      xaxis: {
        lines: {
          show: false
        }
      }
    },
    colors: info,
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: Object.keys(usersGroup)
    },
    yaxis: {
      opposite: direction === 'rtl'
    }
  }

  const series = [
    {
      data: Object.values(usersGroup)
    }
  ]

  return (
    <Card>
      <CardHeader className='d-flex flex-sm-row flex-column justify-content-md-between align-items-start justify-content-start'>
        <div>
          <CardTitle className='mb-25'>Users with Provinces</CardTitle>
          {/* <CardTitle className='font-weight-bolder' tag='h4'>
            $74,382.72
          </CardTitle> */}
        </div>
        {/* <div className='d-flex align-items-center mt-md-0 mt-1'>
          <Calendar size={17} />
          <Flatpickr
            options={{
              mode: 'range',
              defaultDate: ['2019-05-01', '2019-05-10']
            }}
            className='form-control flat-picker bg-transparent border-0 shadow-none'
          />
        </div> */}
      </CardHeader>
      <CardBody>
        <Chart options={options} series={series} type='bar' height={400} />
      </CardBody>
    </Card>
  )
}

export default ApexBarChart
