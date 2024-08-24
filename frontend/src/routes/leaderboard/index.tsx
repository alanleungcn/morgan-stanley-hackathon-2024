import { createFileRoute } from "@tanstack/react-router";

import { LeaderboardList } from "@/components/leaderboard-list";

export const Route = createFileRoute("/leaderboard/")({
  component: Leaderboard,
});

function Leaderboard() {
  return (
    <div className="flex justify-center">
      <div className="w-[70%] p-8">
        <LeaderboardList />
      </div>
    </div>
  );
}
