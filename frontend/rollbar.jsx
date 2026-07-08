import { Provider } from "@rollbar/react"

const config = {
  accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
  environment: import.meta.env.MODE  || 'development',
  captureUncaught: true,
  captureUnhandledRejections: true,
}

export default function RollbarProvider({ children }) {
  return (
    <Provider config={config}>
      {children}
    </Provider>
  )
}
