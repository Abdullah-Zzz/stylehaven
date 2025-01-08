import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import App from './App.jsx'
import './index.css'
import ScrollToTop from './components/scrollToTop/scroll.jsx'
import { store } from './redux/store/store.js'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
      <ScrollToTop />
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
