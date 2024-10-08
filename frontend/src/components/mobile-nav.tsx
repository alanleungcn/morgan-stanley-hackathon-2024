import { useLogout } from "@/api/user/use-logout";
import { useUser } from "@/api/user/use-user";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";
import {
  Calendar,
  Crown,
  GraduationCap,
  Home,
  LockKeyhole,
  LogIn,
  LogOut,
  LucideIcon,
  UserPlus,
  X,
} from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { Separator } from "./ui/separator";

type Props = {
  open: boolean;
  setOpen: () => void;
};

type Route = "/" | "/events" | "/trainings" | "/admin" | "/leaderboard";

type RouteItem = {
  route: Route;
  icon: LucideIcon;
  label: string;
};

const routes: RouteItem[] = [
  {
    route: "/",
    icon: Home,
    label: "Home",
  },
  {
    route: "/events",
    icon: Calendar,
    label: "Events",
  },
  {
    route: "/trainings",
    icon: GraduationCap,
    label: "Trainings",
  },
  {
    route: "/leaderboard",
    icon: Crown,
    label: "Leaderboard",
  },
];

export default function MobileNav({ open, setOpen }: Props) {
  // const { commitLocation: basepath } = useRouter();
  const { pathname } = useLocation();

  const { data: user, isSuccess } = useUser();

  const { mutate: logout } = useLogout();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-20 h-screen -translate-x-0 transition-[width] duration-300 ease-in-out",
        open ? "w-72" : "w-0",
      )}
    >
      <div className="flex h-full flex-col gap-8 overflow-y-auto rounded-br-lg rounded-tr-lg bg-background shadow-2xl">
        <div className="flex w-full items-center justify-between px-4 pt-4">
          <Link href="/" className="flex flex-shrink-0 items-center gap-2">
            <img src="/zubin.svg" className="h-16 w-16" />
            {/* <div className="text-xs font-bold">The Zubin Foundation</div> */}
          </Link>

          <Button variant="ghost" size="icon" onClick={setOpen}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            {routes.map((r) => (
              <div
                key={r.route}
                className={cn(
                  "flex h-12 w-full flex-col overflow-y-auto",
                  r.route === pathname && "border-l-8 border-primary",
                )}
              >
                <Link
                  to={r.route}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "h-full w-full !justify-start gap-4 truncate",
                    // tab === t.tab && "bg-secondary/50",
                  )}
                  // onClick={() => setTab(t.tab)}
                >
                  {<r.icon className="h-5 w-5" />}
                  {r.label}
                </Link>
              </div>
            ))}

            {isSuccess && user && user.isAdmin && (
              <div
                className={cn(
                  "flex h-12 w-full flex-col overflow-y-auto",
                  "/admin" === pathname && "border-l-8 border-primary",
                )}
              >
                <Link
                  to="/admin"
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "h-full w-full !justify-start gap-4 truncate",
                    // tab === t.tab && "bg-secondary/50",
                  )}
                  // onClick={() => setTab(t.tab)}
                >
                  {<LockKeyhole className="h-5 w-5" />}
                  Admin Portal
                </Link>
              </div>
            )}
          </div>

          <Separator className="my-4" />

          <div className="p-2">
            <div className={cn("flex w-full flex-col gap-2 overflow-y-auto")}>
              {user ? (
                <Button
                  variant="ghost"
                  className={cn("h-full w-full !justify-start gap-4 truncate")}
                  onClick={() => logout()}
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </Button>
              ) : (
                <>
                  <Link
                    to="/auth/login"
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "h-12 w-full !justify-start gap-4 truncate",
                    )}
                  >
                    <LogIn className="h-5 w-5" />
                    Login
                  </Link>
                  <Link
                    to="/auth/register"
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "h-12 w-full !justify-start gap-4 truncate",
                    )}
                  >
                    <UserPlus className="h-5 w-5" />
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
