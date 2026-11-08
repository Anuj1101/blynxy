import React, { useState } from 'react'
import {LayoutDashboard,TextAlignJustify} from 'lucide-react'
import { Link } from 'react-router-dom'
import DeveloperProfile from './DeveloperProfile'
import EmptyState from './EmptyState'
import Login from './Login'
const Home = (prop) => {
  const [state,setState]=useState(<EmptyState/>)
  return (
    <div className="bg-[#0B1120] h-screen flex">
    <div className='sm:hidden'><TextAlignJustify/></div>
    <div className="bg-[#111B2E] h-screen w-[20%] flex-col hidden sm:flex">
        <div className="h-[15%] text-2xl text-center p-[40px]"> Blynx </div>
        <div className="text-center active:bg-[#6366F1] rounded p-1 flex gap-5" onClick={()=>setState(<DeveloperProfile/>)}><LayoutDashboard size={20}/><span>Dashboard</span></div>
        <div className="text-center active:bg-[#6366F1] rounded p-1 flex gap-5" onClick={()=>setState(<Login/>)}><LayoutDashboard size={20}/><span>Login</span></div>
    </div>
    <div className='flex-1 justify-center items-center'>
      {state}
    </div>
    </div>
  )
}

export default Home