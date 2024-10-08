import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Register, zRegister } from "@/api/types/user";
import { useRegister } from "@/api/user/use-register";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const Route = createFileRoute("/auth/register")({
  component: RegisterComponent,
});

function RegisterComponent() {
  const form = useForm<Register>({
    resolver: zodResolver(zRegister),
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      dateOfBirth: new Date(),
      password: "",
    },
  });

  const { mutate: register } = useRegister();

  function onSubmit(data: Register) {
    register(data);
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }

  const [background] = useState(
    "linear-gradient(to bottom right,#FDED1B,#81D2F5,#E6E6E6)",
  );

  return (
    <div
      className="grid h-[calc(100%-4rem)] w-full place-items-center"
      style={{ background }}
    >
      <div className="my-16 flex w-[90%] max-w-[800px] flex-col gap-8 rounded-md bg-background p-8 shadow-lg lg:w-1/3">
        <h1 className="text-4xl font-bold">Registration</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-4"
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex w-full flex-col items-start">
                  <FormLabel className="text-left">Name</FormLabel>
                  <FormControl className="w-full">
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex w-full flex-col items-start">
                  <FormLabel className="text-left">Email</FormLabel>
                  <FormControl className="w-full">
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel className="text-left">Phone Number</FormLabel>
                  <FormControl className="w-full">
                    <PhoneInput
                      placeholder="Enter a phone number"
                      defaultCountry="HK"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateOfBirth"
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
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex w-full flex-col items-start">
                  <FormLabel className="text-left">Password</FormLabel>
                  <FormControl className="w-full">
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-4">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
