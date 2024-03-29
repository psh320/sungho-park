import ProjectItems from "@/components/Project/ProjectItem";
import NotionModal from "@/components/Project/ProjectPageModal";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import { TOKEN, DATABASE_ID } from "../config/index";

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

type Props = {
  projects: ProjectType[];
};
export default function Project({ projects }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageId, setPageId] = useState("");
  const [modalProject, setModalProject] = useState<ProjectType | null>(null);

  return (
    <div className="flex flex-col min-h-screen justify-center items-center px-5 pt-24 mb-12">
      <h1 className="font-bold text-5xl">Project</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 py-10 m-6 gap-8 items-center justify-center max-w-6xl">
        {projects.map((project, key) => (
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

//called at build time
export async function getServerSideProps(context: GetStaticProps) {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Notion-Version": "2022-06-28",
      "content-type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      page_size: 100,
      sorts: [
        {
          property: "Duration",
          direction: "descending",
        },
      ],
    }),
  };

  const res = await fetch(
    `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
    options
  );
  const projects = await res.json();
  const parsedData = parseDatabase(projects.results);
  return {
    props: { projects: parsedData }, // will be passed to the page component as props
  };
}

function parseDatabase(data: any): ProjectType[] {
  return data.map((project: any) => ({
    id: project.id,
    title: project.properties.Name.title[0].plain_text,
    duration: project.properties.Duration.date,
    github: project.properties.Github.url,
    demo: project.properties.Demo.url,
    site: project.properties.Site.url,
    ios: project.properties.ios.url,
    android: project.properties.android.url,
    tech: project.properties.Tech.multi_select,
    description:
      project.properties.Description.rich_text.length === 0
        ? null
        : project.properties.Description.rich_text[0].plain_text,
    projectURL: project.url,
    coverImage: project.cover
      ? project.cover.external
        ? project.cover.external.url
        : project.cover.file.url
      : null,
  }));
}
