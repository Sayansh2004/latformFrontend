import  type { ReactNode } from "react"
import { useSelector } from "react-redux"
type ProtectedRouteProps={
    children:ReactNode
}
import { Navigate } from "react-router-dom"

export default function ProtectedRoute({children}:ProtectedRouteProps) {

    const user=useSelector((store:any)=>store.user);

    if(!user){
      return <Navigate to="/login" replace/>
    }
         return <>{children}</>
    
 
}
