import { Skeleton } from "@/components/ui/skeleton"

export default function Shimmer() {
  return (
    <div className="flex items-center justify-center min-h-screen">

      <div className="flex w-full max-w-sm flex-col gap-6 p-6">

        <Skeleton className="h-8 w-32 mx-auto" />

        <div className="flex flex-col gap-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="flex flex-col gap-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>

        <Skeleton className="h-10 w-full" />

      </div>

    </div>
  )
}