import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

import { RefreshCcwIcon } from "lucide-react"

type EmptyStateProps = {
  title: string
  description: string
  icon?: React.ReactNode
  buttonText?: string
  onRefresh?: () => void
}

export default function EmptyState({
  title,
  description,
  icon,
  buttonText = "Refresh",
  onRefresh,
}: EmptyStateProps) {
  return (
    <Empty className="h-full bg-muted/30">
      <EmptyHeader>
        <EmptyMedia variant="icon">{icon}</EmptyMedia>

        <EmptyTitle>{title}</EmptyTitle>

        <EmptyDescription className="max-w-xs text-pretty">
          {description}
        </EmptyDescription>
      </EmptyHeader>

      {onRefresh && (
        <EmptyContent>
          <Button variant="outline" onClick={onRefresh}>
            <RefreshCcwIcon />
            {buttonText}
          </Button>
        </EmptyContent>
      )}
    </Empty>
  )
}