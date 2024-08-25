import { Star } from "lucide-react";
import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

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
      className="mb-2 grid grid-cols-[28px_52px_1fr_1fr] items-center rounded-lg border bg-white p-4 shadow-sm"
    >
      <span className="font-mono font-medium">{index + 4}</span>
      <Avatar>
        <AvatarImage src={user.imageUrl} alt="@shadcn" />
        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
      </Avatar>

      <p className="">{user.name}</p>

      <div className="flex items-center justify-end">
        <span className="">
          <span className="font-mono">{user.events}</span> events
        </span>
        <Star fill="#fde047" className="ml-2 text-yellow-300" />
      </div>
    </li>
  ));
};
