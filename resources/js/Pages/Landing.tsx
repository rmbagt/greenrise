import { Head } from "@inertiajs/react";
import LandingLayout from "@/Layouts/LandingLayout";

export default function Landing() {
    return(
        <>
            <Head title="Landing" />
            <div className="flex flex-col min-h-screen">
                <LandingLayout />
            </div>
        </>
    );
};