import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // Import the Dialog components
import { Textarea } from "@/components/ui/textarea";
import type { UseFormReturn } from "react-hook-form";
import { Plus } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z
    .string()
    .max(500, {
      message: "Description must be less than 500 characters.",
    })
    .optional(),
  videoFile: z.any(),
});

type FormValues = z.infer<typeof formSchema>;

function UploadVideo() {
  const form: UseFormReturn<FormValues> = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      videoFile: null,
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
    // You would handle the video upload logic here
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="items-center hidden md:flex md:m-4 m-0 md:bg-[#1d1f21] bg-[#0000] hover:bg-[#1f2122] hover:text-white cursor-pointer">
          <Plus className="text-white" />
          <span className="ml-1 hidden md:inline text-white">Create</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] main-bg">
        <DialogHeader>
          <DialogTitle>Upload a new video</DialogTitle>
          <DialogDescription>
            Fill out the details to upload your video. Click upload when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Video Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Video Description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="videoFile"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel>Video File</FormLabel>
                  <FormControl>
                    <Input type="file" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Upload</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default UploadVideo;
