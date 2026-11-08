import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import DeveloperProfile from './DeveloperProfile'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/devpro' element={<DeveloperProfile/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
