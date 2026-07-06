import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import { logOut } from '../store/slices/authSlice.js'
import { useTranslation } from 'react-i18next'


function LogOutButton()  {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const loggedIn = useSelector(state => state.authData.loggedIn)

  return (
    loggedIn
    &&
    <Button
      className="btn btn-primary"
      onClick={() => {
        dispatch(logOut())
      }}>
      {t('actions.logout')}
    </Button>
  )
}

export default LogOutButton
