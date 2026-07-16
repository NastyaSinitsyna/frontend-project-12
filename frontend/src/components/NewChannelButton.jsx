import { Button, ButtonGroup, Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setCurrentChannel } from '../store/slices/channelsSlice.js'
import { toggleButtonVariant } from '../utilities.js'
import filter from '../filter.js'
import { showModal } from '../store/slices/modalSlice.js'

function NewChannelButton({ channel }) {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const currentChannelId = useSelector(state => state.channels.currentChannelId)

  const handleModal = (type) => {
    dispatch(showModal({
      type,
      show: true,
      channel: channel
    }))
  }

  return (
    <Dropdown as={ButtonGroup} className="w-100">
      <Button
        variant={toggleButtonVariant(channel.id, currentChannelId)}
        className="w-100 rounded-0 text-start text-truncate"
        onClick={() => dispatch(setCurrentChannel(channel.id))}>
        <span className="me-1">#</span>
        {filter(channel.name)}
      </Button>
      <Dropdown.Toggle split variant={toggleButtonVariant(channel.id, currentChannelId)} id="dropdown-split-basic">
        <span className="visually-hidden">{t('view.channelManagement')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleModal('remove')}>{t('actions.remove')}</Dropdown.Item>
        <Dropdown.Item onClick={() => handleModal('rename')}>{t('actions.rename')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default NewChannelButton