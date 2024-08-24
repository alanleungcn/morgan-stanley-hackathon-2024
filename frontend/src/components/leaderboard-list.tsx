import * as Avatar from "@radix-ui/react-avatar";
// import { Star } from 'phosphor-react'; // You can use any icon library you prefer
import { Star } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
    <div className="bg-gray-100 p-4 rounded-lg w-full">
      <div className="flex pb-10">
        {["Participants", "Volunteers"].map((f) => {
          return (
            <Button
              variant="ghost"
              className={cn(
                filter === f && "border-b-4 rounded-none border-primary",
                "capitalize px-12",
              )}
              onClick={() => setFilter(f as Filter)}
            >
              {f}
            </Button>
          );
        })}
      </div>
      <h2 className="text-lg font-bold border-b  pb-2 mb-2">LEADERBOARD</h2>
      <ul>
        {filter === "Participants" ? (
          <LeaderboardItem data={participantData} />
        ) : (
          volunteerData.map((user, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-white p-4 mb-2 rounded-lg shadow-sm border-[#FDED1B] border"
            >
              <div className="flex items-center  ">
                <span className="text-xl font-bold mr-4">{index + 1}</span>
                <Avatar.Root className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                  {user.imageUrl ? (
                    <Avatar.Image src={user.imageUrl} alt={user.name} />
                  ) : (
                    <Avatar.Fallback>
                      <span className="flex items-center justify-center w-full h-full text-xl font-bold">
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
                <Star fill="yellow" className="text-yellow-500 mr-2" />
                <span className="font-bold">{user.events} events</span>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
