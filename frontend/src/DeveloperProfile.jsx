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
        return(<h2>loading....</h2>)
    }

    return(<div className="border-5 h-full gap-2 rounded grid grid-cols-3 p-2">
        <div className="col-span-3 text-4xl grid items-center">Hiii {data.name}</div>
        <div className="text-base rounded-sm p-3 bg-[#6366F1]">username:<br/>{data.dev.username||('username not found')}</div>
        <div className="text-base rounded-sm p-3 bg-[#6366F1]">bio:<br/>{data.dev.bio||('bio not found'&&<button>edit</button>)}</div>
        <div className="text-base rounded-sm p-3 bg-[#6366F1]">github URL:<br/>{data.dev.githuburl||'githuburl not found'}</div>
        <div className="text-base rounded-sm p-3 bg-[#6366F1]">portfolioUrl:<br/>{data.dev.portfolioUrl||'portfolioUrl not found'}</div>
        <div className="text-base rounded-sm p-3 bg-[#6366F1]">avatarUrl:<br/>{data.dev.avatarUrl||'avatarUrl not found'}</div>
        <div className="text-base rounded-sm grid grid grid-cols-3 grid-rows-9 place-items-center gap-1 p-3 bg-[#6366F1]"><p className="col-span-3 justify-self-start">skills:</p>{data.dev.skills.map((skill)=><div className="rounded bg-[#63A6FF] grid-row-span-3">{skill}</div>)||'avatarUrl not found'}</div>
    </div>)
}
export default DeveloperProfile;