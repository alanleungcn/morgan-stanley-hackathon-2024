import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Myevents } from "@/components/user/myevents";
import { Profile } from "@/components/user/profile";
import { Progress } from "@/components/user/progress";
import { Volunteered } from "@/components/user/volunteer";

import { cn } from "@/lib/utils";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Calendar,
  GraduationCap,
  HandHelping,
  LucideIcon,
  User2,
} from "lucide-react";

export const Route = createFileRoute("/user/$tab")({
  component: User,
});

type Tab = "profile" | "myevents" | "progress" | "volunteered";

type TabItem = {
  tab: Tab;
  icon: LucideIcon;
  label: string;
  render: () => JSX.Element;
};

const tabs: TabItem[] = [
  {
    tab: "profile",
    icon: User2,
    label: "Profile",
    render: Profile,
  },
  {
    tab: "myevents",
    icon: Calendar,
    label: "My Events",
    render: Myevents,
  },
  {
    tab: "volunteered",
    icon: HandHelping,
    label: "Volunteered",
    render: Volunteered,
  },
  {
    tab: "progress",
    icon: GraduationCap,
    label: "Training Progress",
    render: Progress,
  },
];

function User() {
  const { tab } = Route.useParams();
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap justify-center">
      <div className="flex w-full flex-col gap-8 p-4 md:w-72">
        <h1 className="pt-4 text-4xl font-bold">Settings</h1>

        <div className="flex w-full flex-col gap-2">
          {tabs.map((t: TabItem) => (
            <div
              key={t.tab}
              className={cn(
                "flex w-full flex-col overflow-y-auto",
                tab === t.tab && "border-l-4 border-primary",
              )}
            >
              <Button
                variant="ghost"
                className={cn(
                  "w-full !justify-start gap-4 truncate",
                  tab === t.tab && "bg-secondary/50",
                )}
                // onClick={() => setTab(t.tab)}
                onClick={() => navigate({ to: `/user/${t.tab}` })}
              >
                <t.icon size={20} />
                {t.label}
              </Button>
            </div>
          ))}
        </div>
      </div>

      <Separator className="sm:hidden" />

      <div className="w-full md:w-3/5">
        {tabs.map((t: TabItem) => {
          if (tab === t.tab) {
            return <t.render key={t.tab} />;
          }
        })}
      </div>
    </div>
  );
}
