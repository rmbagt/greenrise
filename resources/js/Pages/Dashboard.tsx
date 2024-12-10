import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
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
import { faker } from "@faker-js/faker";

// Sample data - replace with actual data from your backend
const stats = [
  {
    title: "Total Events",
    value: "12",
    icon: <CalendarDays className="h-4 w-4 text-green-600" />,
    description: "4 ongoing events",
  },
  {
    title: "Total Donators",
    value: "2,350",
    icon: <Users className="h-4 w-4 text-blue-600" />,
    description: "+180 from last month",
  },
  {
    title: "Events Supported",
    value: "5",
    icon: <TreePine className="h-4 w-4 text-emerald-600" />,
    description: "Events supported by you",
  },
  {
    title: "Your Donations",
    value: "$450",
    icon: <Trophy className="h-4 w-4 text-amber-600" />,
    description: "+20.1% from last month",
  },
];

const ongoingEvents = Array.from({ length: 3 }, (_, i) => ({
  id: i + 1,
  title: faker.company.name(),
  date: faker.date.future().toISOString().split("T")[0],
  image: faker.image.url(),
  participants: faker.number.int({ min: 20, max: 100 }),
  location: faker.address.city(),
}));

const topDonators = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  name: faker.person.fullName(),
  image: faker.image.avatar(),
  amount: faker.number.int({ min: 500, max: 1500 }),
  events: faker.number.int({ min: 1, max: 5 }),
})).sort((a, b) => b.amount - a.amount);

const donationRequests = Array.from({ length: 3 }, (_, i) => ({
  id: i + 1,
  title: faker.company.catchPhrase(),
  current: faker.number.int({ min: 5000, max: 20000 }),
  target: faker.number.int({ min: 20000, max: 50000 }),
  deadline: `${faker.number.int({ min: 1, max: 10 })} days left`,
  status: "active",
}));

export default function Dashboard() {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl space-y-8 sm:px-6 lg:px-8">
          {/* Stats Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
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
                      <Button variant="ghost" size="icon">
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Donators */}
            <Card>
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
                      <div className="font-medium">${donator.amount}</div>
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
                        <span className="flex items-center text-sm text-muted-foreground">
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
