import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { setCurrentChannel } from '../slices/channelsSlice.js'
import { toggleButtonVariant } from '../utilities.js'

function DefaultChannelButton({ channel }) {
  const dispatch = useDispatch()

  const currentChannelId = useSelector(state => state.channels.currentChannelId)
    
  return(
    <Button
      type="button"
      variant={toggleButtonVariant(channel.id, currentChannelId)}
      className="w-100 rounded-0 text-start"
      onClick={() => dispatch(setCurrentChannel(channel.id))}>
      <span className="me-1">#</span>
      {channel.name}
    </Button>
  )
}

export default DefaultChannelButton