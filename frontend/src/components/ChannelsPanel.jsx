import { Button, Col, Form, Modal } from 'react-bootstrap'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { validChannelSchema } from '../schemas/validChannelSchemas.js'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { addChannel, setCurrentChannel, channelsSelectors } from '../store/slices/channelsSlice.js'

import ChannelsList from './ChannelsList.jsx'

function ChannelsPanel() {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const inputRef = useRef(null)
  const isLoading = useSelector(state => state.channels.isLoading)

  const channels = useSelector(channelsSelectors.selectAll)
  const [show, setShow] = useState(false)

  const formik = useFormik({
    initialValues: {name: ''},
    validationSchema: validChannelSchema(channels),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { resetForm }) => {
      try {
        const newChannel = await dispatch(addChannel(values)).unwrap()
        resetForm()
        dispatch(setCurrentChannel(newChannel.id))
        setShow(false)
        toast.success(t('messages.channelAdded'))
      }
      catch {
        toast.error(t('errors.connection'))
      }
    },
  })

  const handleChange = (e) => {
    formik.handleChange(e)
    formik.validateField('name')
  }

  const handleClose = () => {
    formik.resetForm()
    setShow(false)
  }

  return (
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-3">
        <b>{t('view.channels')}</b>
        <Button variant="primary" onClick={() => setShow(true)}>
          {t('view.addChannelButton')}
        </Button>
        <Modal show={show} onHide={handleClose} onEntered={() => inputRef.current?.focus()}>
          <Form onSubmit={formik.handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>{t('actions.addChannel')}</Modal.Title>
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
                  isInvalid={formik.touched.name && !!formik.errors.name}
                  disabled={isLoading}
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
                <Button type="submit" disabled={isLoading} variant="primary">{t('actions.send')}</Button>
              </div>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
      <ChannelsList />
    </Col>
  )
}

export default ChannelsPanel