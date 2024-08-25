import { createFileRoute } from "@tanstack/react-router";

import { LeaderboardList } from "@/components/leaderboard-list";

export const Route = createFileRoute("/leaderboard/")({
  component: Leaderboard,
});

function Leaderboard() {
  return (
    <div className="flex justify-center">
      <div className="px-4 sm:w-2/3">
        <LeaderboardList />
      </div>
    </div>
  );
}
