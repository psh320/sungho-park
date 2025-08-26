import { useState, useEffect } from "react";
import { ProjectData } from "@/data/projects";
import ProjectItem from "../Project/ProjectItem";
import LoadingIndicator from "../UI/LoadingIndicator";
import Window from "../Window/Window";
import { Folder, Search, X } from "lucide-react";

// Named constants for window configuration (Naming Magic Numbers)
const PROJECTS_WINDOW_CONFIG = {
  INITIAL_SIZE: { width: 1000, height: 700 },
  MIN_SIZE: { width: 600, height: 400 },
  MAX_SIZE: { width: 1400, height: 900 },
  SEARCH_DEBOUNCE_MS: 300,
} as const;

// Named constants for styling (Relating Magic Numbers to Logic)
const PROJECTS_STYLING = {
  CONTAINER: "flex flex-col h-full bg-gray-50 dark:bg-gray-900",
  HEADER:
    "flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700",
  TITLE: "text-lg font-semibold text-gray-900 dark:text-gray-100",
  SEARCH_CONTAINER: "relative max-w-md",
  SEARCH_INPUT:
    "w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
  SEARCH_ICON:
    "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400",
  CLEAR_BUTTON:
    "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer",
  CONTENT: "flex-1 overflow-y-auto",
  GRID_CONTAINER: "grid grid-cols-1 lg:grid-cols-2 gap-6 p-6",
  EMPTY_STATE:
    "flex flex-col items-center justify-center h-full text-center p-8",
} as const;

interface ProjectsWindowProps {
  /** Whether the projects window is visible */
  isVisible: boolean;
  /** Whether the projects window is minimized */
  isMinimized: boolean;
  /** Callback when projects window is closed */
  onClose: () => void;
  /** Callback when projects window is minimized */
  onMinimize: () => void;
}

/**
 * Custom hook for projects data management - Scoping State Management
 * Reduces coupling by grouping projects data logic
 */
function useProjectsData() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/projects");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProjects(data.projects || []);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, isLoading, error };
}

/**
 * Custom hook for search functionality - Single Responsibility
 * Handles search state and filtering logic
 */
function useProjectSearch(projects: ProjectData[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>([]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredProjects(projects);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = projects.filter(
      (project) =>
        project.title.toLowerCase().includes(query) ||
        project.description?.toLowerCase().includes(query) ||
        project.tech.some((tech) => tech.name.toLowerCase().includes(query))
    );

    setFilteredProjects(filtered);
  }, [projects, searchQuery]);

  const clearSearch = () => setSearchQuery("");

  return { searchQuery, setSearchQuery, filteredProjects, clearSearch };
}

/**
 * Projects window header with search - Cohesion
 * Groups header functionality together
 */
function ProjectsHeader({
  searchQuery,
  onSearchChange,
  onClearSearch,
  totalProjects,
  filteredCount,
}: {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearSearch: () => void;
  totalProjects: number;
  filteredCount: number;
}) {
  return (
    <div className={PROJECTS_STYLING.HEADER}>
      <div className="flex items-center space-x-3">
        <Folder className="w-5 h-5 text-blue-500" />
        <h1 className={PROJECTS_STYLING.TITLE}>
          Projects{" "}
          {totalProjects > 0 && `(${filteredCount} of ${totalProjects})`}
        </h1>
      </div>

      <div className={PROJECTS_STYLING.SEARCH_CONTAINER}>
        <Search className={`w-4 h-4 ${PROJECTS_STYLING.SEARCH_ICON}`} />
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className={PROJECTS_STYLING.SEARCH_INPUT}
        />
        {searchQuery && (
          <X
            className={`w-4 h-4 ${PROJECTS_STYLING.CLEAR_BUTTON}`}
            onClick={onClearSearch}
          />
        )}
      </div>
    </div>
  );
}

/**
 * Projects grid component - Separating Code Paths for content display
 * Single Responsibility - Handles only projects grid rendering
 */
function ProjectsGrid({ projects }: { projects: ProjectData[] }) {
  if (projects.length === 0) {
    return (
      <div className={PROJECTS_STYLING.EMPTY_STATE}>
        <Folder className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
        <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">
          No projects found
        </h3>
        <p className="text-gray-400 dark:text-gray-500">
          Try adjusting your search query
        </p>
      </div>
    );
  }

  return (
    <div className={PROJECTS_STYLING.GRID_CONTAINER}>
      {projects.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </div>
  );
}

/**
 * Projects content component - Abstracting Implementation Details
 * Separates content logic from window wrapper
 */
function ProjectsContent({
  projects,
  isLoading,
  error,
  searchQuery,
  onSearchChange,
  onClearSearch,
  filteredProjects,
}: {
  projects: ProjectData[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearSearch: () => void;
  filteredProjects: ProjectData[];
}) {
  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingIndicator />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          Failed to Load Projects
        </h3>
        <p className="text-gray-500 dark:text-gray-400">{error}</p>
      </div>
    );
  }

  return (
    <div className={PROJECTS_STYLING.CONTAINER}>
      <ProjectsHeader
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onClearSearch={onClearSearch}
        totalProjects={projects.length}
        filteredCount={filteredProjects.length}
      />

      <div className={PROJECTS_STYLING.CONTENT}>
        <ProjectsGrid projects={filteredProjects} />
      </div>
    </div>
  );
}

/**
 * Projects Window application component
 * Features: project browsing, search, responsive grid, windowed interface
 * Cohesion - Groups projects window functionality together
 */
export function ProjectsWindow({
  isVisible,
  isMinimized,
  onClose,
  onMinimize,
}: ProjectsWindowProps) {
  const { projects, isLoading, error } = useProjectsData();
  const { searchQuery, setSearchQuery, filteredProjects, clearSearch } =
    useProjectSearch(projects);

  return (
    <Window
      isVisible={isVisible}
      isMinimized={isMinimized}
      title="Projects"
      onClose={onClose}
      onMinimize={onMinimize}
      initialSize={PROJECTS_WINDOW_CONFIG.INITIAL_SIZE}
      minSize={PROJECTS_WINDOW_CONFIG.MIN_SIZE}
      maxSize={PROJECTS_WINDOW_CONFIG.MAX_SIZE}
      className="font-sans"
      contentClassName="overflow-hidden"
    >
      <ProjectsContent
        projects={projects}
        isLoading={isLoading}
        error={error}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClearSearch={clearSearch}
        filteredProjects={filteredProjects}
      />
    </Window>
  );
}

export default ProjectsWindow;
