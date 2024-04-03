import ProjectItems from "@/components/Project/ProjectItem";
import NotionModal from "@/components/Project/ProjectPageModal";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import { TOKEN, DATABASE_ID } from "../config/index";
import { projectsList } from "@/public/static/data";

export type ProjectType = {
  id: string;
  title: string;
  duration: { start: string; end: string | null; timezone: null };
  github: string | null;
  demo: string | null;
  ios: string | null;
  android: string | null;
  tech: { id: string; color: string; name: string }[];
  description: string | null;
  projectURL: string;
  coverImage: string | null;
  site: string | null;
};

export default function Project() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageId, setPageId] = useState("");
  const [modalProject, setModalProject] = useState<ProjectType | null>(null);

  return (
    <div className="flex flex-col min-h-screen justify-center items-center px-5 pt-24 mb-12">
      <h1 className="font-bold text-5xl">Project</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 py-10 m-6 gap-8 items-center justify-center max-w-6xl">
        {projectsList.map((project, key) => (
          <ProjectItems
            key={key}
            project={project}
            onClick={() => {
              setPageId(project.id);
              setModalProject(project);
              setIsModalOpen(true);
            }}
          />
        ))}
      </div>
      <NotionModal
        project={modalProject}
        pageId={pageId}
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
