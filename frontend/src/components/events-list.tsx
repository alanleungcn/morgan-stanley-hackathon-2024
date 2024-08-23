import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export const EventsList = () => {
  return (
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
                Join us for BioImpact 2024, hosted by the HKU iGEM Team and HKU
                Unicef Club! This event is packed with exciting activities and
                insights that will open your eyes to the possibilities in this
                field. ...
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
  );
};
