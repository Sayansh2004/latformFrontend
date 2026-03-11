import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarProvider,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar"

import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const connections = [
  { id: 1, name: "John Doe", avatar: "" },
  { id: 2, name: "Sarah Smith", avatar: "" },
  { id: 3, name: "Alex Johnson", avatar: "" },
]

export default function ChatSidebar() {
  return (
    <SidebarProvider>
      <Sidebar className="w-72">

        {/* Header */}
        <SidebarHeader className="border-b p-4">
          <h2 className="text-lg font-semibold">Chats</h2>

          <Input placeholder="Search chats..." className="mt-3" />
        </SidebarHeader>

        {/* Chat List */}
        <SidebarContent>
          <ScrollArea className="h-[calc(100vh-120px)]">

            <SidebarMenu>

              {connections.map((user) => (
                <SidebarMenuItem key={user.id}>

                  <SidebarMenuButton className="flex items-center gap-3 p-3">

                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>
                        {user.name[0]}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col text-left">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-xs text-muted-foreground">
                        Last message...
                      </span>
                    </div>

                  </SidebarMenuButton>

                </SidebarMenuItem>
              ))}

            </SidebarMenu>

          </ScrollArea>
        </SidebarContent>

      </Sidebar>
    </SidebarProvider>
  )
}