import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

// Standardizing Return Types - consistent breadcrumb item structure
export interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface BreadcrumbProps {
  /** Array of breadcrumb items */
  items: BreadcrumbItem[];
  /** Custom separator icon */
  separator?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

// Named constants for styling (Naming Magic Numbers)
const BREADCRUMB_STYLING = {
  CONTAINER:
    "flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400",
  ITEM_ACTIVE: "text-gray-900 dark:text-gray-100 font-medium",
  ITEM_LINK: "hover:text-gray-700 dark:hover:text-gray-300 transition-colors",
  SEPARATOR: "text-gray-400 dark:text-gray-600",
  HOME_ICON_SIZE: 16,
} as const;

/**
 * Individual breadcrumb item component - Single Responsibility
 * Separating Code Paths - Different rendering for links vs active items
 */
function BreadcrumbItemComponent({
  item,
  isLast,
}: {
  item: BreadcrumbItem;
  isLast: boolean;
}) {
  // Named conditions for better readability
  const isActiveItem = item.isActive || isLast;
  const hasLink = item.href && !isActiveItem;

  const itemClasses = isActiveItem
    ? BREADCRUMB_STYLING.ITEM_ACTIVE
    : BREADCRUMB_STYLING.ITEM_LINK;

  // Handle home icon for first item
  const isHomeItem = item.label.toLowerCase() === "home" || item.href === "/";

  if (hasLink) {
    return (
      <Link href={item.href!} className={itemClasses}>
        {isHomeItem ? (
          <Home size={BREADCRUMB_STYLING.HOME_ICON_SIZE} />
        ) : (
          item.label
        )}
      </Link>
    );
  }

  return (
    <span className={itemClasses}>
      {isHomeItem ? (
        <Home size={BREADCRUMB_STYLING.HOME_ICON_SIZE} />
      ) : (
        item.label
      )}
    </span>
  );
}

/**
 * Breadcrumb separator component - Abstracting Implementation Details
 */
function BreadcrumbSeparator({ separator }: { separator?: React.ReactNode }) {
  return (
    <span className={BREADCRUMB_STYLING.SEPARATOR}>
      {separator || <ChevronRight size={14} />}
    </span>
  );
}

/**
 * Breadcrumb navigation component
 * Features: home icon, custom separators, active state, hover effects
 * Cohesion - Groups navigation breadcrumb functionality together
 */
export function Breadcrumb({
  items,
  separator,
  className = "",
}: BreadcrumbProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav
      className={`${BREADCRUMB_STYLING.CONTAINER} ${className}`}
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div
            key={`${item.href || item.label}-${index}`}
            className="flex items-center space-x-2"
          >
            <BreadcrumbItemComponent item={item} isLast={isLast} />
            {!isLast && <BreadcrumbSeparator separator={separator} />}
          </div>
        );
      })}
    </nav>
  );
}

/**
 * Helper function for creating common breadcrumb patterns
 * Standardizing Return Types - consistent helper interface
 */
export const createBreadcrumbs = {
  /**
   * Create breadcrumbs for project detail page
   */
  forProject: (projectTitle: string): BreadcrumbItem[] => [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: projectTitle, isActive: true },
  ],

  /**
   * Create breadcrumbs for projects list page
   */
  forProjects: (): BreadcrumbItem[] => [
    { label: "Home", href: "/" },
    { label: "Projects", isActive: true },
  ],

  /**
   * Create custom breadcrumbs
   */
  custom: (items: BreadcrumbItem[]): BreadcrumbItem[] => items,
};
