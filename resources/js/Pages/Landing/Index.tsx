import { Head } from "@inertiajs/react";
import LandingLayout from "@/Layouts/LandingLayout";
import { PageProps } from "@/types";

export default function Landing({
  auth,
  ziggy,
}: PageProps<{ auth: any; ziggy: any }>) {
  return (
    <>
      <Head title="Landing" />
      <div className="flex flex-col min-h-screen">
        <LandingLayout auth={auth} ziggy={ziggy} />
      </div>
    </>
  );
}
