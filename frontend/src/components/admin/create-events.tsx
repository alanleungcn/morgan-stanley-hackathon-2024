import { useCreateEvent } from "@/api/event/use-create-event";
import { useEventTags } from "@/api/event/use-event-types";
import { EventConstruct, zEventConstruct } from "@/api/types/event";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { formatDateWithWeekdayWithTime } from "@/utils/date";
import { zodResolver } from "@hookform/resolvers/zod";
import { add, max } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { badgeVariants } from "../ui/badge";
import { TimePicker } from "../ui/time-picker";

export const CreateEvent = () => {
  const form = useForm<EventConstruct>({
    resolver: zodResolver(zEventConstruct),
    defaultValues: {
      eventName: "",
      eventStartDate: add(new Date(), { days: 1 }),
      eventEndDate: add(new Date(), { days: 1, hours: 2 }),
      eventLocation: `Zubin's Family Centre
Shop 201G
Austin MTR Station
Kowloon
Hong Kong`,
      eventDescription: "",
      numberOfParticipantsNeeded: 1,
      eventType: "Social Gathering",
      numberOfVolunteersNeeded: 1,
      eventImageUrl: "https://google.com",
    },
  });

  const { mutate } = useCreateEvent();

  const { data: eventTags } = useEventTags();

  function onSubmit(data: EventConstruct) {
    mutate(data);
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
      <div className="flex w-full max-w-[1000px] flex-col gap-12 p-8">
        <h1 className="text-4xl font-bold">Event Creation</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2"
          >
            <FormField
              name="eventName"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex w-full flex-col items-start">
                  <FormLabel>Event Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="eventType"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex w-full flex-col items-start">
                  <FormLabel>Event Type</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      className="flex flex-wrap justify-start gap-2"
                      type="single"
                      onValueChange={(e) => field.onChange(e)}
                    >
                      {eventTags?.map((tag) => (
                        <ToggleGroupItem
                          key={tag}
                          value={tag}
                          // asChild
                          className={cn(
                            badgeVariants({ variant: "outline" }),
                            tag == field.value &&
                              "border-2 !border-primary !bg-primary/50",
                          )}
                        >
                          {tag}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="numberOfParticipantsNeeded"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex w-full flex-col items-start">
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
                <FormItem className="flex w-full flex-col items-start">
                  <FormLabel>Max. No. of Volunteers</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="eventStartDate"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-left">Start of Event</FormLabel>
                  <Popover>
                    <FormControl>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            formatDateWithWeekdayWithTime(field.value)
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                    </FormControl>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(d) => {
                          if (!d) return;

                          // Prevent resetting time on date selection
                          field.onChange(
                            new Date(
                              d.getFullYear(),
                              d.getMonth(),
                              d.getDate(),
                              field.value.getHours(),
                              field.value.getMinutes(),
                            ),
                          );
                        }}
                        initialFocus
                        disabled={{
                          before: new Date(),
                        }}
                      />
                      <div className="border-t border-border p-3">
                        <TimePicker
                          setDate={field.onChange}
                          date={field.value}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <FormField
              name="eventEndDate"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-left">End of Event</FormLabel>
                  <Popover>
                    <FormControl>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            formatDateWithWeekdayWithTime(field.value)
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                    </FormControl>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(d) => {
                          if (!d) return;

                          // Prevent resetting time on date selection
                          field.onChange(
                            new Date(
                              d.getFullYear(),
                              d.getMonth(),
                              d.getDate(),
                              field.value.getHours(),
                              field.value.getMinutes(),
                            ),
                          );
                        }}
                        initialFocus
                        disabled={{
                          before: max([
                            new Date(),
                            form.getValues("eventStartDate"),
                          ]),
                        }}
                      />
                      <div className="border-t border-border p-3">
                        <TimePicker
                          setDate={field.onChange}
                          date={field.value}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <FormField
              name="eventDescription"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex w-full flex-col items-start">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      // placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="eventLocation"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex w-full flex-col items-start">
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
              name="eventImageUrl"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-1 flex w-full flex-col items-start sm:col-span-2">
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="col-span-1 sm:col-span-2">
              Save
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
