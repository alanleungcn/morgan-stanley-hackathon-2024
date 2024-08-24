import { FC } from "react";
import * as Avatar from "@radix-ui/react-avatar";
import { Star } from "lucide-react";

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
  ));
};
