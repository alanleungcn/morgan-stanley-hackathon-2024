import { createFileRoute } from "@tanstack/react-router";

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
import { PhoneInput } from "@/components/ui/phone-input";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/auth/login")({
  component: Login,
});

const FormSchema = z.object({
  phone: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  name: z.string(),
  email: z.string(),
  birthday: z.date(),
  password: z.string(),
});

function Login() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      birthday: new Date(),
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="flex items-center flex-col">
      <div className="p-8 w-[90%] lg:w-1/3 max-w-[800px] flex flex-col gap-8 shadow-lg rounded-md my-16">
        <h1 className="text-4xl font-bold">Login</h1>

        <Tabs defaultValue="member" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="member" className="w-1/2">
              Member
            </TabsTrigger>
            <TabsTrigger value="volunteer" className="w-1/2">
              Volunteer
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-4"
          >
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-full">
                  <FormLabel className="text-left">Email</FormLabel>
                  <FormControl className="w-full">
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <div className="flex w-full items-center gap-4">
              <div className="w-full">
                <Separator />
              </div>
              <div>OR</div>
              <div className="w-full">
                <Separator />
              </div>
            </div> */}

            <FormField
              control={form.control}
              name="phone"
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
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-full">
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
