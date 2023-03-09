import { ProjectType } from "@/pages/project";
import Image from "next/image";
import Link from "next/link";
type Props = {
  project: ProjectType;
};
export default function ProjectItems({ project }: Props) {
  const calculatedPeriod = (start, end) => {
    const startDateStringArray = start.split("-");
    const endDateStringArray = end.split("-");

    const startDate = new Date(
      startDateStringArray[0],
      startDateStringArray[1],
      startDateStringArray[2]
    ).getTime();
    const endDate = new Date(
      endDateStringArray[0],
      endDateStringArray[1],
      endDateStringArray[2]
    ).getTime();

    const diffInMs = Math.abs(endDate - startDate);
    const result = diffInMs / (1000 * 60 * 60 * 24);
    return result;
  };
  return (
    <div className="flex flex-col m-3 project-card min-h-full">
      <Image
        width="600"
        height="0"
        style={{ objectFit: "cover", height: "250px" }}
        className="w-full rounded-t-xl"
        src={
          project.coverImage
            ? project.coverImage
            : "https://www.grouphealth.ca/wp-content/uploads/2018/05/placeholder-image.png"
        }
        alt="project image"
        quality={100}
      />
      <div className="p-4 flex flex-col">
        <h1 className="text-2xl font-bold">{project.title}</h1>
        {project.duration.end ? (
          <h3 className="my-1 text-sm font-semibold ">
            Duration: {project.duration.start} ~ {project.duration.end} (
            {calculatedPeriod(project.duration.start, project.duration.end)}{" "}
            days)
          </h3>
        ) : (
          <h3 className="my-1 text-sm font-semibold">
            Duration: {project.duration.start} ~ Present
          </h3>
        )}
        <h3 className="mt-4 text-md ">{project.description}</h3>
        <div className="flex flex-row my-2">
          <a
            href={project.projectURL}
            className="flex flex-row mt-2 hover:font-bold hover:scale-90 duration-100 items-center justify-center"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 100 100"
              fill="none"
              className="mr-2"
            >
              <path
                d="M6.017 4.313l55.333 -4.087c6.797 -0.583 8.543 -0.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277 -1.553 6.807 -6.99 7.193L24.467 99.967c-4.08 0.193 -6.023 -0.39 -8.16 -3.113L3.3 79.94c-2.333 -3.113 -3.3 -5.443 -3.3 -8.167V11.113c0 -3.497 1.553 -6.413 6.017 -6.8z"
                fill="#fff"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M61.35 0.227l-55.333 4.087C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723 0.967 5.053 3.3 8.167l13.007 16.913c2.137 2.723 4.08 3.307 8.16 3.113l64.257 -3.89c5.433 -0.387 6.99 -2.917 6.99 -7.193V20.64c0 -2.21 -0.873 -2.847 -3.443 -4.733L74.167 3.143c-4.273 -3.107 -6.02 -3.5 -12.817 -2.917zM25.92 19.523c-5.247 0.353 -6.437 0.433 -9.417 -1.99L8.927 11.507c-0.77 -0.78 -0.383 -1.753 1.557 -1.947l53.193 -3.887c4.467 -0.39 6.793 1.167 8.54 2.527l9.123 6.61c0.39 0.197 1.36 1.36 0.193 1.36l-54.933 3.307 -0.68 0.047zM19.803 88.3V30.367c0 -2.53 0.777 -3.697 3.103 -3.893L86 22.78c2.14 -0.193 3.107 1.167 3.107 3.693v57.547c0 2.53 -0.39 4.67 -3.883 4.863l-60.377 3.5c-3.493 0.193 -5.043 -0.97 -5.043 -4.083zm59.6 -54.827c0.387 1.75 0 3.5 -1.75 3.7l-2.91 0.577v42.773c-2.527 1.36 -4.853 2.137 -6.797 2.137 -3.107 0 -3.883 -0.973 -6.21 -3.887l-19.03 -29.94v28.967l6.02 1.363s0 3.5 -4.857 3.5l-13.39 0.777c-0.39 -0.78 0 -2.723 1.357 -3.11l3.497 -0.97v-38.3L30.48 40.667c-0.39 -1.75 0.58 -4.277 3.3 -4.473l14.367 -0.967 19.8 30.327v-26.83l-5.047 -0.58c-0.39 -2.143 1.163 -3.7 3.103 -3.89l13.4 -0.78z"
                fill="#000"
              />
            </svg>
            <p className="rounded-md">Read More</p>
          </a>
        </div>
        <div className="flex flex-col justify-center items-center my-2">
          <div className="border-2 w-12 rounded-md border-blue-200 dark:border-orange-500" />
        </div>

        <h2 className="font-semibold">Tech Stack</h2>
        <div className="flex items-start my-1 flex-wrap">
          {project.tech.map((tag, index) => (
            <h1
              key={index}
              className="px-2 py-1 mb-2 mr-2 rounded-md bg-sky-200 dark:bg-sky-700"
            >
              {tag.name}
            </h1>
          ))}
        </div>
        <div className="flex flex-row items-center ">
          {project.github && (
            <a
              href={project.github}
              className="mr-4 mt-4 flex flex-row hover:font-bold hover:scale-90 duration-100 items-center justify-center"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="mr-2"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <p>Github</p>
            </a>
          )}

          {project.demo && (
            <a
              href={project.demo}
              className="mr-4 mt-4 flex flex-row hover:font-bold hover:scale-90 duration-100 items-center justify-center"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="24"
                viewBox="0 0 159 110"
              >
                <path
                  d="m154 17.5c-1.82-6.73-7.07-12-13.8-13.8-9.04-3.49-96.6-5.2-122 0.1-6.73 1.82-12 7.07-13.8 13.8-4.08 17.9-4.39 56.6 0.1 74.9 1.82 6.73 7.07 12 13.8 13.8 17.9 4.12 103 4.7 122 0 6.73-1.82 12-7.07 13.8-13.8 4.35-19.5 4.66-55.8-0.1-75z"
                  fill="#f00"
                />
                <path d="m105 55-40.8-23.4v46.8z" fill="#fff" />
              </svg>
              <p>Demo Video</p>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
