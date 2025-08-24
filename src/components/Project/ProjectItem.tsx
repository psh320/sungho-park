import { ProjectData } from "@/data/projects";
import Image from "next/image";
import ProjectAndroidLink from "./ProjectAndroidLink";
import ProjectDemoLink from "./ProjectDemoLink";
import ProjectDuration from "./ProjectDuration";
import ProjectGitLink from "./ProjectGitLink";
import ProjectIosLink from "./ProjectIosLink";
import ProjectSiteLink from "./ProjectSiteLink";
import ProjectTags from "./ProjectTags";

// Named constants for better readability (Naming Magic Numbers)
const PROJECT_IMAGE_HEIGHT = "250px";
const PLACEHOLDER_IMAGE_URL =
  "https://www.grouphealth.ca/wp-content/uploads/2018/05/placeholder-image.png";

type Props = {
  project: ProjectData;
  onViewDetails: () => void; // More descriptive name
};

// Separate component for project links (Abstracting Implementation Details)
function ProjectLinks({ project }: { project: ProjectData }) {
  return (
    <div className="flex flex-row items-center flex-wrap gap-2">
      {project.site && <ProjectSiteLink link={project.site} />}
      {project.github && <ProjectGitLink link={project.github} />}
      {project.demo && <ProjectDemoLink link={project.demo} />}
      {project.ios && <ProjectIosLink link={project.ios} />}
      {project.android && <ProjectAndroidLink link={project.android} />}
    </div>
  );
}

// Separate component for project actions (Cohesion)
function ProjectActions({ onViewDetails }: { onViewDetails: () => void }) {
  return (
    <div className="flex flex-row my-2">
      <button
        onClick={onViewDetails}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
      >
        View Details
      </button>
    </div>
  );
}

// Separate component for visual divider (Cohesion)
function ProjectDivider() {
  return (
    <div className="flex flex-col justify-center items-center my-3">
      <div className="border-2 w-12 rounded-md border-sky-200 dark:border-sky-700" />
    </div>
  );
}

export default function ProjectItem({ project, onViewDetails }: Props) {
  // Named condition for better readability (Naming Complex Conditions)
  const hasValidCoverImage = Boolean(project.coverImage);
  const imageSource = hasValidCoverImage
    ? project.coverImage!
    : PLACEHOLDER_IMAGE_URL;

  return (
    <article className="flex flex-col m-3 project-card h-full bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Image
        width={600}
        height={0}
        priority
        style={{ objectFit: "cover", height: PROJECT_IMAGE_HEIGHT }}
        className="w-full rounded-t-xl"
        src={imageSource}
        alt={`${project.title} project screenshot`}
        quality={50}
      />

      <div className="p-4 flex flex-col flex-grow">
        <header className="mb-4">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            {project.title}
          </h1>
          <ProjectDuration duration={project.duration} />
        </header>

        <p className="text-md text-slate-700 dark:text-slate-300 mb-4 flex-grow">
          {project.description}
        </p>

        <ProjectActions onViewDetails={onViewDetails} />
        <ProjectDivider />

        <section className="mt-auto">
          <h2 className="font-semibold mb-2 text-slate-800 dark:text-slate-200">
            Tech Stack
          </h2>
          <ProjectTags tags={project.tech} />

          <div className="mt-4">
            <ProjectLinks project={project} />
          </div>
        </section>
      </div>
    </article>
  );
}
