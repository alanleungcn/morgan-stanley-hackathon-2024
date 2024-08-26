import { Star } from "lucide-react";
import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface User {
  name: string;
  events: number;
  imageUrl?: string;
}

export const Podium: FC<{ users: User[] }> = ({ users }) => {
  const podiumColors = ["bg-[#C0C0C0]", "bg-yellow-400", "bg-[#CD7F32]"];
  return (
    <div className="mb-8 flex h-[330px] justify-center gap-4">
      <div className="flex w-[25%] flex-col items-center justify-end gap-3">
        <Avatar className="mx-auto flex h-24 w-24 items-end">
          <AvatarImage src={users[1].imageUrl} alt={users[1].name} />
          <AvatarFallback>{users[1].name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div
          className={`flex h-[160px] w-full flex-col items-center ${podiumColors[0]} mx-2 rounded-lg p-4`}
        >
          <span className="mt-2 text-xl font-bold text-white">{2}</span>
          <p className="text-center text-white">{users[1].name}</p>
          <p className="flex text-white">
            {users[1].events}{" "}
            <Star fill="#fde047" className="ml-2 text-yellow-300" />
          </p>
        </div>
      </div>
      <div className="flex w-[25%] flex-col items-center justify-end gap-3">
        <Avatar className="mx-auto flex h-24 w-24 items-end">
          <AvatarImage src={users[0].imageUrl} alt={users[0].name} />
          <AvatarFallback>{users[0].name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div
          className={`flex h-[200px] w-full flex-col items-center ${podiumColors[1]} mx-2 rounded-lg p-4`}
        >
          <span className="mt-2 text-xl font-bold text-white">{1}</span>
          <p className="text-center text-white">{users[0].name}</p>
          <p className="flex text-white">
            {users[0].events}{" "}
            <Star fill="#fde047" className="ml-2 text-yellow-300" />
          </p>
        </div>
      </div>
      <div className="flex w-[25%] flex-col items-center justify-end gap-3">
        <Avatar className="mx-auto flex h-24 w-24 items-end">
          <AvatarImage src={users[2].imageUrl} alt={users[2].name} />
          <AvatarFallback>{users[2].name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div
          className={`flex h-[130px] w-full flex-col items-center ${podiumColors[2]} mx-2 rounded-lg p-4`}
        >
          <span className="mt-2 text-xl font-bold text-white">{3}</span>
          <p className="text-center text-white">{users[2].name} </p>
          <p className="flex text-white">
            {users[2].events}{" "}
            <Star fill="#fde047" className="ml-2 text-yellow-300" />
          </p>
        </div>
      </div>
    </div>
  );
};
