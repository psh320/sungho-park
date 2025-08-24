import { ProjectData } from "@/data/projects";
import React, { useState, useEffect, useCallback } from "react";
import ProjectDuration from "./ProjectDuration";
import Image from "next/image";
import ProjectTags from "./ProjectTags";
import ProjectSiteLink from "./ProjectSiteLink";
import ProjectGitLink from "./ProjectGitLink";
import ProjectDemoLink from "./ProjectDemoLink";
import ProjectAndroidLink from "./ProjectAndroidLink";
import ProjectIosLink from "./ProjectIosLink";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";

// Background colors for projects without cover images
const PROJECT_BACKGROUND_COLORS = [
  "bg-gradient-to-br from-blue-500 to-purple-600",
  "bg-gradient-to-br from-green-500 to-teal-600",
  "bg-gradient-to-br from-orange-500 to-red-600",
  "bg-gradient-to-br from-pink-500 to-rose-600",
  "bg-gradient-to-br from-indigo-500 to-blue-600",
  "bg-gradient-to-br from-purple-500 to-pink-600",
  "bg-gradient-to-br from-teal-500 to-green-600",
  "bg-gradient-to-br from-yellow-500 to-orange-600",
];

type Props = {
  project: ProjectData;
};

// Component for projects without images - shows title with gradient background
function ProjectModalPlaceholder({
  title,
  projectId,
}: {
  title: string;
  projectId: string;
}) {
  // Generate consistent color based on project ID
  const colorIndex =
    projectId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    PROJECT_BACKGROUND_COLORS.length;
  const backgroundClass = PROJECT_BACKGROUND_COLORS[colorIndex];

  return (
    <div
      className={`relative w-full h-96 rounded-xl border border-slate-200 dark:border-slate-600 overflow-hidden flex items-center justify-center ${backgroundClass}`}
    >
      <div className="text-center px-8">
        <h2 className="text-white text-5xl font-bold drop-shadow-lg mb-4">
          {title}
        </h2>
        <div className="w-24 h-1 bg-white bg-opacity-50 rounded-full mx-auto"></div>
        <p className="text-white text-lg mt-4 opacity-80">Project Preview</p>
      </div>
    </div>
  );
}

// Image Slider Component with navigation and keyboard support
function ProjectImageSlider({
  images,
  title,
  projectId,
}: {
  images: string[];
  title: string;
  projectId: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Navigation functions
  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (isLightboxOpen) {
        if (event.key === "ArrowLeft") {
          goToPrevious();
        } else if (event.key === "ArrowRight") {
          goToNext();
        } else if (event.key === "Escape") {
          setIsLightboxOpen(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isLightboxOpen, goToPrevious, goToNext]);

  if (!images || images.length === 0) {
    // Use custom placeholder with gradient background instead of generic image
    return <ProjectModalPlaceholder title={title} projectId={projectId} />;
  }

  return (
    <>
      {/* Main Slider */}
      <div className="relative w-full h-96 rounded-xl border border-slate-200 dark:border-slate-600 overflow-hidden group">
        <Image
          width={800}
          height={400}
          priority
          style={{ objectFit: "cover", height: "100%" }}
          className="w-full cursor-pointer transition-transform duration-300 group-hover:scale-105"
          src={images[currentIndex]}
          alt={`${title} screenshot ${currentIndex + 1}`}
          quality={80}
          onClick={() => setIsLightboxOpen(true)}
        />

        {/* Navigation Buttons - Only show if more than 1 image */}
        {images.length > 1 && (
          <>
            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black bg-opacity-50 px-2 py-1 rounded-full">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? "bg-white scale-125"
                      : "bg-white bg-opacity-50 hover:bg-opacity-75"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Click to expand indicator */}
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1">
          <Expand className="w-4 h-4" />
          <span>Click to expand</span>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[60] p-4"
          onClick={() => setIsLightboxOpen(false)}
          style={{ paddingTop: "80px" }} // Account for header height
        >
          <div
            className="relative w-full h-full max-w-7xl max-h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[currentIndex]}
              alt={`${title} screenshot ${currentIndex + 1}`}
              width={1400}
              height={900}
              className="max-w-full max-h-full object-contain rounded-lg"
              quality={90}
              style={{
                maxWidth: "calc(100vw - 2rem)",
                maxHeight: "calc(100vh - 120px)", // Account for header and padding
              }}
            />

            {/* Lightbox Navigation - Only show if more than 1 image */}
            {images.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-colors duration-200"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>

                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-colors duration-200"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            {/* Close Button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 transition-colors duration-200"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-sm">
                {currentIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export const ProjectModalHeader = ({ project }: Props) => {
  // Prepare images array - use screenshots if available, otherwise fallback to coverImage
  const images = (() => {
    if (project.screenshots && project.screenshots.length > 0) {
      return project.screenshots;
    }
    if (project.coverImage) {
      return [project.coverImage];
    }
    return [];
  })();

  return (
    <div className="my-4">
      <h1 className="text-4xl font-bold my-2">{project.title}</h1>
      <ProjectDuration duration={project.duration} />

      {/* Image Slider replacing the static image */}
      <ProjectImageSlider
        images={images}
        title={project.title}
        projectId={project.id}
      />

      <h2 className="font-semibold my-2">Tech Stacks</h2>
      <ProjectTags tags={project.tech} />
      <div className="flex flex-row items-center flex-wrap">
        {project.site && <ProjectSiteLink link={project.site} />}
        {project.github && <ProjectGitLink link={project.github} />}
        {project.demo && <ProjectDemoLink link={project.demo} />}
        {project.ios && <ProjectIosLink link={project.ios} />}
        {project.android && <ProjectAndroidLink link={project.android} />}
      </div>
      <div className="flex flex-col justify-center items-center my-8">
        <div className="border-2 w-12 rounded-md border-sky-200 dark:border-sky-700" />
      </div>
    </div>
  );
};
