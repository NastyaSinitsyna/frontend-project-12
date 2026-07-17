import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import { ErrorBoundary } from '@rollbar/react'
import RollbarProvider from '../rollbar.jsx'
import i18nextInstance from './i18n/i18n.js'
import ErrorMessage from './components/ErrorMessage.jsx'

import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'


import App from './app/App.jsx'
import store from './store/index.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18nextInstance}>
        <RollbarProvider>
          <ErrorBoundary fallbackUI={ErrorMessage}>
            <App />
          </ErrorBoundary>
        </RollbarProvider>
      </I18nextProvider>
    </Provider>
  </StrictMode>
)
