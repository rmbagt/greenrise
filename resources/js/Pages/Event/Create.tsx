import { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@/Components/ui/label";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/Components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";

export default function Create() {
  const [date, setDate] = useState<Date>();

  const { data, setData, post, processing, errors } = useForm({
    title: "",
    description: "",
    date: "",
    image: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("event.store"));
  };

  return (
    <AuthenticatedLayout>
      <Head title="Create New Event" />

      <div className="py-12">
        <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
          <Card className="overflow-hidden bg-white shadow-sm dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-green-800 dark:text-green-200">
                Create New Event
              </CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    value={data.title}
                    onChange={(e) => setData("title", e.target.value)}
                    required
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500">{errors.title}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                    required
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500">{errors.description}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Event Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(newDate) => {
                          setDate(newDate);
                          setData(
                            "date",
                            newDate ? format(newDate, "yyyy-MM-dd") : ""
                          );
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.date && (
                    <p className="text-sm text-red-500">{errors.date}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    type="url"
                    value={data.image}
                    onChange={(e) => setData("image", e.target.value)}
                    required
                  />
                  {errors.image && (
                    <p className="text-sm text-red-500">{errors.image}</p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  disabled={processing}
                >
                  Create Event
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
