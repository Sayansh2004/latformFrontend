import { Button } from "@/components/ui/button"
import { HandshakeIcon,IdCardIcon } from "lucide-react"
import {Link} from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  CreditCardIcon,
  LogOutIcon,
  UserIcon,
} from "lucide-react"
import { Avatar,AvatarImage } from "./ui/avatar"
import { useDispatch, useSelector } from "react-redux"
import { removeUser } from "@/utils/userSlice";
import {toast} from "sonner";
import { BASE_URL } from "@/constants/constants";



export default function Navbar() {
  const user=useSelector((store:any)=>store.user)
  const dispatch=useDispatch()
  const handleLogout=async()=>{
    try{
      const response=await fetch(`${BASE_URL}/auth/logout`,
      {  
        method:"POST",
        credentials:"include"

      }
      )
      if(!response.ok){
        throw new Error("Failing in logging out");
      }
      const data=await response.json();
      if(data.success){
        toast.success(`${user?.firstName||"You"},You Logged out successfully`)
    dispatch(removeUser());
      }
       

    }catch(err){
      if(err instanceof Error){
        toast.error("Failed to logout");
      }

    }
        
  }
  return (
    <div className="flex items-center justify-between px-6 h-16 border-b">
        <div>
          <h1>TBD</h1>
        </div>
        <div className="flex gap-2">
            <div>
               <Button variant="ghost"><Link to="/connections">Connections</Link></Button>
            <Button variant="ghost"><Link to="/">Home</Link></Button>
            <Button variant="ghost">About</Button>
            </div>
           
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-full p-0">
            <Avatar>
               <AvatarImage src="https://github.com/shadcn.png"   alt="user profile"></AvatarImage>
               
            </Avatar>
            </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <UserIcon />
          <Link to="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCardIcon />
          <Link to="/billing"> Billing</Link>
         
        </DropdownMenuItem>
        <DropdownMenuItem>
         <HandshakeIcon/>
         <Link to="/requests"> Requests</Link>
        
        </DropdownMenuItem>
       
       
        <DropdownMenuSeparator />
        {user&&  <DropdownMenuItem variant="destructive" onClick={handleLogout}>
          <LogOutIcon />
          Log out
        </DropdownMenuItem>}
       {!user && <DropdownMenuItem>
        <IdCardIcon/>
        <Link to="/login">Login</Link>
        </DropdownMenuItem>}
      </DropdownMenuContent>
    </DropdownMenu>
        </div>
    </div>
  )
}
