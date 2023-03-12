import Animation from "@/components/Home/Animation";
import { useRouter } from "next/router";
export default function Introduction() {
  const route = useRouter();
  return (
    <>
      <div className="lg:flex-grow xs:w-1/2 md:w-1/2 lg:pr-12 md:pr-8 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
        <h1 className="title-font sm:text-5xl text-4xl mb-4 font-semibold text-gray-900">
          Sungho Park
        </h1>
        <br className="hidden lg:inline-block" />
        <h2 className="title-font sm:text-3xl text-2xl mb-4 font-medium text-gray-900">
          Frontend Engineer
        </h2>
        <p className="mb-4 leading-relaxed text-lg text-left">
          Hello! My name is Sungho Park. I am a year 4 student at the City
          University of Hong Kong majoring in Computer Science.
        </p>
        <p className="mb-8 leading-relaxed text-lg text-left">
          I am a Junior Frontend Engineer who does not hesitate to learn new
          technology and is responsible for the tasks given to me. I am
          passionate about learning and growing as a developer and enjoy
          cooperating with a team. I enjoy developing both web and app that
          provides good user experience.
        </p>
        <div className="flex justify-center">
          <button
            className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            onClick={() => route.push("./project")}
          >
            Go to Projects
          </button>
        </div>
      </div>
      <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 z-0">
        <Animation />
      </div>
    </>
  );
}
