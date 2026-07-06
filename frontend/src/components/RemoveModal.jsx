import { Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { removeChannel } from '../store/slices/channelsSlice.js'

function RemoveModal({ show, onHide, channelId }) {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const isLoading = useSelector(state => state.channels.isLoading)

  const handleRemove = () => {
    dispatch(removeChannel(channelId))
    onHide()
  }
  
  return (
    <>
      <Modal show={show} onHide={onHide}>          
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
            <Button type="button" variant="secondary" disabled={isLoading} onClick={onHide}>{t('actions.cancel')}</Button>
            <Button type="button" variant="danger" disabled={isLoading} onClick={handleRemove}>{t('actions.remove')}</Button>
          </div>
        </Modal.Footer>
    </Modal>
    </>
  )
}

export default RemoveModal