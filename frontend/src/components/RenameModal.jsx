import { Button, Form, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react' 
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { validChannelSchema } from '../schemas/validChannelSchemas.js'

import { editChannel, channelsSelectors } from '../store/slices/channelsSlice.js'

function RenameModal({ show, onHide, channel }) {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const channels = useSelector(channelsSelectors.selectAll)
  const inputRef = useRef(null)
  const isLoading = useSelector(state => state.channels.isLoading)

  const formik = useFormik({
      initialValues: {name: channel.name},
      validationSchema: validChannelSchema(channels),
      validateOnChange: true,
      validateOnBlur: false,
      enableReinitialize: true,
      onSubmit: async (values) => {
        await dispatch(editChannel({
          editedChannel: values,
          channelId: channel.id
        })).unwrap()
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
              <Modal.Title>{t('actions.renameChannel')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>       
              <div className="form-floating mb-3">
                <Form.Control
                  id="name"
                  type="text"
                  name="name"
                  placeholder={t('view.channelName')}
                  required
                  value={formik.values.name}
                  ref={inputRef}
                  disabled={isLoading}
                  isInvalid={formik.touched.name && !!formik.errors.name}
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                />
                <Form.Label htmlFor="name">{t('view.channelName')}</Form.Label>
                <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
              </div>       
            </Modal.Body>
            <Modal.Footer>
              <div className="d-flex justify-content-end">
                <Button type="button" variant="secondary" disabled={isLoading} onClick={handleClose}>{t('actions.cancel')}</Button>
                <Button type="submit" variant="primary" disabled={isLoading}>{t('actions.send')}</Button>
              </div>
            </Modal.Footer>
          </Form>
        </Modal>
    </>
  )
}

export default RenameModal