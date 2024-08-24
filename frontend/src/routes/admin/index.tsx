import { CreateEvent } from "@/components/admin/create-events";
import { CreateTraining } from "@/components/admin/create-training";
import { ManageEvents } from "@/components/admin/manage-events";
import { ManageTrainings } from "@/components/admin/manage-trainings";
import { Wellbeing } from "@/components/admin/wellbeing";
import { Button } from "@/components/ui/button";
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
    <div className="flex justify-center">
      <div className="p-8 flex flex-col gap-12 w-72">
        <h1 className="text-4xl font-bold">Admin Portal</h1>

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
