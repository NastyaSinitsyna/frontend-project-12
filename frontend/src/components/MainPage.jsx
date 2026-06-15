import { Button, Col, Container, Row } from 'react-bootstrap'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cn from 'classnames'

import { fetchChannels, channelsSelectors, setCurrentChannel } from '../slices/channelsSlice.js'
import { fetchMessages, messagesSelectors } from '../slices/messagesSlice.js'


const getAuthHeader = () => {
  const token = localStorage.getItem('token')
  if (token) {
    return { Authorization: `Bearer ${token}` }
  }
  return {}
}

function MainPage() {
  const dispatch = useDispatch()

  const AuthHeader = getAuthHeader()

  const channels = useSelector(channelsSelectors.selectAll)
  const currentChannelId = useSelector(state => state.channels.currentChannelId)
  const currentChannel = useSelector(state => 
    currentChannelId
    ? channelsSelectors.selectById(state, currentChannelId)
    : null
  )

  //xconst messages = useSelector(messagesSelectors.selectAll).filter((message) => message.channelId === currentChannelId)

  useEffect(() => { 
    dispatch(fetchChannels(AuthHeader))
    dispatch(fetchMessages(AuthHeader))
  }, [])

  return (
    <Container className="flex-grow-1 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-3">
            <b>Каналы</b>
            <Button className="btn btn-primary">+</Button>
          </div>
          <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
            {channels.map(({ id, name, removable }) => (
              <li key={id} id={id} className="nav-item w-100">
                <button
                  type="button"
                  className={cn('w-100', 'rounded-0', 'text-start', 'btn', {'btn-secondary': id === currentChannelId})}
                  onClick={() => dispatch(setCurrentChannel(id))}>
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </Col>
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b>{currentChannel?.name ?? 'Название канала'}</b>
              </p>
              <span className="text-muted">Количество сообщений</span>
            </div>
            <div id="messages-box" className="chat-messages overflow-auto px-5 flex-grow-1">
              {messages.map((message) => {
                const { id, body, channelId, username } = message
                return (
                  <div key={id} className="text-break mb-2">
                    <b>{username}</b>
                    {": "}
                    {body}
                  </div>
                )
              }
              )}
            </div>
            <div className="mt-auto px-5 py-3">
              <form className="py-1 border rounded-2">
                <div className="d-flex gap-2">
                  <input
                  name="body"
                  aria-label="Новое сообщение"
                  placeholder="Введите сообщение..."
                  className="border-0 p-0 ps-2 form-control"
                  value="" />
                  <Button type="submit">Отправить</Button>
                </div>
              </form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>  
  )
}

export default MainPage