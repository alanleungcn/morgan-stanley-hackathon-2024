import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@tanstack/react-router";
import { CalendarDays, LogOut, User } from "lucide-react";

export default function NavAvatar() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="" alt="" />
          <AvatarFallback>AA</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Name</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to="/profile">
            <div className="flex gap-2 items-center">
              <User size={16} />
              Profile
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex gap-2 items-center">
            <CalendarDays size={16} />
            My Events
          </div>
        </DropdownMenuItem>
        {/* <DropdownMenuItem>Volunteer Account</DropdownMenuItem> */}
        <DropdownMenuItem>
          <div className="flex gap-2 items-center">
            <LogOut size={16} />
            Logout
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
