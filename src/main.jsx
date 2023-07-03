import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter, Routes ,Route} from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/" element={<App />}/>
    </Routes>
    
  </BrowserRouter>
)