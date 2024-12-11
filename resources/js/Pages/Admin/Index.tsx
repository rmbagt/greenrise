import { useState, useMemo } from "react";
import { Head, Link } from "@inertiajs/react";
import { Event, PageProps, PaginatedData } from "@/types";
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
import {
  CalendarDays,
  Search,
  Users,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash,
  Plus,
} from "lucide-react";

const ITEMS_PER_PAGE = 6;

export default function Index({
  events,
  auth,
}: PageProps<{ events: PaginatedData<Event> }>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredEvents = useMemo(() => {
    return events.data.filter((event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [events, searchTerm]);

  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <AuthenticatedLayout>
      <Head title="Admin - Manage Events" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-semibold text-green-800 dark:text-green-200">
              Manage Events
            </h1>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search events..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <Button
                asChild
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Link href={route("event.create")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Event
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedEvents.map((event) => (
              <Card
                key={event.id}
                className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-48 w-full object-cover"
                />
                <CardHeader>
                  <CardTitle className="text-green-700 dark:text-green-300">
                    {event.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="min-h-[80px]">
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                      {event.description}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center">
                      <CalendarDays className="mr-1 h-4 w-4 text-green-600 dark:text-green-400" />
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <Users className="mr-1 h-4 w-4 text-green-600 dark:text-green-400" />
                      {event.donations.length} participants
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button asChild variant="outline" className="flex-1 mr-2">
                    <Link href={route("event.edit", event.id)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </Button>
                  <Button asChild variant="destructive" className="flex-1">
                    <Link
                      href={route("event.destroy", event.id)}
                      method="delete"
                      as="button"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-6 flex justify-center items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="text-green-600 border-green-600 hover:bg-green-50 dark:text-green-400 dark:border-green-400 dark:hover:bg-green-950"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="text-green-600 border-green-600 hover:bg-green-50 dark:text-green-400 dark:border-green-400 dark:hover:bg-green-950"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
