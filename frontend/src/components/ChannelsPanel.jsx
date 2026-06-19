import { Button, Col } from 'react-bootstrap'
import { useEffect } from 'react'
import { useDispatch /*useSelector*/ } from 'react-redux'


//import cn from 'classnames'

import { fetchChannels, /*channelsSelectors, setCurrentChannel*/ } from '../slices/channelsSlice.js'

import ChannelsList from './ChannelsList.jsx'

function ChannelsPanel() {
  const dispatch = useDispatch()

  //const channels = useSelector(channelsSelectors.selectAll)
  //const currentChannelId = useSelector(state => state.channels.currentChannelId)

  useEffect(() => { 
    dispatch(fetchChannels())
  }, [])

  return (
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-3">
        <b>Каналы</b>
        <Button variant="primary">
          +
        </Button>
      </div>
      <ChannelsList />
    </Col>
  )
}

export default ChannelsPanel