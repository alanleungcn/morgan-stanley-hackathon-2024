// import { Star } from 'phosphor-react'; // You can use any icon library you prefer
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { LeaderboardItem } from "./leaderboard-item";
import { Podium } from "./leaderboard-podium";
type Filter = "Participants" | "Volunteers";

export const LeaderboardList = () => {
  const [filter, setFilter] = useState<Filter>("Participants");
  const participantData = [
    {
      name: "Mustafa Abylkhanuly",
      events: 10,
      imageUrl: "", // Replace with actual image path
    },
    {
      name: "Aidar Muratov",
      events: 5,
    },
    {
      name: "Jewel Aw",
      events: 3,
    },
    {
      name: "Alex Smith",
      events: 1,
      imageUrl: "", // Replace with actual image path
    },
    {
      name: "Kate Sympson",
      events: 1,
    },
    {
      name: "Jewel Aw",
      events: 0,
    },
    {
      name: "Liam Lee",
      events: 0,
    },
    {
      name: "Aria Patel",
      events: 0,
    },
    {
      name: "Elijah Kim",
      events: 0,
    },
    {
      name: "Harper Singh",
      events: 0,
    },
    {
      name: "Ivy Chen",
      events: 0,
    },
    {
      name: "Mason Gupta",
      events: 0,
    },
    {
      name: "Zoe Das",
      events: 0,
    },
    {
      name: "Oliver Shah",
      events: 0,
    },
    {
      name: "Ava Kumar",
      events: 0,
    },
    {
      name: "Lucas Patel",
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
      name: "Mark Enetts",
      events: 2,
    },
    {
      name: "John Ash",
      events: 0,
    },
    {
      name: "Madi Kaiyrkhan",
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
    {
      name: "Liam Lee",
      events: 0,
    },
    {
      name: "Aria Patel",
      events: 0,
    },
    {
      name: "Elijah Kim",
      events: 0,
    },
    {
      name: "Harper Singh",
      events: 0,
    },
    {
      name: "Ivy Chen",
      events: 0,
    },
    {
      name: "Mason Gupta",
      events: 0,
    },
    {
      name: "Zoe Das",
      events: 0,
    },
    {
      name: "Oliver Shah",
      events: 0,
    },
    {
      name: "Ava Kumar",
      events: 0,
    },
    {
      name: "Lucas Patel",
      events: 0,
    },
    // Add more entries as needed
  ];

  const sortedData =
    filter === "Participants" ? [...participantData] : [...volunteerData];
  sortedData.sort((a, b) => b.events - a.events);

  return (
    <div className="pt- w-full space-y-4 pt-4">
      <h2 className="mb-2 border-b pb-2 text-lg font-bold">LEADERBOARD</h2>
      <div className="flex">
        {["Participants", "Volunteers"].map((f) => {
          return (
            <Button
              key={f}
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
      <Podium users={sortedData.slice(0, 3)} />
      <ul>
        <LeaderboardItem data={sortedData.slice(3)} />
      </ul>
    </div>
  );
};
