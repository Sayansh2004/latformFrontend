import { BASE_URL } from "@/constants/constants";
import { useEffect, useState } from "react"
import {toast} from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "@/utils/requestSlice";
import Shimmer from "@/components/Shimmer";
import EmptyRequests from "@/components/EmptyRequests";
import RequestCard from "@/components/RequestCard";
import type { RequestData } from "@/Types/requestData";

export default function Requests() {
    const dispatch=useDispatch();
    const requests=useSelector((store:any)=>store.request);
    const [isLoading,setIsLoading]=useState<boolean>(true)

    const fetchRequests=async()=>{
        try{
            setIsLoading(true)
            const response=await fetch(`${BASE_URL}/user/requests`,{credentials:"include"});
            if(!response.ok){
                throw new Error("failed fetching requests")
            }
            const data=await response.json();
            if(data.success){
                
                dispatch(addRequests(data.data));
                toast.success("requests fetched successfully")
            
            }
        }catch(err){
            if(err instanceof Error){
                toast.error("Unable to fetch Requests");
            }
        }finally{
            setIsLoading(false);
        }

    }
    useEffect(()=>{
        if(!requests || requests.length===0){
              fetchRequests();
        }else{
            setIsLoading(false)
        }
      
    },[]);

    if(!requests || isLoading){
        return <Shimmer/>;
    }
  return (
    <div>
        {requests.length===0&&<EmptyRequests onRefresh={fetchRequests}/>}
       <div className="min-h-screen bg-gradient-to-b from-background to-muted/40 flex justify-center py-10">

  <div className="w-full max-w-7xl px-6 grid gap-6 items-start
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-5">

      {requests.map((request:RequestData)=>(
          <RequestCard key={request._id} data={request}/>
      ))}

  </div>

</div>
        
    
     

        
    </div>
  )
}
