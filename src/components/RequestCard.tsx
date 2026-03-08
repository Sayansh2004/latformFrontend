import type { RequestData } from "@/Types/requestData"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "./ui/card"
import { Button } from "./ui/button"
import { HandHeartIcon, ThumbsDownIcon, BadgeMinusIcon, VerifiedIcon } from "lucide-react";
import { toast } from "sonner";
import { BASE_URL } from "@/constants/constants";
import { useDispatch } from "react-redux";
import { removeRequests } from "@/utils/requestSlice";

type RequestCardProps={
    data:RequestData
}

export default function RequestCard({data}:RequestCardProps) {

    const{firstName,lastName,photourl,skills,age,gender,about,_id,requestId}=data;
    const dispatch=useDispatch();

    const handleAcceptance=async()=>{
        try{
            const response=await fetch(`${BASE_URL}/request/review/accepted/${requestId}`,{
              method:"POST",
              credentials:"include"
            });
            if(!response.ok){
              throw new Error("Failed to accept the request");
            }
            const dataMain=await response.json();
            if(dataMain.success){
              dispatch(removeRequests(_id));
              toast.success(`You have successfully added ${firstName} as Your Connection`)
            }

        }catch(err){
            if(err instanceof Error){
              console.log(err.message);
                toast.error("Failed to accept connection requests")
            }
        }
    }

    const handleRejection=async()=>{
        try{
           const response=await fetch(`${BASE_URL}/request/review/rejected/${_id}`,{
            method:"POST",
            credentials:"include"
           });
            if(!response.ok){
              throw new Error("Failed to accept the request");
            }
            const data=await response.json();
            if(data.success){
              dispatch(removeRequests(_id));
              toast.success(`rejected ${firstName} successfully`)
            }

        }catch(err){
            if(err instanceof Error){
                toast.error("Failed to reject connection request")
            }
        }
    }

  return (
    <Card className="w-full max-w-sm overflow-hidden border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">

        {/* Profile Image */}
        <div className="w-full h-56 bg-muted">
            <img
                src={photourl}
                alt={`${firstName} ${lastName}`}
                className="object-cover w-full h-full"
            />
        </div>

        {/* Header */}
        <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                    {firstName} {lastName}
                </h2>

                <div className="flex items-center gap-1 text-green-500 text-xs">
                    <VerifiedIcon size={14}/>
                    Verified
                </div>
            </div>

            <CardDescription className="text-sm text-muted-foreground line-clamp-2">
                {about}
            </CardDescription>

            <div className="text-xs text-muted-foreground">
                {age} • {gender}
            </div>
        </CardHeader>

        {/* Skills */}
        <CardContent className="pt-2">
            <div className="flex flex-wrap gap-1.5">
            {skills?.length ? (
                skills.slice(0,5).map((skill: string, index: number) => (
                <span
                    key={index}
                    className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground border"
                >
                    {skill}
                </span>
                ))
            ) : (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <BadgeMinusIcon size={14}/>
                    No skills listed
                </div>
            )}
            </div>
        </CardContent>

        {/* Actions */}
        <CardFooter className="flex gap-2 pt-2">
            <Button onClick={handleAcceptance} className="flex-1 gap-1 cursor-pointer ">
                <HandHeartIcon size={16}/>
                Accept
            </Button>

            <Button
                onClick={handleRejection}
                variant="outline"
                className="flex-1 gap-1 text-destructive border-destructive/60 hover:bg-destructive/10 cursor-pointer"
            >
                <ThumbsDownIcon size={16}/>
                Reject
            </Button>
        </CardFooter>

    </Card>
  )
}