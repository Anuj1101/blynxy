import './App.css'
import api from '../apis/axios'
import { useEffect } from 'react'
import { useState } from 'react'
function App() {
  const [data,setData]=useState('')
  const fun=async()=>{
    const response=await api.post('/health')
    setData(response.data.message)
    console.log(response.data.message)
  }
  useEffect(()=>{fun();},[]
  )
  return (
    <>
    hello world
    <h1>{data}</h1>
    </>
  )
}

export default App
