// import { Star } from 'phosphor-react'; // You can use any icon library you prefer
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
    <div className="pt- w-full space-y-4 pt-4">
      <h2 className="mb-2 border-b pb-2 text-lg font-bold">LEADERBOARD</h2>
      <div className="flex">
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

      <ul>
        {filter === "Participants" ? (
          <LeaderboardItem data={participantData} />
        ) : (
          <LeaderboardItem data={volunteerData} />
        )}
      </ul>
    </div>
  );
};
