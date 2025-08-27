import Link from "next/link";
import { useState, useEffect } from "react";
import DarkModeToggleButton from "../UI/DarkModeToggleButton";

// Named constants for macOS-style header (Naming Magic Numbers)
const HEADER_HEIGHT = "h-8"; // macOS menu bar height
const HEADER_BACKGROUND = "bg-gray-100/80 dark:bg-gray-800/80"; // Semi-transparent
const HEADER_BACKDROP = "backdrop-blur-md"; // Glass effect
const HEADER_BORDER = "border-b border-gray-300/50 dark:border-gray-600/50";

/**
 * macOS-style desktop header component
 * Features: Apple menu, app name, system controls, glass effect
 * Positioned at the top of the desktop area (not absolute)
 */
export default function DesktopHeader() {
  const [showAppleMenu, setShowAppleMenu] = useState(false);

  return (
    <header
      className={`
        ${HEADER_HEIGHT} 
        ${HEADER_BACKGROUND} 
        ${HEADER_BACKDROP} 
        ${HEADER_BORDER}
        flex items-center justify-between 
        px-4 text-sm font-medium
        relative z-50
      `}
    >
      {/* Left side - Apple menu and app name */}
      <div className="flex items-center space-x-4">
        <AppleMenu
          isOpen={showAppleMenu}
          onToggle={() => setShowAppleMenu(!showAppleMenu)}
        />
        <span className="text-gray-900 dark:text-gray-100 font-semibold">
          Sungho Park
        </span>
        <DesktopMenuItems />
      </div>

      {/* Right side - System controls */}
      <div className="flex items-center space-x-3">
        <SystemControls />
      </div>
    </header>
  );
}

/**
 * Apple menu component - macOS style apple logo menu
 */
function AppleMenu({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center justify-center w-6 h-6 text-gray-900 dark:text-gray-100 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 rounded transition-colors"
        aria-label="Apple Menu"
      >
        <AppleLogo />
      </button>

      {isOpen && <AppleMenuDropdown onClose={() => onToggle()} />}
    </div>
  );
}

/**
 * Apple logo SVG component
 */
function AppleLogo() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-gray-900 dark:text-gray-100"
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

/**
 * Apple menu dropdown component
 */
function AppleMenuDropdown({ onClose }: { onClose: () => void }) {
  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Menu */}
      <div className="absolute top-full left-0 mt-1 w-48 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border border-gray-300/50 dark:border-gray-600/50 rounded-md shadow-lg z-50">
        <div className="py-1">
          <Link
            href="/"
            className="block px-4 py-2 text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
            onClick={onClose}
          >
            About Sungho Park
          </Link>
          <div className="border-t border-gray-300/50 dark:border-gray-600/50 my-1" />
          <Link
            href="/project"
            className="block px-4 py-2 text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
            onClick={onClose}
          >
            Projects
          </Link>
          <Link
            href="/cv.pdf"
            className="block px-4 py-2 text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
            onClick={onClose}
          >
            Resume
          </Link>
        </div>
      </div>
    </>
  );
}

/**
 * Desktop menu items - File, Edit, View, etc.
 */
function DesktopMenuItems() {
  return (
    <div className="hidden md:flex items-center space-x-4">
      <MenuButton>File</MenuButton>
      <MenuButton>Edit</MenuButton>
      <MenuButton>View</MenuButton>
      <MenuButton>Window</MenuButton>
      <MenuButton>Help</MenuButton>
    </div>
  );
}

/**
 * Menu button component
 */
function MenuButton({ children }: { children: string }) {
  return (
    <button className="px-2 py-1 text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 rounded transition-colors">
      {children}
    </button>
  );
}

/**
 * System controls - right side of header
 */
function SystemControls() {
  return (
    <div className="flex items-center space-x-2">
      <DarkModeToggleButton />
      <SystemTime />
    </div>
  );
}

/**
 * System time component
 */
function SystemTime() {
  const [time, setTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const timeString = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="text-sm text-gray-900 dark:text-gray-100 font-medium">
      {timeString}
    </div>
  );
}
