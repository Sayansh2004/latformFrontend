import { BASE_URL } from "@/constants/constants";
import {io, Socket} from "socket.io-client";

let socket:Socket|null=null;
export const createSocketConnection=()=>{
  if(!socket){
    socket=io(BASE_URL,{
            withCredentials:true,
            transports:["websocket"]
        }
    )
  }
  return socket;
}

