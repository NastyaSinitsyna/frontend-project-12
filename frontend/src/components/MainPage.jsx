import { Button, Col, Container, Row } from 'react-bootstrap'


// const getAuthHeader = () => {
//   const token = localStorage.getItem(token)
//   if (token) {
//     return { Authorization: `Bearer ${token}` }
//   }
//   return {}
// }

function MainPage() {

  return (
    <Container className="flex-grow-1 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-3">
            <b>Каналы</b>
            <Button className="btn btn-primary">+</Button>
          </div>
          <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">

          </ul>
        </Col>
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b>Название канала</b>
              </p>
              <span className="text-muted">Количество сообщений</span>
            </div>
            <div id="messages-box" className="chat-messages overflow-auto px-5 flex-grow-1"></div>
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