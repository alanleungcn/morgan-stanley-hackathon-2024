import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Login, zLogin } from "@/api/types/user";
import { useLogin } from "@/api/user/use-login";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PhoneInput } from "@/components/ui/phone-input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const Route = createFileRoute("/auth/login")({
  component: LoginComponent,
});

function LoginComponent() {
  const [tab, setTab] = useState<"phone" | "email">("phone");

  const { mutate: login } = useLogin();

  const form = useForm<Login>({
    resolver: zodResolver(zLogin),
    defaultValues: {
      phoneNumber: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(data: Login) {
    if (data.phoneNumber) {
      login({
        phoneNumber: data.phoneNumber,
        password: data.password,
      });
    } else {
      login({
        email: data.email,
        password: data.password,
      });
    }

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
        <h1 className="text-4xl font-bold">Login</h1>

        <Tabs
          defaultValue="phone"
          className="w-full"
          // @ts-expect-error string is correct
          onValueChange={(v) => setTab(v)}
        >
          <TabsList className="w-full">
            <TabsTrigger value="phone" className="w-1/2 gap-2">
              <Phone className="h-4 w-4" /> Phone
            </TabsTrigger>
            <TabsTrigger value="email" className="w-1/2 gap-2">
              <Mail className="h-4 w-4" /> Email
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-4"
          >
            {tab === "email" ? (
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
            ) : (
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
            )}

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
