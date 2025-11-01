import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

// Bootstrap CSS & JS
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css'

// Custom CSS
import './assets/css/main.css'
import './assets/css/animate.min.css'

// loading Skeleton 

import 'react-loading-skeleton/dist/skeleton.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
