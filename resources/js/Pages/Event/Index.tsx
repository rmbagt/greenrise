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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import {
  CalendarDays,
  Search,
  Users,
  ChevronLeft,
  ChevronRight,
  Earth,
} from "lucide-react";
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

export default function Index({
  events,
  auth,
}: PageProps<{ events: PaginatedData<Event> }>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredEvents = useMemo(() => {
    return events.data.filter(
      (event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filter === "all" ||
          (filter === "participated" &&
            event.donations.some((d) => d.user.id === auth.user.id)))
    );
  }, [events, searchTerm, filter, auth.user.id]);

  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const userParticipatedEvents = useMemo(
    () =>
      events.data.filter((event) =>
        event.donations.some((d) => d.user?.id === auth.user?.id)
      ),
    [events, auth.user?.id]
  );

  return (
    <AuthenticatedLayout>
      <Head title="Events" />

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
                Events
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
                <Select
                  value={filter}
                  onValueChange={(value) => {
                    setFilter(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter events" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="participated">
                      Participated Events
                    </SelectItem>
                  </SelectContent>
                </Select>
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
                    <CardContent className="flex flex-col justify-end flex-1">
                      <div className="min-h-[80px]">
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 text-justify">
                          {event.description}
                        </p>
                      </div>
                      <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 ">
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
                    <CardFooter>
                      <motion.button
                        whileHover={{
                          scale: 1.01,
                        }}
                        whileTap={{
                          scale: 0.98,
                        }}
                        className="w-full"
                      >
                        <Button
                          asChild
                          className="w-full bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Link href={route("event.show", event.id)}>
                            View Details
                          </Link>
                        </Button>
                      </motion.button>
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

            <div className="mt-12">
              <h2 className="mb-4 text-xl font-semibold text-green-800 dark:text-green-200">
                Your Donation History
              </h2>
              {userParticipatedEvents.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {userParticipatedEvents.map((event) => (
                    <Card
                      key={event.id}
                      className="overflow-hidden transition-shadow hover:shadow-md flex flex-col h-[400px]"
                    >
                      <CardHeader className="p-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="h-16 w-16 rounded-full object-cover"
                          />
                          <div>
                            <CardTitle className="text-lg font-medium text-green-700 dark:text-green-300">
                              {event.title}
                            </CardTitle>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(event.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="px-4 pb-4 flex-1">
                        <div className="h-[180px] overflow-y-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b text-left">
                                <th className="pb-2 font-medium">ID</th>
                                <th className="pb-2 font-medium">Amount</th>
                                <th className="pb-2 font-medium">Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {event.donations
                                .filter((d) => d.user.id === auth.user.id)
                                .map((donation) => (
                                  <tr
                                    key={donation.id}
                                    className="border-b last:border-b-0"
                                  >
                                    <td className="py-2 pr-4">
                                      #{donation.id}
                                    </td>
                                    <td className="py-2 pr-4">
                                      <span className="inline-flex items-center">
                                        <span
                                          className={`mr-1 h-2 w-2 rounded-full ${getDonationAmountColor(
                                            donation.amount
                                          )}`}
                                        ></span>
                                        {Number(donation.amount).toLocaleString(
                                          "id-ID",
                                          {
                                            style: "currency",
                                            currency: "IDR",
                                            maximumFractionDigits: 0,
                                          }
                                        )}
                                      </span>
                                    </td>
                                    <td className="py-2">
                                      {new Date(
                                        donation.created_at
                                      ).toLocaleDateString()}
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                      <CardFooter className="bg-gray-50 p-4 dark:bg-gray-800 mt-auto">
                        <div className="flex justify-between w-full text-sm">
                          <span className="font-medium">Total Donations:</span>
                          <span className="font-bold text-green-600 dark:text-green-400">
                            {event.donations
                              .filter((d) => d.user.id === auth.user.id)
                              .reduce(
                                (sum, donation) =>
                                  sum + Number(donation.amount),
                                0
                              )
                              .toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                maximumFractionDigits: 0,
                              })}
                          </span>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">
                  You haven't made any donations yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AuthenticatedLayout>
  );
}

// Helper function to determine the color of the donation amount indicator
function getDonationAmountColor(amount: number): string {
  if (amount < 100000) return "bg-yellow-500";
  if (amount < 500000) return "bg-green-500";
  if (amount < 1000000) return "bg-blue-500";
  return "bg-purple-500";
}
