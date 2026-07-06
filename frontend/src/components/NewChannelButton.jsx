import { Button, ButtonGroup, Dropdown } from 'react-bootstrap'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setCurrentChannel } from '../store/slices/channelsSlice.js'
import { toggleButtonVariant } from '../utilities.js'
import RemoveModal from './RemoveModal.jsx'
import RenameModal from './RenameModal.jsx'

function NewChannelButton({ channel }) {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const currentChannelId = useSelector(state => state.channels.currentChannelId)

  const [showRemove, setShowRemove] = useState(false)
  const [showRename, setShowRename] = useState(false)
  
  return (
    <Dropdown as={ButtonGroup} className="w-100">
      <Button
        variant={toggleButtonVariant(channel.id, currentChannelId)}
        className="flex-grow-1 text-start text-truncate"
        onClick={() => dispatch(setCurrentChannel(channel.id))}>
        <span className="me-1">#</span>
        {channel.name}
      </Button>
      <Dropdown.Toggle split variant={toggleButtonVariant(channel.id, currentChannelId)} id="dropdown-split-basic" />
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => setShowRemove(true)}>{t('actions.remove')}</Dropdown.Item>
        <Dropdown.Item onClick={() => setShowRename(true)}>{t('actions.rename')}</Dropdown.Item>
      </Dropdown.Menu>

      <RemoveModal show={showRemove} onHide={() => setShowRemove(false)} channelId={channel.id} />
      <RenameModal show={showRename} onHide={() => setShowRename(false)} channel={channel}/>
    
    </Dropdown>
  )
}

export default NewChannelButton