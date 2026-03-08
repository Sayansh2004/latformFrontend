import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "./constants/constants";
import Shimmer from "./components/Shimmer";
import { addUser } from "./utils/userSlice";

export default function App() {

  const user = useSelector((store:any)=>store.user);
  const dispatch = useDispatch();

  const [authIsProcessing,setAuthIsProcessing] = useState(true);

  const fetchUser = async () => {
    try{

      const response = await fetch(`${BASE_URL}/profile/view`,{
        credentials:"include"
      });

      if(!response.ok){
        throw new Error("Failed to validate user");
      }

      const data = await response.json();

      dispatch(addUser(data.data));

    }catch(err){

      if(err instanceof Error){
        console.error(err.message);
      }

    }finally{
      setAuthIsProcessing(false);
    }
  }


  useEffect(()=>{

    if(!user){
      fetchUser();
    }else{
      setAuthIsProcessing(false);
    }

  },[user]);


  if(authIsProcessing){
    return <Shimmer/>
  }


  return (
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  )
}