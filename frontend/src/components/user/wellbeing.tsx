import { CalendarIcon } from "lucide-react";
import { add, format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const eventSchema = z.object({
  eventName: z.string(),
  eventDate: z.date(),
  eventLocation: z.string(),
  eventDescription: z.string(),
  numberOfParticipantsNeeded: z.preprocess((v) => Number(v), z.number()),
  numberOfVolunteersNeeded: z.preprocess((v) => Number(v), z.number()),
  eventType: z.enum(["<PENDING_MEETING>"]),
});

export const Wellbeing = () => {
  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      eventName: "",
      eventDate: add(new Date(), { weeks: 1 }),
      eventLocation: `Zubin's Family Centre
Shop 201G
Austin MTR Station
Kowloon
Hong Kong`,
      eventDescription: "",
      numberOfParticipantsNeeded: 1,
      eventType: "<PENDING_MEETING>",
      numberOfVolunteersNeeded: 1,
    },
  });

  function onSubmit(data: z.infer<typeof eventSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="flex justify-center">
      <div className="p-8 max-w-[1000px] w-full flex flex-col gap-12">
        <h1 className="text-4xl font-bold">Event Creation</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-8"
          >
            <FormField
              name="eventName"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-full">
                  <FormLabel>Event Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="eventDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="eventDescription"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-full">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="numberOfParticipantsNeeded"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-full">
                  <FormLabel>Max. No. of Participants</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="numberOfVolunteersNeeded"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-full">
                  <FormLabel>Max. No. of Volunteers</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="eventLocation"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-full">
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      // className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="eventType"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-full">
                  <FormLabel>Event Type</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="single"
                      onValueChange={(e) => field.onChange(e)}
                    >
                      <ToggleGroupItem value="a">AAAAA</ToggleGroupItem>
                      <ToggleGroupItem value="b">BBBBB</ToggleGroupItem>
                      <ToggleGroupItem value="c">CCCCC</ToggleGroupItem>
                    </ToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="sm:col-span-2">
              Save
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
