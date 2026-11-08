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

    return(<>{data.name}
    </>)
}
export default DeveloperProfile;