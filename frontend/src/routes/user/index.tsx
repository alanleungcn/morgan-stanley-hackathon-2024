import { Button } from "@/components/ui/button";
import { Profile } from "@/components/user/profile";
import { Wellbeing } from "@/components/user/wellbeing";
import { cn } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import { HeartHandshake, LucideIcon, User2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/user/")({
  component: User,
});

type Tab = "profile" | "wellbeing";

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
    tab: "wellbeing",
    icon: HeartHandshake,
    label: "Wellbeing",
    render: Wellbeing,
  },
];

function User() {
  const [tab, setTab] = useState<Tab>("profile");

  return (
    <div className="flex justify-center">
      <div className="p-8 flex flex-col gap-12 w-72">
        <h1 className="text-4xl font-bold">Settings</h1>

        <div className="flex flex-col gap-2">
          {tabs.map((t: TabItem) => (
            <div
              className={cn(
                "w-64 flex flex-col overflow-y-auto",
                tab === t.tab && "border-l-4 border-primary",
              )}
            >
              <Button
                variant="ghost"
                className={cn(
                  "w-full truncate gap-4 !justify-start",
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