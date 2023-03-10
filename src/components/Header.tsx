import Link from "next/link";
import DarkModeToggleButton from "./DarkmodeToggleButton";

export default function Header() {
  return (
    <header className="header text-gray-600 body-font bg-primary border-b border-slate-200 dark:border-slate-700">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          href="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
            />
          </svg>

          <span className="ml-3 text-xl text-gray-600 dark:text-gray-100">
            Sungho Park
          </span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link href="/" className="mr-5 header-link">
            Home
          </Link>
          <Link href="/project" className="mr-5 header-link">
            Project
          </Link>
          <Link href="/cv.pdf" className="mr-5 header-link">
            CV
          </Link>

          <DarkModeToggleButton />
        </nav>
      </div>
    </header>
  );
}
