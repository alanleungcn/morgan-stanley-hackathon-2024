import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import {
  Calendar,
  Crown,
  GraduationCap,
  Home,
  LockKeyhole,
  LogIn,
  LucideIcon,
  X,
} from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";
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
  {
    route: "/admin",
    icon: LockKeyhole,
    label: "Admin Portal",
  },
];

export default function MobileNav({ open, setOpen }: Props) {
  // const { commitLocation: basepath } = useRouter();
  const { pathname } = useLocation();
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-0 transition-[width] ease-in-out duration-300",
        open ? "w-72" : "w-0",
      )}
    >
      <div className="h-full flex flex-col gap-8 overflow-y-auto shadow-2xl rounded-tr-lg rounded-br-lg bg-background">
        <div className="w-full flex items-center justify-between pt-4 px-4">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <img src="/zubin.svg" className="w-16 h-16" />
            {/* <div className="text-xs font-bold">The Zubin Foundation</div> */}
          </Link>

          <Button variant="ghost" size="icon" onClick={setOpen}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            {routes.map((r) => (
              <div
                className={cn(
                  "w-full flex flex-col overflow-y-auto h-12",
                  r.route === pathname && "border-l-8 border-primary",
                )}
              >
                <Link
                  to={r.route}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "w-full truncate gap-4 !justify-start h-full",
                    // tab === t.tab && "bg-secondary/50",
                  )}
                  // onClick={() => setTab(t.tab)}
                >
                  {<r.icon className="w-5 h-5" />}
                  {r.label}
                </Link>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="p-2">
            <div className={cn("w-full flex flex-col overflow-y-auto h-12")}>
              <Link
                to="/auth/login"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full truncate gap-4 !justify-start h-full",
                )}
              >
                <LogIn className="w-5 h-5" />
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
