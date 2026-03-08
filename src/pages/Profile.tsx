import { BASE_URL } from "@/constants/constants";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {toast} from "sonner";
import ProfileForm from "@/components/ProfileForm";
import { addUser } from "@/utils/userSlice";
import ProfileCard from "@/components/ProfileCard";


export default function Profile() {
   
    const user=useSelector((Store:any)=>Store.user);
    const dispatch=useDispatch();
  

    const fetchProfile=async()=>{
          if(user){
       
    }
        try{
            const response=await fetch(`${BASE_URL}/profile/view`,{credentials:"include"});
            if(!response.ok){
                throw new Error("error fetching profile");
            }
            const data=await response.json();
            if(data.success){
                
                dispatch(addUser(data.data));
                toast.success(`${data.data.firstName|| "Your,"},Your profile has been fetched successfully`)
            }

        }catch(err){
            if(err instanceof Error){
                toast.error("Failed to load profile");
            }
        }
    }
    useEffect(()=>{
        if(!user)
        fetchProfile();
    },[])
  return (
   <div className="grid grid-cols-12 gap-6 p-6">

  <div className="col-span-12 md:col-span-6">
    <ProfileForm />
  </div>

  <div className="col-span-12 md:col-span-6">
    <ProfileCard info={user}/>
  </div>

</div>
  )
}
