import * as Avatar from "@radix-ui/react-avatar";
import { Star } from "lucide-react";
import { FC } from "react";

interface User {
  name: string;
  events: number;
  imageUrl?: string;
}

interface LeaderboardItemProps {
  data: User[];
}

export const LeaderboardItem: FC<LeaderboardItemProps> = ({ data }) => {
  return data.map((user, index) => (
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
  ));
};
