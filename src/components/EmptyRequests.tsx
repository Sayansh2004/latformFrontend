import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { BellDotIcon } from "lucide-react";

import { RefreshCcwIcon } from "lucide-react"
type EmptyRequestsProps={
   onRefresh: ()=>void
}

export default function EmptyRequests({onRefresh}:EmptyRequestsProps) {

  return (
    <div> <Empty className="h-full bg-muted/30">
      <EmptyHeader>
        <EmptyMedia variant="icon">
        <BellDotIcon/>
        </EmptyMedia>
        <EmptyTitle>No Requests</EmptyTitle>
        <EmptyDescription className="max-w-xs text-pretty">
          You&apos;re all caught up. New Requests will appear here.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" onClick={onRefresh}>
          <RefreshCcwIcon />
          Refresh
        </Button>
      </EmptyContent>
    </Empty></div>
  )
}
