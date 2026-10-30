import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import api from '../apis/axios'
import { useEffect } from 'react'
import DeveloperProfile from './DeveloperProfile'
import { useState } from 'react'
import Login from './Login'
import Home from './Home'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
