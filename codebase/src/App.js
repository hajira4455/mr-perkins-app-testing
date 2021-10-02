// ** Router Import
import { Suspense, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from 'reactstrap'
import { firstLoadingAuth } from './redux/actions/auth'
import Router from './router/Router'
import { AbilityContext } from '@src/utility/context/Can'

const App = () => {
  const ability = useContext(AbilityContext)

  const login = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const loadAuth = () => {
    const user = JSON.parse(localStorage.getItem("userData"))
    if (user) {
      dispatch(firstLoadingAuth())
    }
  }

  useEffect(() => loadAuth(), [])

  const loading = login.isAuthenticated.initializing

  return loading ? <Suspense fallback={<Spinner />} /> : <Router />
}

export default App
