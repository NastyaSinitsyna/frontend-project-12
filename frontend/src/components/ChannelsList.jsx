import { Button, ButtonGroup, Dropdown } from 'react-bootstrap'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchChannels, channelsSelectors, setCurrentChannel, removeChannel, editChannel } from '../slices/channelsSlice.js'

function ChannelsList() {
  const dispatch = useDispatch()

  const channels = useSelector(channelsSelectors.selectAll)
  const currentChannelId = useSelector(state => state.channels.currentChannelId)

  useEffect(() => { 
    dispatch(fetchChannels())
  }, [channels])
  
  const toggleButtonVariant = id => id === currentChannelId ? "secondary" : "light"

  const renderChannelButton = (channel) => {
    const { id, name, removable } = channel
    if (removable) {
      return (
        <Dropdown as={ButtonGroup} className="w-100">
          <Button
            variant={toggleButtonVariant(id)}
            className="flex-grow-1 text-start text-truncate"
            onClick={() => dispatch(setCurrentChannel(id))}>
            {name}
          </Button>
          <Dropdown.Toggle split variant={toggleButtonVariant(id)} id="dropdown-split-basic" />
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => dispatch(removeChannel(id))}>Удалить</Dropdown.Item>
            <Dropdown.Item>Переименовать</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )
    }
    return(
      <Button
        type="button"
        variant={toggleButtonVariant(id)}
        className="w-100 rounded-0 text-start"
        onClick={() => dispatch(setCurrentChannel(id))}>
        {channel.name}
      </Button>
    )
  }

  return (
    <>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (
          <li key={channel.id} id={channel.id} className="nav-item w-100">
            {renderChannelButton(channel)}
          </li>
        ))}
      </ul>
    </>
  )
}

export default ChannelsList