import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './Projects/SanWeather/App.jsx'
// import App from './Projects/SanBmiCalculator/App.jsx'
// import App from './Projects/SanCurrencyConverter/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)