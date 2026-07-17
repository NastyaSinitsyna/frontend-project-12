import { Container, Row } from 'react-bootstrap'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ChannelsPanel from '../components/panels/ChannelsPanel.jsx'
import MessagesPanel from '../components/panels/MessagesPanel.jsx'
import { fetchChannels } from '../store/slices/channelsSlice.js'
import { fetchMessages } from '../store/slices/messagesSlice.js'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'


function MainPage() {
  const dispatch = useDispatch()
  const { t } = useTranslation()


  useEffect(() => { 
    const loadData = async () => {
      await Promise.all([
        dispatch(fetchChannels()).unwrap(),
        dispatch(fetchMessages()).unwrap()
      ]).catch(() => toast.error(t('errors.connection')))
    }

    loadData()
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