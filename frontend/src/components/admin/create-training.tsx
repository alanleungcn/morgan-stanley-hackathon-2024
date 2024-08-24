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

const trainingSchema = z.object({
  trainingName: z.string(),
  trainingDescription: z.string(),
  trainingType: z.string(),
  trainingURL: z.string().url(),
});

export const CreateTraining = () => {
  const form = useForm<z.infer<typeof trainingSchema>>({
    resolver: zodResolver(trainingSchema),
    defaultValues: {
      trainingName: "",
      trainingDescription: "",
      trainingType: "",
      trainingURL: "",
    },
  });

  function onSubmit(data: z.infer<typeof trainingSchema>) {
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
        <h1 className="text-3xl font-bold">Create Training</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-8"
          >
            <FormField
              name="trainingName"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-full">
                  <FormLabel>Training Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="trainingDescription"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-full">
                  <FormLabel>Training Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="trainingType"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-full">
                  <FormLabel>Training Type</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="trainingURL"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col items-start w-full">
                  <FormLabel>Video URL</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="sm:col-span-2">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};