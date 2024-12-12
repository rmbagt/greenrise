import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-6 sm:px-6 lg:px-8 dark:bg-gray-900">
      <Link
        href="/"
        className="flex items-center space-x-4 mb-8 hover:text-green-300"
      >
        <span className="text-3xl sm:text-4xl font-semibold tracking-wide text-black transition duration-300 dark:text-white">
          GreenRise
        </span>
        <div className="relative w-8 h-8 sm:w-10 sm:h-10 transition duration-300 text-green-400 hover:text-green-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8 sm:w-10 sm:h-10"
          >
            <path d="M7 20h10" />
            <path d="M10 20c5.5-2.5.8-6.4 3-10" />
            <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
            <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
          </svg>
        </div>
      </Link>
      <div className="w-full max-w-md overflow-hidden bg-white p-4 md:p-8 shadow-md rounded-lg dark:bg-gray-800">
        {children}
      </div>
    </div>
  );
}
