import { Button, Form, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react' 
import { useFormik } from 'formik'
import { validChannelSchema } from '../validationSchemas.js'

import { editChannel, channelsSelectors } from '../store/slices/channelsSlice.js'

function RenameModal({ show, onHide, channel }) {
  const dispatch = useDispatch()
  const channels = useSelector(channelsSelectors.selectAll)
  const inputRef = useRef(null)
  const isLoading = useSelector(state => state.channels.isLoading)

  const formik = useFormik({
      initialValues: {name: channel.name},
      validationSchema: validChannelSchema(channels),
      validateOnChange: false,
      validateOnBlur: false,
      onSubmit: async (values, { resetForm }) => {
        await dispatch(editChannel({
          editedChannel: values,
          channelId: channel.id
        })).unwrap()
        resetForm()
        onHide()
      },
    })
  
    const handleChange = (e) => {
      formik.handleChange(e)
      formik.validateField('name')
    }
  
    const handleClose = () => {
      formik.resetForm()
      onHide()
    }
  
  return (
    <>
      <Modal show={show} onHide={handleClose} onEntered={() => inputRef.current?.select()}>
          <Form onSubmit={formik.handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>Переименовать канал</Modal.Title>
            </Modal.Header>
            <Modal.Body>       
              <div className="form-floating mb-3">
                <Form.Control
                  id="name"
                  type="text"
                  name="name"
                  placeholder='Имя канала'
                  required
                  value={formik.values.name}
                  ref={inputRef}
                  disabled={isLoading}
                  isInvalid={formik.touched.name && !!formik.errors.name}
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                />
                <Form.Label htmlFor="name">Имя канала</Form.Label>
                <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
              </div>       
            </Modal.Body>
            <Modal.Footer>
              <div className="d-flex justify-content-end">
                <Button type="button" variant="secondary" disabled={isLoading} onClick={handleClose}>Отменить</Button>
                <Button type="submit" variant="primary" disabled={isLoading}>Отправить</Button>
              </div>
            </Modal.Footer>
          </Form>
        </Modal>
    </>
  )
}

export default RenameModal