import { BASE_URL } from "@/constants/constants";
import { addFeed } from "@/utils/feedSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import Shimmer from "@/components/Shimmer";
import FeedCard from "@/components/FeedCard";
import type { feedData } from "@/Types/feedData";

export default function Feed() {
    const dispatch = useDispatch();
    const feedData = useSelector((store: any) => store.feed);
    const user = useSelector((store: any) => store.user);

    const fetchFeed = async () => {
        try {
            const response = await fetch(`${BASE_URL}/user/feed`, { credentials: "include" });
            if (!response.ok) {
                throw new Error("Error while fetching feed");
            }
            const data = await response.json();
            if (data.success) {
                console.log(data.data);
                dispatch(addFeed(data.data));
                toast.info(`Go ahead ${user.firstName || "User"}!! Connect with your fav ones`);
            }
        } catch (err) {
            if (err instanceof Error) {
                toast.error("Failed to load feed");
            }
        }
    };

    useEffect(() => {
        if (!feedData || feedData.length === 0) fetchFeed();
    }, [feedData]);

    if (!feedData || feedData.length === 0) {
        return <Shimmer />;
    }

    return (
        <div 
            className="relative min-h-screen flex justify-center py-10 bg-fixed bg-cover bg-center"
            style={{ backgroundImage: `url('/image.png')` }}
        >
            <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] z-0"></div>
            
            <div className="relative z-10 w-full max-w-7xl px-6 grid gap-6 items-start
                            grid-cols-1
                            sm:grid-cols-2
                            md:grid-cols-3
                            lg:grid-cols-4
                            xl:grid-cols-5">
                {feedData.map((feed: feedData) => (
                    <FeedCard key={feed._id} info={feed} />
                ))}
            </div>
        </div>
    );
}