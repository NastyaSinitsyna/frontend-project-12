import { Container, Row } from 'react-bootstrap'

import ChannelsPanel from './ChannelsPanel.jsx'
import MessagesPanel from './MessagesPanel.jsx'

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