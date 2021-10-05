// ** User List Component
import { useState, useEffect } from 'react'
import Table from './Table'
import { useDispatch, useSelector } from 'react-redux'
import { getData } from '../../invoice/store/actions'
// ** Styles
import '@styles/react/apps/app-users.scss'
const UsersList = () => {
  const dispatch = useDispatch()
  const { allData } = useSelector(state => state.invoice)
  const [Invoices, setInvoices] = useState([])
  useEffect(() => {
    dispatch(
      getData({
        page: 1,
        perPage: 10,
        status: '',
        q: ''
      })
    )
  }, [])

  useEffect(() => {
    setInvoices(allData)
  }, [allData.length])

  return (
    <div className='app-user-list'>
      <Table />
    </div>
  )
}

export default UsersList
