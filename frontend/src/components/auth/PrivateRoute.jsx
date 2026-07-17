import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'


function PrivateRoute({ children}) {
  const loggedIn = useSelector(state => state.authData.loggedIn)
  const location = useLocation()
  return(
    loggedIn ? children : <Navigate to="/login" state={{ from: location}} replace={true} />
  )
}

export default PrivateRoute
