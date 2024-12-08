import { Link } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Button } from "@/Components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/Components/ui/carousel";

const carouselData = [
    {
        imageUrl: "/assets/item1.png",
        title: "Lorem ipsum odor amet",
        description: "Lorem ipsum odor amet, consectetuer adipiscing elit. Iaculis amet iaculis imperdiet nam ultrices elit laoreet cursus diam quis massa est dapibus gravida amet ultricies sagittis nec vestibulum mauris sed fusce id.",
        detailUrl: "#",
    },
    {
        imageUrl: "/assets/item2.png",
        title: "Lorem ipsum odor amet",
        description: "Lorem ipsum odor amet, consectetuer adipiscing elit. Iaculis amet iaculis imperdiet nam ultrices elit laoreet cursus diam quis massa est dapibus gravida amet ultricies sagittis nec vestibulum mauris sed fusce id.",
        detailUrl: "#",
    },
    {
        imageUrl: "/assets/item1.png",
        title: "Lorem ipsum odor amet",
        description: "Lorem ipsum odor amet, consectetuer adipiscing elit. Iaculis amet iaculis imperdiet nam ultrices elit laoreet cursus diam quis massa est dapibus gravida amet ultricies sagittis nec vestibulum mauris sed fusce id.",
        detailUrl: "#",
    }
];

const event = [
    {
        imageUrl: "/assets/event1.webp",
        title: "Reboisasi",
        description: "Lorem ipsum odor amet, consectetuer adipiscing elit. Iaculis amet iaculis imperdiet",
    },
    {
        imageUrl: "/assets/event1.webp",
        title: "Reboisasi",
        description: "Lorem ipsum odor amet, consectetuer adipiscing elit. Iaculis amet iaculis imperdiet",
    },
    {
        imageUrl: "/assets/event1.webp",
        title: "Reboisasi",
        description: "Lorem ipsum odor amet, consectetuer adipiscing elit. Iaculis amet iaculis imperdiet",
    }
];

export default function LandingLayout() {
    return(
        <div className="flex flex-col">
            <div className="bg-fixed w-full h-[45rem]" style={{ backgroundImage: "url('/assets/Header.webp')"}}>
                <div className="flex flex-col mx-60 pt-7">
                    <div className="flex">
                        <img src="#" alt="greenwise"/>
                        <div className="flex justify-end items-center w-full gap-10">
                            <h1 className="text-white">Schedule</h1>
                            <h1 className="text-white">Speakers</h1>
                            <h1 className="text-white">Ticket</h1>
                            <h1 className="text-white">Contact</h1>
                            {/* {auth.user ? (
                                <Link href={route("dashboard")}><Button variant={"outline"} className="text-white bg-transparent">Dashboard</Button></Link>
                            ): (
                                <Link href={route("login")}><Button variant={"outline"} className="text-white bg-transparent">Login</Button></Link>
                            )} */}
                        </div>
                    </div>
                    <div className="flex pt-14">
                        <Carousel>
                            <CarouselContent>
                                {carouselData.map((item, index) => (
                                    <CarouselItem key={index} className="flex">
                                        <img src={item.imageUrl} className="w-[35rem] h-[34rem] shrink-0"/>
                                        <div className="flex flex-col justify-center gap-5">
                                            <h1 className="text-white text-[4rem]">{item.title}</h1>
                                            <p className="text-white text-lg">{item.description}</p>
                                            <Link href={item.detailUrl}><Button className="w-1/6 bg-[#ff0a85] hover:bg-[#d10f71] rounded-full h-14 text-md">Learn More..</Button></Link>
                                        </div>
                                    </CarouselItem> 
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                </div>
            </div>
            <div className="my-14 mx-60">
                <h1 className="text-3xl font-bold">List Events</h1>
                <div className="mt-10 w-full grid grid-cols-3 gap-5">
                    {event.map((item, index) => (
                        <div key={index} className="flex flex-col w-full">
                            <img src={item.imageUrl} className="w-full h-1/2 rounded-t-xl"/>
                            <div className="flex-flex-col p-3 rounded-b-lg drop-shadow-md bg-white">
                                <h3 className="font-bold">{item.title}</h3>
                                <p className="text-sm">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="my-10 bg-fuchsia-400">
                <img className="w-72" src="/assets/consult.png"/>
            </div>
        </div>
    )
};