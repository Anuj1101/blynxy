import React, { useState } from 'react'
import api from './utils/api'

const Login = () => {
    const [data,setData]=useState({})
    const [loading,setLoading]=useState(false)
    const submitData=(e)=>{
      setData({...data,
        [e.target.name]:e.target.value
    })
    }
    const handleSubmit=async(e)=>{
      setLoading(true)
      e.preventDefault()
      try {
      const response=await api.post('/auth/login',data);
      if(!response){
        setLoading(false)
        console.log('we did not get any response')
      }
      setLoading(false)
      const token=response.data.token
      localStorage.setItem('accesstoken',token)
      console.log('logged in successfully')
      } catch (error) {
        setLoading(false)
        console.log('got error in login',error.message)
      }
    }
  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input type="text" id='email' name='email' onChange={submitData}/>
      <label htmlFor="password">Email:</label>
      <input type="password" id='passsword' name='password' onChange={submitData}/>
      {loading?(<button className='bg-red-600' disabled >submittting...</button>):<button type="submit" className='bg-red-600'>submit</button>}
    </form>
  )
}

export default Login