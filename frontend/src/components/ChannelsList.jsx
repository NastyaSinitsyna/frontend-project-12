import { useSelector } from 'react-redux'
import { channelsSelectors } from '../store/slices/channelsSlice.js'

import DefaultChannelButton from './DefaultChannelButton.jsx'
import NewChannelButton from './NewChannelButton.jsx'

function ChannelsList() {
  const channels = useSelector(channelsSelectors.selectAll)

  return (
    <>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (
          <li key={channel.id} id={channel.id} className="nav-item w-100">
            {channel.removable
              ? <NewChannelButton channel={channel}/>
              : <DefaultChannelButton channel={channel}/>
            }
          </li>
        ))}
      </ul>
    </>
  )
}

export default ChannelsList