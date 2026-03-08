import { Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import type { feedData } from "@/Types/feedData";
import { HandHeartIcon, ThumbsDownIcon, BadgeCheckIcon, BadgeMinusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {toast} from "sonner";
import { BASE_URL } from "@/constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "@/utils/feedSlice";
// import Confirm from "./Confirm";
// import { useState } from "react";


type FeedCardProps = {
  info: feedData;
};

export default function FeedCard({ info }: FeedCardProps) {
  // const [showConfirm,setShowConfirm]=useState<boolean>(false)
  const { firstName, lastName, skills, about, gender, age, photourl ,_id} = info;
  const user=useSelector((store:any)=>store.user);
  const dispatch=useDispatch();

  const handleRejection=async(_id:string)=>{
   
        try{
          
          const response=await fetch(`${BASE_URL}/request/send/ignored/${_id}`,{method:"POST",credentials:"include"});
          if(!response.ok){
            throw new Error("Unable to complete action")
          }
          const data=await response.json();
          if(data.success){

            dispatch(removeUser(_id));
            toast.success(`${user.firstName||"You"}, have successfully ignored ${firstName} `);


          }

        }catch(err){
          if(err instanceof Error){
            toast.error("Failed to pass user")
          }
        }


  }

  const handleAcceptance=async(_id:string)=>{
    try{
      const response=await fetch(`${BASE_URL}/request/send/interested/${_id}`,{method:"POST",credentials:"include"});
      if(!response.ok){
            throw new Error("Unable to complete action")
          }
          const data=await response.json();
          if(data.success){
            dispatch(removeUser(_id));
            toast.success(` ${firstName} is notified about your request`)

          }


    }catch(err){
      if(err instanceof Error){
        toast.error("Failed to Connect with user");
      }
    }
  }

 

  return (
   <Card className="w-full max-w-sm overflow-hidden border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col">

      {/* HERO IMAGE */}
      <div className="w-full h-52 bg-muted">
        <img
          src={photourl || "/placeholder-avatar.png"}
          alt={`${firstName}'s profile`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* HEADER */}
      <CardHeader className="pb-2 pt-4 space-y-1">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {firstName} {lastName}
          </h2>

          <div className="flex items-center gap-1 text-xs text-green-600">
            <BadgeCheckIcon size={14} />
            Verified
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          {gender} {age && `• ${age} yrs`}
        </p>
      </CardHeader>

      {/* CONTENT */}
      <CardContent className="pt-1 pb-3  space-y-3">

        <p className="text-sm text-muted-foreground line-clamp-3">
          {about}
        </p>

        {/* SKILLS */}
        <div className="flex flex-wrap gap-1.5">
          {skills?.length ? (
            skills.slice(0, 5).map((skill: string, index: number) => (
              <span
                key={index}
                className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground"
              >
                {skill}
              </span>
            ))
          ) : (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <BadgeMinusIcon size={14} />
              No skills
            </div>
          )}
        </div>
      </CardContent>

      {/* ACTIONS */}
      <CardFooter className="flex gap-2 pt-1 pb-3">

        <Button
          size="sm"
          variant="outline"
          className="flex-1 gap-1 text-destructive border-destructive/60 hover:bg-destructive/10"
          onClick={()=>handleRejection(_id)}
        >
          <ThumbsDownIcon size={16} />
          Pass
        </Button>

        <Button
          size="sm"
          className="flex-1 gap-1"
          onClick={()=>handleAcceptance(_id)}
        >
          <HandHeartIcon size={16} />
          Connect
        </Button>

      </CardFooter>
    </Card>
  );
}