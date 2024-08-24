import { Button } from "@/components/ui/button";
import { Myevents } from "@/components/user/myevents";
import { Profile } from "@/components/user/profile";
import { Progress } from "@/components/user/progress";
import { Volunteered } from "@/components/user/volunteer";

import { cn } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import {
  BarChart,
  Calendar,
  HandHelping,
  LucideIcon,
  User2,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/user/")({
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
  // {
  //   tab: "wellbeing",
  //   icon: HeartHandshake,
  //   label: "Wellbeing",
  //   render: Wellbeing,
  // },
  {
    tab: "myevents",
    icon: Calendar,
    label: "Myevents",
    render: Myevents,
  },
  {
    tab: "progress",
    icon: BarChart,
    label: "Progress",
    render: Progress,
  },
  {
    tab: "volunteered",
    icon: HandHelping,
    label: "Volunteered",
    render: Volunteered,
  },
];

function User() {
  const [tab, setTab] = useState<Tab>("profile");

  return (
    <div className="flex justify-center">
      <div className="flex w-72 flex-col gap-12 p-8">
        <h1 className="text-4xl font-bold">Settings</h1>

        <div className="flex flex-col gap-2">
          {tabs.map((t: TabItem) => (
            <div
              className={cn(
                "flex w-64 flex-col overflow-y-auto",
                tab === t.tab && "border-l-4 border-primary",
              )}
            >
              <Button
                variant="ghost"
                className={cn(
                  "w-full !justify-start gap-4 truncate",
                  tab === t.tab && "bg-secondary/50",
                )}
                onClick={() => setTab(t.tab)}
              >
                <t.icon size={20} />
                {t.label}
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-[800px]">
        {tabs.map((t: TabItem) => {
          if (tab === t.tab) {
            return <t.render />;
          }
        })}
      </div>
    </div>
  );
}
