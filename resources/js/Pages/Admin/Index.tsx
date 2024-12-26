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
  Earth,
} from "lucide-react";
import { useForm } from "@inertiajs/react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/Components/ui/dialog";
import { motion } from "motion/react";

const ITEMS_PER_PAGE = 6;

const fadeInVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      type: "spring",
      duration: 0.6,
    },
  }),
};

export default function AdminIndex({
  events,
  auth,
}: PageProps<{ events: PaginatedData<Event> }>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null);

  const form = useForm();

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

  const openDeleteModal = (event: Event) => {
    setEventToDelete(event);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setEventToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const deleteEvent = () => {
    if (eventToDelete) {
      form.delete(route("event.destroy", eventToDelete.id), {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
          closeDeleteModal();
        },
      });
    }
  };

  return (
    <AuthenticatedLayout>
      <Head title="Admin - Manage Events" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        custom={0}
      >
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
                <motion.div
                  whileHover={{
                    scale: 1.01,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                >
                  <Button
                    asChild
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Link href={route("event.create")}>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Event
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedEvents.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial="hidden"
                  animate="visible"
                  variants={fadeInVariants}
                  custom={i}
                  whileHover={{
                    scale: 1.01,
                    transition: {
                      type: "spring",
                      duration: 0.5,
                      damping: 20,
                      stiffness: 400,
                    },
                  }}
                >
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
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 text-justify">
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
                    <CardFooter className="flex justify-between gap-2">
                      <motion.div
                        whileHover={{
                          scale: 1.02,
                        }}
                        whileTap={{
                          scale: 0.97,
                        }}
                        className="w-full"
                      >
                        <Button
                          asChild
                          variant="outline"
                          className="flex-1 mr-2 w-full"
                        >
                          <Link href={route("event.edit", event.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </Button>
                      </motion.div>
                      <motion.div
                        whileHover={{
                          scale: 1.02,
                        }}
                        whileTap={{
                          scale: 0.97,
                        }}
                        className="w-full"
                      >
                        <Button
                          variant="destructive"
                          className="flex-1 w-full"
                          onClick={() => openDeleteModal(event)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </motion.div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>

            {paginatedEvents.length === 0 && (
              <div className="flex flex-col items-center justify-center p-4 gap-2">
                <Earth size={48} />
                <p className="md:text-lg text-gray-500 dark:text-gray-400 text-center">
                  No events found. Please try a different search.
                </p>
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-6 flex justify-center items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
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
      </motion.div>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the event "{eventToDelete?.title}
              "? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={closeDeleteModal}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={deleteEvent}
              disabled={form.processing}
            >
              {form.processing ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AuthenticatedLayout>
  );
}
