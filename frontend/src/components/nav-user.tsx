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
import {
  Calendar,
  GraduationCap,
  HandHelping,
  LogOut,
  UserRound,
} from "lucide-react";
import { buttonVariants } from "./ui/button";

export default function NavUser() {
  return (
    <div className="mr-4 flex gap-2">
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
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>A Name</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              to="/user/$tab"
              params={{ tab: "profile" }}
              className="w-full"
            >
              <div className="flex items-center gap-2">
                <UserRound className="h-4 w-4" />
                Profile
              </div>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              to="/user/$tab"
              params={{ tab: "myevents" }}
              className="w-full"
            >
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                My Events
              </div>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              to="/user/$tab"
              params={{ tab: "volunteered" }}
              className="w-full"
            >
              <div className="flex items-center gap-2">
                <HandHelping className="h-4 w-4" />
                Volunteered
              </div>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              to="/user/$tab"
              params={{ tab: "progress" }}
              className="w-full"
            >
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Training Progress
              </div>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex w-full items-center gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
