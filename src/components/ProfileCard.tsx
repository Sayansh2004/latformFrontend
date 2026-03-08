import type { ProfileData } from "@/Types/profileData";
import Shimmer from "./Shimmer";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty"

import { ChevronsLeftRightEllipsisIcon } from "lucide-react"

type ProfileCardProps = {
  info: ProfileData | null
}

function EmptySkills() {
  return (
    <Empty className="bg-muted/20 rounded-md py-4">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ChevronsLeftRightEllipsisIcon />
        </EmptyMedia>

        <EmptyTitle>No skills yet</EmptyTitle>

        <EmptyDescription className="text-xs">
          Add skills from the form to showcase your expertise
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

export default function ProfileCard({ info }: ProfileCardProps) {

  if (!info) return <Shimmer />

  return (
    <Card className="w-full max-w-sm shadow-md transition-all hover:shadow-xl">

      <CardHeader className="flex flex-col items-center gap-2 pb-3 text-center">

        <img
          src={info.photourl}
          alt="profile"
          className="w-16 h-16 rounded-full object-cover border"
        />

        <CardTitle className="text-lg">
          {info.firstName} {info.lastName}
        </CardTitle>

        {/* Hover hint for about */}
        <HoverCard>
          <HoverCardTrigger asChild>
            <CardDescription className="text-sm cursor-pointer">
              {info.about || "No bio added"}
            </CardDescription>
          </HoverCardTrigger>

          <HoverCardContent className="w-56 text-sm">
            {info.about
              ? "Not satisfied with your bio? Edit it in the form."
              : "You haven't added a bio yet. Add one from the form."}
          </HoverCardContent>
        </HoverCard>

      </CardHeader>


      <CardContent className="space-y-3">

        <div className="text-xs text-muted-foreground text-center">
          Age: {info.age}
        </div>

        {/* Hover hint for skills */}
        <HoverCard>
          <HoverCardTrigger asChild>

            <div className="flex flex-wrap gap-2 justify-center cursor-pointer">

              {info.skills?.length === 0 ? (
                <EmptySkills />
              ) : (
                info.skills?.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))
              )}

            </div>

          </HoverCardTrigger>

          <HoverCardContent className="w-56 text-sm">
            Want to improve your profile visibility? Add more skills from the form.
          </HoverCardContent>

        </HoverCard>

      </CardContent>


      <CardFooter>

        <Button className="w-full" size="sm">
          Edit Profile
        </Button>

      </CardFooter>

    </Card>
  )
}