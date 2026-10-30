import React from 'react'
import {LayoutDashboard,TextAlignJustify} from 'lucide-react'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div className="bg-[#0B1120] h-screen">
    <div className='sm:hidden'><TextAlignJustify/></div>
    <div className="bg-[#111B2E] h-screen w-[20%] flex-col hidden sm:flex">
        <div className="h-[15%] text-2xl text-center p-[40px] bg-red-700"> Blynx </div>
        <div className="bg-red-600 text-center active:bg-[#6366F1] rounded p-1 flex gap-5"><LayoutDashboard size={20}/><span>Dashboard</span></div>
    </div>
    <div>

    </div>
    </div>
  )
}

export default Home