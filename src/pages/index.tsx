import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Introduction from "@/components/Home/Introduction";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <section className="flex min-h-screen flex-col  text-gray-600 body-font items-center justify-center pt-20 ">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <Introduction />
      </div>
      <div className="container">Tech stacks</div>
    </section>
  );
}
