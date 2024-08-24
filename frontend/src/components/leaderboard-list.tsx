import * as Avatar from "@radix-ui/react-avatar";
// import { Star } from 'phosphor-react'; // You can use any icon library you prefer
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useState } from "react";
import { LeaderboardItem } from "./leaderboard-item";
type Filter = "Participants" | "Volunteers";

export const LeaderboardList = () => {
  const [filter, setFilter] = useState<Filter>("Participants");
  const participantData = [
    {
      name: "Olivier BEAU",
      events: 10,
      imageUrl: "", // Replace with actual image path
    },
    {
      name: "Orazkhan Khaidar",
      events: 2,
    },
    {
      name: "Jewel Aw",
      events: 0,
    },
    {
      name: "Alex Smith",
      events: 0,
      imageUrl: "", // Replace with actual image path
    },
    {
      name: "Kate Sympson",
      events: 0,
    },
    {
      name: "Jewel Aw",
      events: 0,
    },
    // Add more entries as needed
  ];
  const volunteerData = [
    {
      name: "Josh Watson",
      events: 10,
      imageUrl: "", // Replace with actual image path
    },
    {
      name: "Khabib Nurmagamedov",
      events: 2,
    },
    {
      name: "John Ash",
      events: 0,
    },
    {
      name: "Olivier BEAU",
      events: 0,
      imageUrl: "", // Replace with actual image path
    },
    {
      name: "Mustafa Abyl",
      events: 0,
    },
    {
      name: "Kuma Kukuka",
      events: 0,
    },
    // Add more entries as needed
  ];

  return (
    <div className="w-full rounded-lg bg-gray-100 p-4">
      <div className="flex pb-10">
        {["Participants", "Volunteers"].map((f) => {
          return (
            <Button
              variant="ghost"
              className={cn(
                filter === f && "rounded-none border-b-4 border-primary",
                "px-12 capitalize",
              )}
              onClick={() => setFilter(f as Filter)}
            >
              {f}
            </Button>
          );
        })}
      </div>
      <h2 className="mb-2 border-b pb-2 text-lg font-bold">LEADERBOARD</h2>
      <ul>
        {filter === "Participants" ? (
          <LeaderboardItem data={participantData} />
        ) : (
          volunteerData.map((user, index) => (
            <li
              key={index}
              className="mb-2 flex items-center justify-between rounded-lg border border-[#FDED1B] bg-white p-4 shadow-sm"
            >
              <div className="flex items-center">
                <span className="mr-4 text-xl font-bold">{index + 1}</span>
                <Avatar.Root className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                  {user.imageUrl ? (
                    <Avatar.Image src={user.imageUrl} alt={user.name} />
                  ) : (
                    <Avatar.Fallback>
                      <span className="flex h-full w-full items-center justify-center text-xl font-bold">
                        {user.name.charAt(0)}
                      </span>
                    </Avatar.Fallback>
                  )}
                </Avatar.Root>
                <div className="ml-4">
                  <p className="font-bold">{user.name}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Star fill="yellow" className="mr-2 text-yellow-500" />
                <span className="font-bold">{user.events} events</span>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
