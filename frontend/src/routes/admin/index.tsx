import { CreateEvent } from "@/components/admin/create-events";
import { CreateTraining } from "@/components/admin/create-training";
import { ManageEvents } from "@/components/admin/manage-events";
import { ManageTrainings } from "@/components/admin/manage-trainings";
import { Wellbeing } from "@/components/admin/wellbeing";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import {
  BookPlus,
  BookText,
  CalendarPlus,
  CalendarRange,
  HeartHandshake,
  LucideIcon,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/")({
  component: Admin,
});

type Tab =
  | "createEvent"
  | "createTraining"
  | "manageEvents"
  | "manageTrainings"
  | "wellbeing";

type TabItem = {
  tab: Tab;
  icon: LucideIcon;
  label: string;
  render: () => JSX.Element;
};

const tabs: TabItem[] = [
  {
    tab: "createEvent",
    icon: CalendarPlus,
    label: "Create Event",
    render: CreateEvent,
  },
  {
    tab: "manageEvents",
    icon: CalendarRange,
    label: "Manage Events",
    render: ManageEvents,
  },
  {
    tab: "createTraining",
    icon: BookPlus,
    label: "Create Training",
    render: CreateTraining,
  },
  {
    tab: "manageTrainings",
    icon: BookText,
    label: "Manage Trainings",
    render: ManageTrainings,
  },
  {
    tab: "wellbeing",
    icon: HeartHandshake,
    label: "Wellbeing",
    render: Wellbeing,
  },
];

function Admin() {
  const [tab, setTab] = useState<Tab>("createEvent");

  return (
    <div className="flex flex-wrap justify-center">
      <div className="flex w-full flex-col gap-8 p-4 md:w-72">
        <h1 className="text-4xl pt-4 font-bold">Admin Portal</h1>

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
                onClick={() => setTab(t.tab)}
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
