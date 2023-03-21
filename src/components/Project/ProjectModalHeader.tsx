import { ProjectType } from "@/pages/project";
import React from "react";
import ProjectDuration from "./ProjectDuration";
import Image from "next/image";
import ProjectTags from "./ProjectTags";
import ProjectSiteLink from "./ProjectSiteLink";
import ProjectGitLink from "./ProjectGitLink";
import ProjectDemoLink from "./ProjectDemoLink";
import ProjectAndroidLink from "./ProjectAndroidLink";
import ProjectIosLink from "./ProjectIosLink";
type Props = {
  project: ProjectType;
};

export const ProjectModalHeader = ({ project }: Props) => {
  return (
    <div className="my-4">
      <h1 className="text-4xl font-bold my-2">{project.title}</h1>
      <ProjectDuration duration={project.duration} />
      <Image
        width="600"
        height="0"
        priority
        style={{ objectFit: "cover", height: "400px" }}
        className="w-full rounded-xl border"
        src={
          project.coverImage
            ? project.coverImage
            : "https://www.grouphealth.ca/wp-content/uploads/2018/05/placeholder-image.png"
        }
        alt="project image"
        quality={50}
      />
      <h2 className="font-semibold my-2">Tech Stacks</h2>
      <ProjectTags tags={project.tech} />
      <div className="flex flex-row items-center flex-wrap">
        {project.site && <ProjectSiteLink link={project.site} />}
        {project.github && <ProjectGitLink link={project.github} />}
        {project.demo && <ProjectDemoLink link={project.demo} />}
        {project.ios && <ProjectIosLink link={project.ios} />}
        {project.android && <ProjectAndroidLink link={project.android} />}
      </div>
      <div className="flex flex-col justify-center items-center my-8">
        <div className="border-2 w-12 rounded-md border-sky-200 dark:border-sky-700" />
      </div>
    </div>
  );
};
