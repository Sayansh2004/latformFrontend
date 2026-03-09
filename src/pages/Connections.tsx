import { BASE_URL } from "@/constants/constants";
import { addConnections } from "@/utils/connectionSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import Shimmer from "@/components/Shimmer";
import EmptyState from "@/components/EmptyRequests";
import ConnectionCard from "@/components/ConnectionCard";

import { UsersIcon } from "lucide-react";

export default function Connections() {

  const connections = useSelector((store:any) => store.connection);
  const user = useSelector((store:any) => store.user);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchConnections = async () => {
    try {

      const response = await fetch(`${BASE_URL}/user/connections`, {
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error("Failed to load connections for you");
      }

      const data = await response.json();

      if (data.success) {
        toast.success(`Hey ${user.firstName || "User"}, here are your connections`);
        dispatch(addConnections(data.data));
      }

    } catch (err) {
      toast.error("failed to load connections");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {

    if (!connections || connections.length === 0) {
      fetchConnections();
    } else {
      setIsLoading(false);
    }

  }, []);

  if (isLoading) {
    return <Shimmer />;
  }

  if (!connections || connections.length === 0) {
    return (
      <EmptyState
        title="No Connections"
        description="Start connecting with developers to grow your network."
        icon={<UsersIcon />}
        onRefresh={fetchConnections}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/40 flex justify-center py-10">

      <div
        className="w-full max-w-7xl px-6 grid gap-6 items-start
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5"
      >

        {connections.map((connection:any) => (
          <ConnectionCard key={connection._id} data={connection} />
        ))}

      </div>

    </div>
  );
}