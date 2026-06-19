import { Container, Row } from 'react-bootstrap'

import ChannelsPanel from '../components/ChannelsPanel.jsx'
import MessagesPanel from '../components/MessagesPanel.jsx'

function MainPage() {
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