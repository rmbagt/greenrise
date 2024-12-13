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
      value: `Rp ${Number(stats.totalDonations).toLocaleString()}`,
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

      <div className="py-12">
        <div className="mx-auto max-w-7xl space-y-8 sm:px-6 lg:px-8">
          {/* Stats Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statsData.map((stat) => (
              <StatsCard key={stat.title} {...stat} />
            ))}
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Ongoing Events */}
            <Card className="md:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle>Ongoing Events</CardTitle>
                <CardDescription>
                  Currently active environmental initiatives
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ongoingEvents.map((event) => (
                    <div key={event.id} className="flex items-center space-x-4">
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
                      <Link key={event.id} href={`/events/${event.id}`}>
                        <Button variant="ghost" size="icon">
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Donators */}
            <Card className="md:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle>Top Donators</CardTitle>
                <CardDescription>
                  Most active contributors this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topDonators.map((donator) => (
                    <div
                      key={donator.id}
                      className="flex items-center space-x-4"
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
                        Rp {Number(donator.amount).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Donation Requests */}
            <Card className="md:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle>Donation Requests</CardTitle>
                <CardDescription>Active fundraising campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {donationRequests.map((request) => (
                    <div key={request.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{request.title}</h4>
                        <span className="flex items-center text-sm text-muted-foreground w-max text-nowrap">
                          <Clock className="mr-1 h-4 w-4" />
                          {request.deadline}
                        </span>
                      </div>
                      <DonationProgress
                        current={request.current}
                        target={request.target}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
