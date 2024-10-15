import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { Provider } from 'react-redux'
import { store } from './libs/store.js'
import './javaScript files/i18n.js'
import AuthenticationContextProvider from './context/AuthenticationContext/AuthenticationContextProvider.jsx'
import 'swiper/css'




createRoot(document.getElementById('root')).render(
  <>
  <Provider store={store}>
    <AuthenticationContextProvider>
      <App />
    </AuthenticationContextProvider>
  </Provider>
  </>,
)
