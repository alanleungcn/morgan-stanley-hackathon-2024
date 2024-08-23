import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Filter = "all" | "today" | "weekend";

export const EventsList = () => {
  const [filter, setFilter] = useState<Filter>("all");

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-4">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Event Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mental">Mental</SelectItem>
            <SelectItem value="gathering">Gathering</SelectItem>
            <SelectItem value="...">...</SelectItem>
          </SelectContent>
        </Select>
        <Input type="email" placeholder="Search" />
      </div>

      <div className="flex">
        {["all", "today", "weekend"].map((f) => {
          return (
            <Button
              variant="ghost"
              className={cn(
                filter === f && "border-b-4 rounded-none border-primary",
                "capitalize px-12",
              )}
              onClick={() => setFilter(f as Filter)}
            >
              {f}
            </Button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {Array.from(Array(8)).map(() => {
          return (
            <Card className="">
              <CardHeader className="p-0">
                <img src="/event-poster-1.jpg" className="h-48 object-cover" />
                <CardTitle className="p-6">Big Impact Workshop</CardTitle>
                {/* <CardDescription>Card Description</CardDescription> */}
              </CardHeader>
              <CardContent>
                <p className="h-32 text-ellipsis overflow-hidden">
                  Join us for BioImpact 2024, hosted by the HKU iGEM Team and
                  HKU Unicef Club! This event is packed with exciting activities
                  and insights that will open your eyes to the possibilities in
                  this field. ...
                </p>
              </CardContent>
              <CardFooter>
                <div className="flex w-full justify-between items-center flex-col lg:flex-row gap-4">
                  <div className="flex flex-col">
                    <div>25 Aug (Sun)</div>
                    <div>11 am - 12 noon</div>
                    <div className="flex gap-2 items-center">
                      <Users size={16} />
                      1/100 participants
                    </div>
                  </div>
                  <div className="w-full lg:w-32">
                    <Button className="w-full lg:w-32">Register</Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
