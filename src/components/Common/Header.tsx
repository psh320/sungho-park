import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DarkModeToggleButton from "./DarkModeToggleButton";

export default function Header() {
  const route = useRouter();
  const [headerToggle, setHeaderToggle] = useState("hidden");
  useEffect(() => {
    function handleResize() {
      setHeaderToggle("hidden");
    }
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleResize);
  }, []);

  useEffect(() => {
    setHeaderToggle("hidden");
  }, [route]);
  return (
    <header className="header text-gray-600 body-font bg-primary border-b border-slate-200 dark:border-slate-700">
      <div
        className={`container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between header-animation ${
          headerToggle === "flex" && "header-opened"
        } `}
      >
        <div className="flex flex-row justify-between w-full">
          <Link
            href="/"
            className="flex title-font font-medium items-center justify-center text-gray-900 mb-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
              />
            </svg>

            <span className="ml-3 text-xl text-gray-600 dark:text-gray-100">
              Sungho Park
            </span>
          </Link>

          <nav className="hidden md:ml-auto md:flex flex-wrap items-center text-base justify-center">
            <Link href="/" className="mr-5 header-link">
              Home
            </Link>
            <Link href="/project" className="mr-5 header-link">
              Project
            </Link>
            <Link href="/cv.pdf" className="mr-5 header-link">
              CV
            </Link>
          </nav>

          <div className="flex flex-row justify-center items-center">
            <DarkModeToggleButton />
            <button
              data-collapse-toggle="navbar-default"
              type="button"
              className="inline-flex items-center p-1 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded="false"
              onClick={() => {
                headerToggle === "hidden"
                  ? setHeaderToggle("flex")
                  : setHeaderToggle("hidden");
              }}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <nav
          className={`${headerToggle} md:ml-auto flex-wrap items-center text-base justify-center flex-col w-full relative`}
        >
          <Link href="/" className="px-4 py-2 m-2 header-link">
            Home
          </Link>
          <Link href="/project" className="px-4 py-2 m-2 header-link">
            Project
          </Link>
          <Link href="/cv.pdf" className="px-4 py-2 m-2 header-link">
            CV
          </Link>
        </nav>
      </div>
    </header>
  );
}

{
  /* <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
  <div class="container flex flex-wrap items-center justify-between mx-auto">
    <a href="https://flowbite.com/" class="flex items-center">
      <img
        src="https://flowbite.com/docs/images/logo.svg"
        class="h-6 mr-3 sm:h-9"
        alt="Flowbite Logo"
      />
      <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
        Flowbite
      </span>
    </a>
    <button
      data-collapse-toggle="navbar-default"
      type="button"
      class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      aria-controls="navbar-default"
      aria-expanded="false"
    >
      <span class="sr-only">Open main menu</span>
      <svg
        class="w-6 h-6"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <a
            href="#"
            class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
            aria-current="page"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#"
            class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#"
            class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            Services
          </a>
        </li>
        <li>
          <a
            href="#"
            class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            Pricing
          </a>
        </li>
        <li>
          <a
            href="#"
            class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            Contact
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>; */
}
