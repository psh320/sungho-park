import { ProjectData } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
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

// Background colors for projects without cover images
const PROJECT_BACKGROUND_COLORS = [
  "bg-gradient-to-br from-blue-500 to-purple-600",
  "bg-gradient-to-br from-green-500 to-teal-600",
  "bg-gradient-to-br from-orange-500 to-red-600",
  "bg-gradient-to-br from-pink-500 to-rose-600",
  "bg-gradient-to-br from-indigo-500 to-blue-600",
  "bg-gradient-to-br from-purple-500 to-pink-600",
  "bg-gradient-to-br from-teal-500 to-green-600",
  "bg-gradient-to-br from-yellow-500 to-orange-600",
];

type Props = {
  project: ProjectData;
  /** Optional callback when project is selected for detail view */
  onSelect?: () => void;
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
function ProjectActions({
  projectId,
  onSelect,
}: {
  projectId: string;
  onSelect?: () => void;
}) {
  // Use callback for windowed view if provided, otherwise external link
  if (onSelect) {
    return (
      <div className="flex flex-row my-2">
        <button
          onClick={onSelect}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
        >
          View Details
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-row my-2">
      <Link
        href={`/project/${projectId}`}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium inline-block text-center"
      >
        View Details
      </Link>
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

// Component for projects without cover images - shows title with gradient background
function ProjectPlaceholder({
  title,
  projectId,
}: {
  title: string;
  projectId: string;
}) {
  // Generate consistent color based on project ID
  const colorIndex =
    projectId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    PROJECT_BACKGROUND_COLORS.length;
  const backgroundClass = PROJECT_BACKGROUND_COLORS[colorIndex];

  return (
    <div
      className={`w-full rounded-t-xl flex items-center justify-center ${backgroundClass}`}
      style={{ height: PROJECT_IMAGE_HEIGHT }}
    >
      <div className="text-center px-6">
        <h2 className="text-white text-3xl font-bold drop-shadow-lg">
          {title}
        </h2>
        <div className="mt-2 w-16 h-1 bg-white bg-opacity-50 rounded-full mx-auto"></div>
      </div>
    </div>
  );
}

export default function ProjectItem({ project, onSelect }: Props) {
  // Named condition for better readability (Naming Complex Conditions)
  const hasValidCoverImage = Boolean(project.coverImage);

  return (
    <article className="flex flex-col m-3 project-card h-full bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      {hasValidCoverImage ? (
        <Image
          width={600}
          height={0}
          priority
          style={{ objectFit: "cover", height: PROJECT_IMAGE_HEIGHT }}
          className="w-full rounded-t-xl"
          src={
            project.coverImage ||
            project.screenshots?.[0] ||
            PLACEHOLDER_IMAGE_URL
          }
          alt={`${project.title} project screenshot`}
          quality={50}
        />
      ) : (
        <ProjectPlaceholder title={project.title} projectId={project.id} />
      )}

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

        <ProjectActions projectId={project.id} onSelect={onSelect} />
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
