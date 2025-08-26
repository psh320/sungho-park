import { ProjectData } from "@/data/projects";
import { useState, useEffect } from "react";
import LoadingIndicator from "../UI/LoadingIndicator";
import { ProjectModalHeader } from "./ProjectModalHeader";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { X } from "lucide-react";

interface Props {
  project: ProjectData | null;
  isVisible: boolean; // More descriptive name
  onClose: () => void;
}

// Separate component for close button (Abstracting Implementation Details)
function ModalCloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      onClick={onClose}
      className="fixed top-4 right-4 cursor-pointer p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 z-10"
      aria-label="Close modal"
    >
      <X className="h-6 w-6 text-gray-500 dark:text-gray-200" />
    </button>
  );
}

// Colocated markdown components configuration (Reducing Eye Movement)
const MARKDOWN_COMPONENTS = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="font-extrabold text-4xl my-4 text-slate-900 dark:text-gray-100">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="font-semibold text-2xl my-3 text-slate-800 dark:text-gray-200">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="font-semibold text-lg my-2 text-slate-700 dark:text-gray-300">
      {children}
    </h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-slate-700 dark:text-gray-200 my-2 leading-relaxed">
      {children}
    </p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc list-inside my-2 text-slate-700 dark:text-gray-200">
      {children}
    </ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="list-decimal list-inside my-2 text-slate-700 dark:text-gray-200">
      {children}
    </ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="my-1">{children}</li>
  ),
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="font-semibold text-slate-900 dark:text-gray-100">
      {children}
    </strong>
  ),
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
    >
      {children}
    </a>
  ),
  hr: () => (
    <div className="border-b w-full my-6 border-slate-300 dark:border-slate-600" />
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-slate-300 dark:border-slate-600 pl-4 my-4 italic text-slate-600 dark:text-gray-400">
      {children}
    </blockquote>
  ),
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-sm font-mono">
      {children}
    </code>
  ),
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto my-4">
      {children}
    </pre>
  ),
};

// Separate component for markdown content (Abstracting Implementation Details)
function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={MARKDOWN_COMPONENTS}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

function ProjectModal({ project, isVisible, onClose }: Props) {
  const [readmeContent, setReadmeContent] = useState<string>("");

  // Named condition for better readability
  const hasReadmeContent = Boolean(readmeContent);
  const shouldShowModal = isVisible && project;

  const handleClose = () => {
    onClose();
    setReadmeContent("");
  };

  useEffect(() => {
    if (isVisible && project?.readmeContent) {
      setReadmeContent(project.readmeContent);
    }
  }, [isVisible, project]);

  if (!shouldShowModal) return null;

  return (
    <div className="modal">
      <div className="modal-backdrop" onClick={handleClose} />
      <div className="modal-content dark:bg-slate-800 bg-white">
        <ProjectModalHeader project={project} />

        {hasReadmeContent ? (
          <MarkdownContent content={readmeContent} />
        ) : (
          <LoadingIndicator />
        )}

        <ModalCloseButton onClose={handleClose} />
      </div>
    </div>
  );
}

export default ProjectModal;
