import { Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { removeChannel } from '../store/slices/channelsSlice.js'
import { hideModal } from '../store/slices/modalSlice.js'
import { toast } from 'react-toastify'


function RemoveModal() {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { show, channel } = useSelector(state => state.modal)
  const isLoading = useSelector(state => state.channels.isLoading)

  const handleRemove = async () => {
    try {
      await dispatch(removeChannel(channel.id)).unwrap()
      dispatch(hideModal())
      toast.success(t('messages.channelRemoved'))
    }
    catch (error) {
      toast.error(t('errors.connection'))
      throw error
    }
  }
  
  return (
    <>
      <Modal show={show} onHide={() => dispatch(hideModal())}>          
        <Modal.Header closeButton>
          <Modal.Title>{t('actions.removeChannel')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>       
          <div className="form-floating mb-3">
            <p className="lead">{t('view.confirmation')}</p>
          </div>       
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex justify-content-end">
            <Button type="button" variant="secondary" disabled={isLoading} onClick={() => dispatch(hideModal())}>{t('actions.cancel')}</Button>
            <Button type="button" variant="danger" disabled={isLoading} onClick={handleRemove}>{t('actions.remove')}</Button>
          </div>
        </Modal.Footer>
    </Modal>
    </>
  )
}

export default RemoveModal