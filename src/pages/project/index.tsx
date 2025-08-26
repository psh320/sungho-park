import ProjectItem from "@/components/Project/ProjectItem";
import { GetStaticProps } from "next";
import { getAllProjectsWithReadme } from "@/utils/projectUtils";
import { ProjectData } from "@/data/projects";

// Named constant for better readability
const REVALIDATION_TIME_SECONDS = 86400; // 24 hours

type Props = {
  projects: ProjectData[];
};

// Separate component for project grid (Abstracting Implementation Details)
function ProjectGrid({ projects }: { projects: ProjectData[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 py-10 m-6 gap-8 items-center justify-center max-w-6xl">
      {projects.map((project) => (
        <ProjectItem
          key={project.id} // Use project.id instead of array index
          project={project}
        />
      ))}
    </div>
  );
}

// Separate component for page header (Cohesion)
function ProjectPageHeader() {
  return (
    <header className="text-center mb-8">
      <h1 className="font-bold text-5xl text-slate-900 dark:text-white">
        Projects
      </h1>
      <p className="text-lg text-slate-600 dark:text-slate-400 mt-4">
        Explore my development projects and technical achievements
      </p>
    </header>
  );
}

export default function ProjectPage({ projects }: Props) {
  return (
    <div>
      <div className="flex flex-col min-h-screen justify-center items-center px-5 pt-24 mb-12">
        <ProjectPageHeader />

        <ProjectGrid projects={projects} />
      </div>
    </div>
  );
}

// Called at build time
export const getStaticProps: GetStaticProps = async () => {
  const projects = await getAllProjectsWithReadme();

  return {
    props: {
      projects,
    },
    revalidate: REVALIDATION_TIME_SECONDS,
  };
};
