import { Button, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import { removeChannel } from '../slices/channelsSlice.js'

function RemoveModal({ show, onHide, channelId }) {
  const dispatch = useDispatch()

  const handleRemove = () => {
    dispatch(removeChannel(channelId))
    onHide()
  }
  
  return (
    <>
      <Modal show={show} onHide={onHide}>          
        <Modal.Header closeButton>
          <Modal.Title>Удалить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>       
          <div className="form-floating mb-3">
            <p className="lead">Уверены?</p>
          </div>       
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex justify-content-end">
            <Button type="button" variant="secondary" onClick={onHide}>Отменить</Button>
            <Button type="button" variant="danger" onClick={handleRemove}>Удалить</Button>
          </div>
        </Modal.Footer>
    </Modal>
    </>
  )
}

export default RemoveModal