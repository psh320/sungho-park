import { ProjectData } from "@/data/projects";
import LoadingIndicator from "../UI/LoadingIndicator";
import { ProjectModalHeader } from "./ProjectModalHeader";
import { Breadcrumb, createBreadcrumbs } from "../UI/Breadcrumb";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ProjectDetailPageProps {
  /** Project data to display */
  project: ProjectData | null;
  /** Loading state */
  isLoading?: boolean;
}

// Named constants for styling (Naming Magic Numbers)
const PAGE_STYLING = {
  CONTAINER: "min-h-screen bg-white dark:bg-gray-900",
  CONTENT_WRAPPER: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
  BREADCRUMB_SPACING: "mb-6",
  BACK_BUTTON_SPACING: "mb-4",
  HEADER_SPACING: "mb-8",
  MARKDOWN_SPACING: "mt-8",
} as const;

// Colocated markdown components configuration (Reducing Eye Movement)
const MARKDOWN_COMPONENTS = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mt-4 mb-2">
      {children}
    </h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
      {children}
    </p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4 space-y-1">
      {children}
    </ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="list-decimal list-inside text-gray-600 dark:text-gray-400 mb-4 space-y-1">
      {children}
    </ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="text-gray-600 dark:text-gray-400">{children}</li>
  ),
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-sm">
      {children}
    </code>
  ),
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 rounded-lg overflow-x-auto mb-4">
      {children}
    </pre>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-gray-600 dark:text-gray-400 mb-4">
      {children}
    </blockquote>
  ),
  a: ({ children, href }: { children: React.ReactNode; href?: string }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 underline transition-colors"
    >
      {children}
    </a>
  ),
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="max-w-full h-auto rounded-lg shadow-md mb-4"
      loading="lazy"
    />
  ),
};

/**
 * Back navigation button component - Single Responsibility
 * Abstracting Implementation Details - Separates navigation logic
 */
function BackButton({ href = "/projects" }: { href?: string }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors ${PAGE_STYLING.BACK_BUTTON_SPACING}`}
    >
      <ArrowLeft size={16} />
      <span>Back to Projects</span>
    </Link>
  );
}

/**
 * Project content component - Separating Code Paths for content display
 * Single Responsibility - Handles only project content rendering
 */
function ProjectContent({
  project,
  isLoading,
}: {
  project: ProjectData | null;
  isLoading?: boolean;
}) {
  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <LoadingIndicator />
      </div>
    );
  }

  // Handle missing project
  if (!project) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Project Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The project you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Link
          href="/projects"
          className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Projects</span>
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Project Header */}
      <div className={PAGE_STYLING.HEADER_SPACING}>
        <ProjectModalHeader project={project} />
      </div>

      {/* Project README Content */}
      {project.readme && (
        <div className={PAGE_STYLING.MARKDOWN_SPACING}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={MARKDOWN_COMPONENTS}
          >
            {project.readme}
          </ReactMarkdown>
        </div>
      )}
    </>
  );
}

/**
 * Project detail page component
 * Features: breadcrumbs, back navigation, full-width content, responsive design
 * Cohesion - Groups project detail page functionality together
 */
export function ProjectDetailPage({
  project,
  isLoading = false,
}: ProjectDetailPageProps) {
  // Create breadcrumbs for current project
  const breadcrumbItems = project
    ? createBreadcrumbs.forProject(project.title)
    : createBreadcrumbs.forProjects();

  return (
    <div className={PAGE_STYLING.CONTAINER}>
      <div className={PAGE_STYLING.CONTENT_WRAPPER}>
        {/* Breadcrumb Navigation */}
        <div className={PAGE_STYLING.BREADCRUMB_SPACING}>
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Back Navigation Button */}
        <BackButton />

        {/* Main Content */}
        <ProjectContent project={project} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default ProjectDetailPage;
