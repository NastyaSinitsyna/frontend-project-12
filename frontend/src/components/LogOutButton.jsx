import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import { logOut } from '../store/slices/authSlice.js'


function LogOutButton()  {
  const dispatch = useDispatch()
  const loggedIn = useSelector(state => state.authData.loggedIn)
  return (
    loggedIn
    &&
    <Button
      className="btn btn-primary"
      onClick={() => {
        dispatch(logOut())
      }}>
      Выйти
    </Button>
  )
}

export default LogOutButton
