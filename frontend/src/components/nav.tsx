import { useUser } from "@/api/user/use-user";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { buttonVariants } from "./ui/button";

export const Nav = () => {
  const { data: user, isSuccess } = useUser();

  return (
    <div className="ml-8 hidden w-full justify-start gap-4 sm:flex md:gap-8">
      <Link
        to="/"
        className={cn(buttonVariants({ variant: "link" }), "px-0 text-black")}
      >
        Home
      </Link>
      <Link
        to="/events"
        className={cn(buttonVariants({ variant: "link" }), "px-0 text-black")}
      >
        Events
      </Link>
      <Link
        to="/trainings"
        className={cn(buttonVariants({ variant: "link" }), "px-0 text-black")}
      >
        Trainings
      </Link>
      <Link
        to="/leaderboard"
        className={cn(buttonVariants({ variant: "link" }), "px-0 text-black")}
      >
        Leaderboard
      </Link>

      {isSuccess && user && user.isAdmin && (
        <Link
          to="/admin"
          className={cn(buttonVariants({ variant: "link" }), "px-0 text-black")}
        >
          Admin Portal
        </Link>
      )}
    </div>
  );
};
