import { Button, Col } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { channelsSelectors } from '../slices/channelsSlice.js'
import { addMessage, fetchMessages, messagesSelectors } from '../slices/messagesSlice.js'

function MessagesPanel() {
  const dispatch = useDispatch()

  useEffect(() => { 
    dispatch(fetchMessages())
  }, [])

  const currentChannelId = useSelector(state => state.channels.currentChannelId)
  const currentChannel = useSelector(state => channelsSelectors.selectById(state, currentChannelId))
  const currentMessages = useSelector(messagesSelectors.selectAll)
    .filter((message) => message.channelId === currentChannelId)

  const [messageBody, setMessageBody] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const newMessage = {
      body: messageBody,
      channelId: currentChannelId,
      username: currentChannel.username,
    }
    console.log(newMessage)
    dispatch(addMessage(newMessage))
  }
  

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{currentChannel?.name ?? 'Название канала'}</b>
          </p>
          <span className="text-muted">Количество сообщений</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 flex-grow-1">
          {currentMessages.map((message) => {
            return (
              <div key={message.id} className="text-break mb-2">
                <b>{message.username}</b>
                {": "}
                {message.body}
              </div>
            )
          }
          )}
        </div>
        <div className="mt-auto px-5 py-3">
          <form
            className="py-1 border rounded-2"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="d-flex gap-2">
              <input
                name="body"
                aria-label="Новое сообщение"
                placeholder="Введите сообщение..."
                className="border-0 p-0 ps-2 form-control"
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
              />
              <Button type="submit">Отправить</Button>
            </div>
          </form>
        </div>
      </div>
    </Col>
  )
}

export default MessagesPanel