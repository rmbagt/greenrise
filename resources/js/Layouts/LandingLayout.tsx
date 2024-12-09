import { Link } from "@inertiajs/react";
import { PageProps, User } from "@/types";
import { Button } from "@/Components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/Components/ui/carousel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Input } from "@/Components/ui/input";
import { Search, Calendar, MapPin } from "lucide-react";

const carouselData = [
  {
    imageUrl: "/assets/item1.png",
    title: "Community Beach Cleanup",
    description:
      "Join us in cleaning up the beach and making our environment better.",
    detailUrl: "#",
  },
  {
    imageUrl: "/assets/item2.png",
    title: "Charity Run for Education",
    description:
      "Participate in our charity run to raise funds for underprivileged children's education.",
    detailUrl: "#",
  },
  {
    imageUrl: "/assets/item1.png",
    title: "Food Drive for the Homeless",
    description:
      "Help us collect and distribute food to the homeless in our community.",
    detailUrl: "#",
  },
];

const events = [
  {
    imageUrl: "/assets/event1.webp",
    title: "Local Park Tree Planting",
    description:
      "Join us in planting trees at the local park to promote a greener environment.",
    date: { month: "APR", day: "14" },
  },
  {
    imageUrl: "/assets/event1.webp",
    title: "Fundraiser for Animal Shelter",
    description: "Support our fundraiser to help the local animal shelter.",
    date: { month: "AUG", day: "20" },
  },
  {
    imageUrl: "/assets/event1.webp",
    title: "Blood Donation Camp",
    description:
      "Donate blood and save lives at our community blood donation camp.",
    date: { month: "SEP", day: "18" },
  },
];

export default function LandingLayout({
  auth,
}: PageProps<{ auth: { user: User } }>) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-teal-600">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-white text-2xl font-bold">
            GreenRise
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="#" className="text-white hover:text-white/80">
              Home
            </Link>
            <Link href="#" className="text-white hover:text-white/80">
              Events
            </Link>
            <Link href="#" className="text-white hover:text-white/80">
              Donation
            </Link>
            <Link href="#" className="text-white hover:text-white/80">
              Contact
            </Link>

            {auth.user ? (
              <Button variant="secondary" asChild>
                <Link href={route("event.index")}>Dashboard</Link>
              </Button>
            ) : (
              <Button variant="secondary" asChild>
                <Link href={route("login")}>Login</Link>
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <Carousel className="w-full">
          <CarouselContent>
            {carouselData.map((item, index) => (
              <CarouselItem key={index}>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="rounded-lg w-full object-cover"
                  />
                  <div className="space-y-6">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                      {item.title}
                    </h1>
                    <p className="text-lg text-white/90">{item.description}</p>
                    <div className="flex gap-4">
                      <Button
                        size="lg"
                        className="bg-pink-600 hover:bg-pink-700"
                      >
                        Donate Now
                      </Button>
                      <Button size="lg" variant="outline">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </section>

      {/* Search Section */}
      <section className="container mx-auto px-4 -mt-6 relative z-10">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-200" />
              <Input
                placeholder="Search Event"
                className="pl-10 bg-white/20 border-0 text-white placeholder:text-white/60"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-200" />
              <Input
                placeholder="Place"
                className="pl-10 bg-white/20 border-0 text-white placeholder:text-white/60"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-200" />
              <Select>
                <SelectTrigger className="pl-10 bg-white/20 border-0 text-white">
                  <SelectValue placeholder="Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="tomorrow">Tomorrow</SelectItem>
                  <SelectItem value="week">This week</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4 md:mb-0">
            Upcoming Events
          </h2>
          <div className="flex gap-4">
            <Select defaultValue="weekdays">
              <SelectTrigger className="bg-white/20 border-0 text-white w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekdays">Weekdays</SelectItem>
                <SelectItem value="weekend">Weekend</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="bg-white/20 border-0 text-white w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="community">Community</SelectItem>
                <SelectItem value="charity">Charity</SelectItem>
                <SelectItem value="environment">Environment</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden group hover:shadow-xl transition-all"
            >
              <div className="relative aspect-video">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-white/90 rounded-lg p-2 text-center min-w-[60px]">
                  <div className="text-sm font-semibold text-purple-600">
                    {event.date.month}
                  </div>
                  <div className="text-2xl font-bold text-purple-900">
                    {event.date.day}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {event.title}
                </h3>
                <p className="text-white/80">{event.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button variant="outline" size="lg">
            Load More
          </Button>
        </div>
      </section>
    </div>
  );
}
