import { useCreateTrainings } from "@/api/training/use-create-trainings";
import { useTags } from "@/api/training/use-tags";
import { TrainingConstruct, zTrainingConstruct } from "@/api/types/training";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { badgeVariants } from "../ui/badge";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

export const CreateTraining = () => {
  const { mutate: createTraining } = useCreateTrainings();
  const { data: tags } = useTags();

  const form = useForm<TrainingConstruct>({
    resolver: zodResolver(zTrainingConstruct),
    defaultValues: {
      courseName: "",
      courseDescription: "",
      courseUrl: "",
      tags: [],
    },
  });

  function onSubmit(data: TrainingConstruct) {
    createTraining(data);

    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }

  return (
    <div className="flex justify-center">
      <div className="flex w-full max-w-[1000px] flex-col gap-12 p-8">
        <h1 className="text-3xl font-bold">Create Training</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2"
          >
            <FormField
              name="courseName"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex w-full flex-col items-start">
                  <FormLabel>Training Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="tags"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex w-full flex-col items-start">
                  <FormLabel>Training Tags</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      className="flex max-h-64 flex-wrap justify-start gap-2 overflow-y-scroll p-2"
                      type="multiple"
                      onValueChange={(e) => field.onChange(e)}
                    >
                      {tags?.map((tag, i) => (
                        <ToggleGroupItem
                          key={`${i}-${tag}`}
                          value={tag}
                          className={cn(
                            badgeVariants({ variant: "outline" }),
                            field.value.includes(tag) &&
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
              name="courseDescription"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex w-full flex-col items-start">
                  <FormLabel>Training Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              name="cour"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex w-full flex-col items-start">
                  <FormLabel>Training Type</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              name="courseUrl"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex w-full flex-col items-start">
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
