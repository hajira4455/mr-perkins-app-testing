import { useState, useEffect } from 'react'
import Chart from 'react-apexcharts'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

const ApexRadialbar = ({ allUsers, usersData }) => {
  const [serialArray, setSerialArray] = useState([])
  useEffect(() => {
    const serailArray2 = []
    Object.keys(usersData()).map(item => {
      serailArray2.push(
        ((usersData()[item] / allUsers.length) * 100).toFixed(2)
      )
      // console.log()
    })
    setSerialArray(serailArray2)
  }, [usersData])
  const donutColors = {
    series1: '#ffe700',
    series2: '#00d4bd',
    series3: '#826bf8',
    series4: '#2b9bf4',
    series5: '#FFA1A1'
  }

  const options = {
    colors: [donutColors.series1, donutColors.series2, donutColors.series4],
    plotOptions: {
      radialBar: {
        size: 185,
        hollow: {
          size: '25%'
        },
        track: {
          margin: 15
        },
        dataLabels: {
          name: {
            fontSize: '2rem',
            fontFamily: 'Montserrat'
          },
          value: {
            fontSize: '1rem',
            fontFamily: 'Montserrat'
          },
          total: {
            show: true,
            fontSize: '1rem',
            label: 'Users',
            formatter (w) {
              return allUsers.length
            }
          }
        }
      }
    },
    grid: {
      padding: {
        top: -35,
        bottom: -30
      }
    },
    legend: {
      show: true,
      position: 'bottom'
    },
    stroke: {
      lineCap: 'round'
    },
    labels: Object.keys(usersData())
  }

  return (
    <Card>
      <CardHeader className='d-flex flex-sm-row flex-column justify-content-md-between align-items-start justify-content-start'>
        <CardTitle tag='h4'>User With Categories</CardTitle>
      </CardHeader>
      <CardBody>
        <Chart
          options={options}
          series={serialArray}
          type='radialBar'
          height={350}
        />
      </CardBody>
    </Card>
  )
}

export default ApexRadialbar
