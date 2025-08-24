import { projectsData, ProjectData } from "@/data/projects";
import fs from "fs";
import path from "path";

export async function getProjectWithReadme(
  projectId: string
): Promise<ProjectData | null> {
  const project = projectsData.find((p) => p.id === projectId);
  if (!project) return null;

  try {
    const readmePath = path.join(
      process.cwd(),
      "src",
      "data",
      "projects",
      `${projectId}.md`
    );
    const readmeContent = fs.readFileSync(readmePath, "utf8");

    return {
      ...project,
      readmeContent,
    };
  } catch (error) {
    console.error(`Failed to load README for project ${projectId}:`, error);
    return project;
  }
}

export function getAllProjects(): ProjectData[] {
  return projectsData;
}

export async function getAllProjectsWithReadme(): Promise<ProjectData[]> {
  const projectsWithReadme = await Promise.all(
    projectsData.map(async (project) => {
      try {
        const readmePath = path.join(
          process.cwd(),
          "src",
          "data",
          "projects",
          `${project.id}.md`
        );
        const readmeContent = fs.readFileSync(readmePath, "utf8");

        return {
          ...project,
          readmeContent,
        };
      } catch (error) {
        console.error(
          `Failed to load README for project ${project.id}:`,
          error
        );
        return project;
      }
    })
  );

  return projectsWithReadme;
}
