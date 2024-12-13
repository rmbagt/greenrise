import LandingLayout from "@/Layouts/LandingLayout";
import { PageProps, Event } from "@/types";
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
import { Button } from "@/Components/ui/button";
import {
  Search,
  Calendar,
  MapPin,
  Heart,
  Mail,
  Phone,
  LocateIcon as Location,
} from "lucide-react";
import { Textarea } from "@/Components/ui/textarea";
import { useRef, useState, useMemo } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "@inertiajs/react";

interface LandingProps extends PageProps {
  featuredEvents?: Event[];
  upcomingEvents?: Event[];
}

export default function Landing({
  auth,
  featuredEvents = [],
  upcomingEvents = [],
}: LandingProps) {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  const [searchTerm, setSearchTerm] = useState("");
  const [dayFilter, setDayFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const handleAuthenticatedAction = (action: string) => {
    if (!auth.user) {
      return route("login");
    }
    return action;
  };

  const filteredEvents = useMemo(() => {
    return upcomingEvents.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDay =
        dayFilter === "all" ||
        (dayFilter === "weekdays" &&
          [1, 2, 3, 4, 5].includes(new Date(event.date).getDay())) ||
        (dayFilter === "weekend" &&
          [0, 6].includes(new Date(event.date).getDay()));
      const matchesCategory = categoryFilter === "all";
      // || event.category === categoryFilter;

      return matchesSearch && matchesDay && matchesCategory;
    });
  }, [upcomingEvents, searchTerm, dayFilter, categoryFilter]);

  return (
    <LandingLayout auth={auth}>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12" id="home">
        {featuredEvents.length > 0 ? (
          <Carousel
            plugins={[plugin.current]}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {featuredEvents.map((event, index) => (
                <CarouselItem key={index}>
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-6">
                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                        {event.title}
                      </h1>
                      <p className="text-lg text-white/90 line-clamp-3">
                        {event.description}
                      </p>
                      <div className="flex gap-4">
                        <Button
                          size="lg"
                          className="bg-pink-600 hover:bg-pink-700"
                          asChild
                        >
                          <Link href={route("event.index")}>Donate Now</Link>
                        </Button>
                        <Button
                          size="lg"
                          variant="outline"
                          className="border-white hover:bg-white hover:text-green-600"
                          asChild
                        >
                          <Link href={route("event.show", { id: event.id })}>
                            Learn More
                          </Link>
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
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-white">
              No featured events at the moment
            </h2>
          </div>
        )}
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
      <section className="container mx-auto px-4 py-16" id="event">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4 md:mb-0">
            Upcoming Events
          </h2>
          <div className="flex gap-4">
            <Select value={dayFilter} onValueChange={setDayFilter}>
              <SelectTrigger className="bg-white/20 border-0 text-white w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Days</SelectItem>
                <SelectItem value="weekdays">Weekdays</SelectItem>
                <SelectItem value="weekend">Weekend</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
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

        {filteredEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden group hover:shadow-xl transition-all"
              >
                <div className="relative aspect-video">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 rounded-lg p-2 text-center min-w-[60px]">
                    <div className="text-sm font-semibold text-green-600">
                      {new Date(event.date)
                        .toLocaleString("default", { month: "short" })
                        .toUpperCase()}
                    </div>
                    <div className="text-2xl font-bold text-green-900">
                      {new Date(event.date).getDate()}
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
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-bold text-white">
              No events match your search criteria
            </h3>
          </div>
        )}

        <div className="flex justify-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-white hover:bg-white hover:text-green-600"
            asChild
          >
            <Link href={route("event.index")}>Load More</Link>
          </Button>
        </div>
      </section>

      {/* Donation Section */}
      <section className="bg-white py-16" id="donation">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-green-600 mb-8 text-center">
            Make a Difference Today
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-700">
                Your donation helps us continue our mission to create a greener,
                more sustainable future. Every contribution, no matter how
                small, makes a significant impact on our community and
                environment.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {[10000, 25000, 50000].map((amount) => (
                  <Button
                    key={amount}
                    className="bg-green-600 hover:bg-green-700"
                    asChild
                  >
                    <Link href={route("event.index")}>
                      <Heart className="mr-2 h-4 w-4" /> Donate Rp {amount}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
            <div className="bg-green-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-4">
                Where Your Money Goes
              </h3>
              <ul className="space-y-2 text-green-700">
                <li>• 40% - Tree Planting and Maintenance</li>
                <li>• 30% - Environmental Education Programs</li>
                <li>• 20% - Community Clean-up Initiatives</li>
                <li>• 10% - Administrative Costs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white py-16" id="contact">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-green-600 mb-8 text-center">
            Get in Touch
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-green-800">
                Contact Information
              </h3>
              <div className="flex items-center space-x-4 text-gray-700">
                <Mail className="h-5 w-5 text-green-600" />
                <span>info@greenrise.org</span>
              </div>
              <div className="flex items-center space-x-4 text-gray-700">
                <Phone className="h-5 w-5 text-green-600" />
                <span>+62 22 82716203</span>
              </div>
              <div className="flex items-center space-x-4 text-gray-700">
                <Location className="h-5 w-5 text-green-600" />
                <span>Kebon Jeruk, West Jakarta, Indonesia</span>
              </div>
            </div>
            <form className="space-y-4">
              <Input
                placeholder="Your Name"
                className="border-green-300 focus:border-green-500"
              />
              <Input
                type="email"
                placeholder="Your Email"
                className="border-green-300 focus:border-green-500"
              />
              <Textarea
                placeholder="Your Message"
                className="border-green-300 focus:border-green-500"
                rows={4}
              />
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}
