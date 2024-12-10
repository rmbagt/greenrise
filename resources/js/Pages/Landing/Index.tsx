import LandingLayout from "@/Layouts/LandingLayout";
import { PageProps, User } from "@/types";
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
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

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

export default function Landing({ auth }: PageProps) {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

  return (
    <LandingLayout auth={auth}>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12" id="home">
        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
          // onMouseEnter={plugin.current.stop}
          // onMouseLeave={plugin.current.reset}
        >
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
                      <Button
                        size="lg"
                        variant="outline"
                        className=" border-white hover:bg-white hover:text-green-600"
                      >
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
      <section className="container mx-auto px-4 py-16" id="event">
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
                  <div className="text-sm font-semibold text-green-600">
                    {event.date.month}
                  </div>
                  <div className="text-2xl font-bold text-green-900">
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
          <Button
            variant="outline"
            size="lg"
            className="border-white hover:bg-white hover:text-green-600"
          >
            Load More
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
              <div className="flex flex-wrap gap-4">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Heart className="mr-2 h-4 w-4" /> Donate $10
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Heart className="mr-2 h-4 w-4" /> Donate $25
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Heart className="mr-2 h-4 w-4" /> Donate $50
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Heart className="mr-2 h-4 w-4" /> Custom Amount
                </Button>
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
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-4 text-gray-700">
                <Location className="h-5 w-5 text-green-600" />
                <span>123 Green Street, Eco City, EC 12345</span>
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
