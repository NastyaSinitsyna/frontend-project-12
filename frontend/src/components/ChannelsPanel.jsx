import { Button, Col } from 'react-bootstrap'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cn from 'classnames'

import { fetchChannels, channelsSelectors, setCurrentChannel } from '../slices/channelsSlice.js'

function ChannelsPanel() {
  const dispatch = useDispatch()

  const channels = useSelector(channelsSelectors.selectAll)
  const currentChannelId = useSelector(state => state.channels.currentChannelId)

  useEffect(() => { 
    dispatch(fetchChannels())
  }, [])

  return (
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-3">
        <b>Каналы</b>
        <Button className="btn btn-primary">
          +
        </Button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (
          <li key={channel.id} id={channel.id} className="nav-item w-100">
            <button
              type="button"
              className={cn('w-100', 'rounded-0', 'text-start', 'btn', {'btn-secondary': channel.id === currentChannelId})}
              onClick={() => dispatch(setCurrentChannel(channel.id))}>
              {channel.name}
            </button>
          </li>
        ))}
      </ul>
    </Col>
  )
}

export default ChannelsPanel