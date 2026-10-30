import { useEffect, useState } from "react";
import api from "./utils/api";

const DeveloperProfile=()=>{
    const [data,setData]=useState({});
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        const getProfileData=async()=>{
            try {
                const response=await api.get('/devProfile')
                if(response.data){
                    setData(response.data)
                    setLoading(false)
                }
            } catch (error) {
                setLoading(false)
                console.log(error.message)
            }
    }
    getProfileData()
    },[])

    if(loading){
        return(<h2>loaading....</h2>)
    }

    return(<div className="bg-[#0B1120] h-screen">
    <div className="bg-[#111B2E] h-screen w-[20%] ">
        <div className="h-[15%] text-2xl text-center p-[40px]"> Blynx </div>
        <div className=" text-center active:bg-[#6366F1] rounded p-1">Dashboard</div>
    </div>
    <div>
        hii
    </div>
    </div>)
}
export default DeveloperProfile;