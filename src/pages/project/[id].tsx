import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Head from "next/head";
import { ProjectDetailPage } from "@/components/Project/ProjectDetailPage";
import { getAllProjectsWithReadme } from "@/utils/projectUtils";
import { ProjectData } from "@/data/projects";

// Named constants for better readability (Naming Magic Numbers)
const REVALIDATION_TIME_SECONDS = 86400; // 24 hours
const DEFAULT_DESCRIPTION = "View project details and documentation";

interface ProjectDetailPageProps {
  project: ProjectData | null;
}

/**
 * Page head component - Single Responsibility for SEO
 * Abstracting Implementation Details - Separates head management
 */
function ProjectPageHead({ project }: { project: ProjectData | null }) {
  const title = project
    ? `${project.title} - Sungho Park`
    : "Project - Sungho Park";

  const description = project?.description || DEFAULT_DESCRIPTION;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {project?.demo && <meta property="og:url" content={project.demo} />}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
}

/**
 * Loading state component - Separating Code Paths for loading
 * Single Responsibility - Handles only loading display
 */
function ProjectLoadingState() {
  return (
    <>
      <ProjectPageHead project={null} />
      <ProjectDetailPage project={null} isLoading={true} />
    </>
  );
}

/**
 * Error state component - Separating Code Paths for errors
 * Single Responsibility - Handles only error display
 */
function ProjectErrorState() {
  return (
    <>
      <ProjectPageHead project={null} />
      <ProjectDetailPage project={null} isLoading={false} />
    </>
  );
}

/**
 * Success state component - Separating Code Paths for successful load
 * Single Responsibility - Handles only successful project display
 */
function ProjectSuccessState({ project }: { project: ProjectData }) {
  return (
    <>
      <ProjectPageHead project={project} />
      <ProjectDetailPage project={project} isLoading={false} />
    </>
  );
}

/**
 * Dynamic project detail page
 * Features: dynamic routing, SEO optimization, loading states, error handling
 * Cohesion - Groups project page functionality together
 */
export default function ProjectPage({ project }: ProjectDetailPageProps) {
  const router = useRouter();
  const [isClientLoading, setIsClientLoading] = useState(false);

  // Handle router loading state (client-side navigation)
  useEffect(() => {
    const handleRouteChangeStart = () => setIsClientLoading(true);
    const handleRouteChangeComplete = () => setIsClientLoading(false);
    const handleRouteChangeError = () => setIsClientLoading(false);

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, [router]);

  // Handle different states (Separating Code Paths)
  if (router.isFallback || isClientLoading) {
    return <ProjectLoadingState />;
  }

  if (!project) {
    return <ProjectErrorState />;
  }

  return <ProjectSuccessState project={project} />;
}

/**
 * Generate static paths for all projects - Revealing Hidden Logic
 * Pre-generates pages for all available projects at build time
 */
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const projects = await getAllProjectsWithReadme();

    // Generate paths for each project
    const paths = projects.map((project) => ({
      params: { id: project.id },
    }));

    return {
      paths,
      fallback: false, // Show 404 for non-existent projects
    };
  } catch (error) {
    console.error("Error generating static paths:", error);
    return {
      paths: [],
      fallback: false,
    };
  }
};

/**
 * Get static props for individual project - Single Responsibility
 * Fetches project data at build time for optimal performance
 */
export const getStaticProps: GetStaticProps<ProjectDetailPageProps> = async ({
  params,
}) => {
  try {
    if (!params?.id || typeof params.id !== "string") {
      return {
        notFound: true,
      };
    }

    const projects = await getAllProjectsWithReadme();
    const project = projects.find((p) => p.id === params.id);

    if (!project) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        project,
      },
      revalidate: REVALIDATION_TIME_SECONDS,
    };
  } catch (error) {
    console.error("Error fetching project:", error);
    return {
      notFound: true,
    };
  }
};
