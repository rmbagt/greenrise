import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { StatsCard } from "@/Components/Dashboard/StatsCardProps";
import { DonationProgress } from "@/Components/Dashboard/DonationProgress";
import {
  CalendarDays,
  Users,
  TreePine,
  Trophy,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import { motion } from "motion/react";

interface DashboardProps {
  stats: {
    totalEvents: number;
    ongoingEvents: number;
    totalDonators: number;
    newDonatorsLastMonth: number;
    eventsSupported: number;
    totalDonations: number;
    lastMonthDonations: number;
  };
  ongoingEvents: {
    id: number;
    title: string;
    date: string;
    image: string;
    participants: number;
  }[];
  topDonators: {
    id: number;
    name: string;
    image: string;
    amount: number;
    events: number;
  }[];
  donationRequests: {
    id: number;
    title: string;
    current: number;
    target: number;
    deadline: string;
    status: "active" | "completed";
  }[];
}

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
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

export default function Dashboard({
  stats,
  ongoingEvents,
  topDonators,
  donationRequests,
}: DashboardProps) {
  const statsData = [
    {
      title: "Total Events",
      value: stats.totalEvents.toString(),
      icon: <CalendarDays className="h-4 w-4 text-green-600" />,
      description: `${stats.ongoingEvents} ongoing events`,
    },
    {
      title: "Total Donators",
      value: stats.totalDonators.toString(),
      icon: <Users className="h-4 w-4 text-blue-600" />,
      description: `+${stats.newDonatorsLastMonth} from last month`,
    },
    {
      title: "Events Supported",
      value: stats.eventsSupported.toString(),
      icon: <TreePine className="h-4 w-4 text-emerald-600" />,
      description: "Events supported by you",
    },
    {
      title: "Your Donations",
      value: `${Number(stats.totalDonations).toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      })}`,
      icon: <Trophy className="h-4 w-4 text-amber-600" />,
      description: `${(
        (Number(stats.lastMonthDonations) / Number(stats.totalDonations)) *
        100
      ).toFixed(1)}% from last month`,
    },
  ];

  return (
    <AuthenticatedLayout>
      <Head title="Dashboard" />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        custom={0}
      >
        <motion.div custom={1} variants={fadeInVariants} className="py-12">
          <motion.div
            custom={2}
            variants={fadeInVariants}
            className="mx-auto max-w-7xl space-y-8 sm:px-6 lg:px-8"
          >
            {/* Stats Grid */}
            <motion.div
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
              variants={fadeInVariants}
              custom={3}
            >
              {statsData.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  variants={fadeInVariants}
                  custom={index + 4}
                >
                  <StatsCard {...stat} />
                </motion.div>
              ))}
            </motion.div>

            {/* Grid for Other Sections */}
            <motion.div
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              variants={fadeInVariants}
              custom={statsData.length + 5}
            >
              {/* Ongoing Events */}
              <motion.div
                className="md:col-span-2 lg:col-span-1"
                variants={fadeInVariants}
                custom={statsData.length + 6}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Ongoing Events</CardTitle>
                    <CardDescription>
                      Currently active environmental initiatives
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {ongoingEvents.map((event, index) => (
                      <motion.div
                        key={event.id}
                        className="flex items-center space-x-4"
                        variants={fadeInVariants}
                        custom={index + statsData.length + 7}
                      >
                        <img
                          src={event.image}
                          alt={event.title}
                          className="h-12 w-20 rounded-md object-cover"
                        />
                        <div className="flex-1 space-y-1">
                          <h4 className="font-semibold">{event.title}</h4>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <CalendarDays className="mr-1 h-4 w-4" />
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                        </div>
                        <Link href={`/events/${event.id}`}>
                          <Button variant="ghost" size="icon">
                            <ArrowUpRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Top Donators */}
              <motion.div
                className="md:col-span-2 lg:col-span-1"
                variants={fadeInVariants}
                custom={statsData.length + ongoingEvents.length + 8}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Top Donators</CardTitle>
                    <CardDescription>
                      Most active contributors this month
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {topDonators.map((donator, index) => (
                      <motion.div
                        key={donator.id}
                        className="flex items-center space-x-4 mb-5"
                        variants={fadeInVariants}
                        custom={
                          statsData.length + ongoingEvents.length + index + 9
                        }
                      >
                        <Avatar>
                          <AvatarImage src={donator.image} alt={donator.name} />
                          <AvatarFallback>
                            {donator.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <p className="font-medium leading-none">
                            {donator.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {donator.events} events supported
                          </p>
                        </div>
                        <div className="font-medium">
                          {Number(donator.amount).toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            maximumFractionDigits: 0,
                          })}
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Donation Requests */}
              <motion.div
                className="md:col-span-2 lg:col-span-1"
                variants={fadeInVariants}
                custom={
                  statsData.length +
                  ongoingEvents.length +
                  topDonators.length +
                  10
                }
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Donation Requests</CardTitle>
                    <CardDescription>
                      Active fundraising campaigns
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {donationRequests.map((request, index) => (
                      <motion.div
                        key={request.id}
                        className="space-y-2"
                        variants={fadeInVariants}
                        custom={
                          statsData.length +
                          ongoingEvents.length +
                          topDonators.length +
                          index +
                          11
                        }
                      >
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-medium">{request.title}</h4>
                          <span className="flex items-center text-xs text-muted-foreground w-32">
                            <Clock className="mr-1 h-4 w-4 flex-shrink-0" />
                            {request.deadline}
                          </span>
                        </div>
                        <DonationProgress
                          current={request.current}
                          target={request.target}
                        />
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AuthenticatedLayout>
  );
}
