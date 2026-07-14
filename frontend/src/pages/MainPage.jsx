import { Container, Row } from 'react-bootstrap'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ChannelsPanel from '../components/ChannelsPanel.jsx'
import MessagesPanel from '../components/MessagesPanel.jsx'
import { fetchChannels } from '../store/slices/channelsSlice.js'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'


function MainPage() {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  useEffect(() => { 
    try {
      dispatch(fetchChannels())
    }
    catch (error) {
      toast.error(t('errors.connection'))
      throw error
    }
  }, [])

  return (
    <Container className="flex-grow-1 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <ChannelsPanel />
        <MessagesPanel />
      </Row>
    </Container>  
  )
}

export default MainPage