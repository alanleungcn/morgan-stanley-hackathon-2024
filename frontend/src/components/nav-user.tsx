import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { CalendarDays, Cog, LogOut } from "lucide-react";
import { buttonVariants } from "./ui/button";

export default function NavUser() {
  return (
    <div className="flex gap-2 mr-4">
      <Link
        to="/auth/login"
        className={cn("!text-black", buttonVariants({ variant: "link" }))}
      >
        Login
      </Link>

      <Link
        to="/auth/register"
        className={cn("!text-black", buttonVariants({ variant: "link" }))}
      >
        Register
      </Link>

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
            <Link to="/user">
              <div className="flex items-center gap-2">
                <Cog size={16} />
                Settings
              </div>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex items-center gap-2">
              <CalendarDays size={16} />
              My Events
            </div>
          </DropdownMenuItem>
          {/* <DropdownMenuItem>Volunteer Account</DropdownMenuItem> */}
          <DropdownMenuItem>
            <div className="flex items-center gap-2">
              <LogOut size={16} />
              Logout
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
