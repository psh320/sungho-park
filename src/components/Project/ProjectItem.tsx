import { ProjectType } from "@/pages/project";
import Image from "next/image";
import Link from "next/link";
import ProjectAndroidLink from "./ProjectAndroidLink";
import ProjectDemoLink from "./ProjectDemoLink";
import ProjectDuration from "./ProjectDuration";
import ProjectGitLink from "./ProjectGitLink";
import ProjectIosLink from "./ProjectIosLink";
import ProjectNotionLink from "./ProjectNotionLink";
import ProjectSiteLink from "./ProjectSiteLink";
import ProjectTags from "./ProjectTags";

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

type Props = {
  project: ProjectType;
  onClick: () => void;
};

export default function ProjectItems({ project, onClick }: Props) {
  return (
    <div className="flex flex-col m-3 project-card h-full">
      <Image
        width="600"
        height="0"
        priority
        style={{ objectFit: "cover", height: "250px" }}
        className="w-full rounded-t-xl"
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
        src={
          project.coverImage
            ? project.coverImage
            : "https://www.grouphealth.ca/wp-content/uploads/2018/05/placeholder-image.png"
        }
        alt="project image"
        quality={50}
      />
      <div className="p-4 flex flex-col">
        <h1 className="text-2xl font-bold">{project.title}</h1>
        <ProjectDuration duration={project.duration} />

        <h3 className="text-md">{project.description}</h3>
        <div className="flex flex-row my-2" onClick={onClick}>
          <ProjectNotionLink link={project.projectURL} />
        </div>
        <div className="flex flex-col justify-center items-center my-3">
          <div className="border-2 w-12 rounded-md border-sky-200 dark:border-sky-700" />
        </div>

        <h2 className="font-semibold mb-1">Tech Stack</h2>

        <ProjectTags tags={project.tech} />

        <div className="flex flex-row items-center flex-wrap ">
          {project.site && <ProjectSiteLink link={project.site} />}
          {project.github && <ProjectGitLink link={project.github} />}
          {project.demo && <ProjectDemoLink link={project.demo} />}
          {project.ios && <ProjectIosLink link={project.ios} />}
          {project.android && <ProjectAndroidLink link={project.android} />}
        </div>
      </div>
    </div>
  );
}
