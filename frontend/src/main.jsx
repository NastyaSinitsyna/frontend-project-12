import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'

import i18nextInstance from './i18n.js'

import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'


import App from './components/App.jsx'
import store from './store/index.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18nextInstance}>
        <App />
      </I18nextProvider>
    </Provider>
  </StrictMode>,
)
