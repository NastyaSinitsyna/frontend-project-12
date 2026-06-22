import { Button, Col, Form, Modal } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { validChannelSchema } from '../validationSchemas.js'

import { addChannel, fetchChannels,channelsSelectors } from '../slices/channelsSlice.js'

import ChannelsList from './ChannelsList.jsx'

function ChannelsPanel() {
  const dispatch = useDispatch()

  useEffect(() => { 
    dispatch(fetchChannels())
  }, [])

  const channels = useSelector(channelsSelectors.selectAll)
  const [show, setShow] = useState(false)

  const formik = useFormik({
    initialValues: {name: ''},
    validationSchema: validChannelSchema(channels),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { resetForm }) => {
      await dispatch(addChannel(values))
      resetForm()
      setShow(false)
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
        <b>Каналы</b>
        <Button variant="primary" onClick={() => setShow(true)}>
          +
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Form onSubmit={formik.handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>Добавить канал</Modal.Title>
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
                <Button type="button" variant="secondary" onClick={handleClose}>Отменить</Button>
                <Button type="submit" variant="primary">Отправить</Button>
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