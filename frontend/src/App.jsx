import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from './components/MainPage.jsx'
import AuthorizationPage from './components/AuthorizationPage.jsx'
import NotFoundPage from './components/NotFoundPage.jsx'



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<AuthorizationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
