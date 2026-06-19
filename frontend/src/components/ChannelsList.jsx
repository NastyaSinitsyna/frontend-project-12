import { Button } from 'react-bootstrap'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cn from 'classnames'

import { fetchChannels, channelsSelectors, setCurrentChannel } from '../slices/channelsSlice.js'

function ChannelsList() {
  const dispatch = useDispatch()

  const channels = useSelector(channelsSelectors.selectAll)
  const currentChannelId = useSelector(state => state.channels.currentChannelId)

  useEffect(() => { 
    dispatch(fetchChannels())
  }, [])

  return (
    <>
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
    </>
  )
}

export default ChannelsList