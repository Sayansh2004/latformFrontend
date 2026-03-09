import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import type { ProfileData } from "@/Types/profileData";

type ConnectionCardProps = {
  data: ProfileData;
};

export default function ConnectionCard({ data }: ConnectionCardProps) {

  const { firstName, lastName, photourl, about, skills } = data;
  console.log(data)
  return (
    <div className="bg-card border rounded-2xl shadow-sm hover:shadow-md transition p-5 flex flex-col gap-4">

      {/* Profile Image */}
      <div className="flex justify-center">
        <img
          src={photourl}
          alt={`${firstName}`}
          className="w-24 h-24 rounded-full object-cover border"
        />
      </div>

      {/* Name */}
      <div className="text-center">
        <h2 className="text-lg font-semibold">
          {firstName} {lastName}
        </h2>
      </div>

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2">
          {skills.slice(0, 3).map((skill: string, index: number) => (
            <span
              key={index}
              className="text-xs bg-muted px-2 py-1 rounded-md"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* About */}
      {about && (
        <p className="text-sm text-muted-foreground text-center line-clamp-2">
          {about}
        </p>
      )}

      {/* Chat Button */}
      <div className="mt-auto flex justify-center">
        <Button className="w-full gap-2">
          <MessageCircle size={16} />
          Chat
        </Button>
      </div>

    </div>
  );
}