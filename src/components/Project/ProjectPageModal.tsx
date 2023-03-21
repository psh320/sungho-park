import { ProjectType } from "@/pages/project";
import { useState, useEffect, useMemo } from "react";
import { TOKEN, DATABASE_ID } from "../../config/index";
import { LoadingIndicator } from "../Common/LoadingIndicator";
import Image from "next/image";
import ProjectDuration from "./ProjectDuration";
import ProjectTags from "./ProjectTags";
import ProjectSiteLink from "./ProjectSiteLink";
import ProjectGitLink from "./ProjectGitLink";
import ProjectDemoLink from "./ProjectDemoLink";
import ProjectIosLink from "./ProjectIosLink";
import ProjectAndroidLink from "./ProjectAndroidLink";
import { ProjectModalHeader } from "./ProjectModalHeader";

interface Props {
  pageId: string;
  project: ProjectType | null;
  visible: boolean;
  onClose: () => void;
}

const NOTION_API_KEY = TOKEN;

const NotionModal: React.FC<Props> = ({
  pageId,
  visible,
  onClose,
  project,
}) => {
  const [pageContent, setPageContent] = useState<any | null>(null);

  const handleOk = () => {
    onClose();
    setPageContent(null);
  };

  const handleCancel = () => {
    onClose();
    setPageContent(null);
  };

  const memoizedContent = useMemo(() => {
    if (!pageContent) return null;
    return pageContent;
  }, [pageContent]);

  const renderPageContent = () => {
    const results = memoizedContent.results;
    if (!results) {
      return null;
    }
    return results.map((result: any) => {
      switch (result.type) {
        case "paragraph":
          return (
            <p
              key={result.id}
              className="text-slate-700 dark:text-gray-200 my-2"
            >
              {result.paragraph.rich_text.length === 0 ? (
                <div className="my-6" />
              ) : (
                result.paragraph.rich_text
                  .map((text: any) => text.plain_text)
                  .join("")
              )}
            </p>
          );
        case "heading_1":
          return (
            <h1 key={result.id} className="font-extrabold text-4xl my-2">
              {result.heading_1.rich_text
                .map((text: any) => text.plain_text)
                .join("")}
            </h1>
          );
        case "heading_2":
          return (
            <h2 key={result.id} className="font-semibold text-2xl my-2">
              {result.heading_2.rich_text
                .map((text: any) => text.plain_text)
                .join("")}
            </h2>
          );
        case "heading_3":
          return (
            <h3 key={result.id} className="font-semibold text-lg my-2">
              {result.heading_3.rich_text
                .map((text: any) => text.plain_text)
                .join("")}
            </h3>
          );

        case "divider":
          return <div key={result.id} className="border-b w-full my-6"></div>;

        case "bulleted_list_item":
          return (
            <li key={result.id} className="my-2">
              {result.bulleted_list_item.rich_text
                .map((text: any) => text.plain_text)
                .join("")}
            </li>
          );

        case "image":
          return (
            <Image
              width={1000}
              height={0}
              priority
              style={{ objectFit: "contain", maxHeight: 400 }}
              className="rounded-t-xl"
              src={result.image.file.url}
              alt="project image"
              quality={50}
            />
          );

        default:
          return null;
      }
    });
  };

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        const response = await fetch(`/api/notion/blocks/${pageId}`, {
          headers: {
            "Notion-Version": "2022-06-28",
            "Content-Type": "application/json",
            Authorization: `Bearer ${NOTION_API_KEY}`,
          },
          mode: "cors",
        });
        const data: any = await response.json();
        setPageContent(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (visible) {
      fetchPageContent();
    }
  }, [pageId, visible]);

  return visible ? (
    <div className="modal">
      <div className="modal-backdrop" onClick={handleCancel}></div>
      <div className="modal-content dark:bg-slate-800 bg-white">
        {project ? <ProjectModalHeader project={project} /> : <></>}
        {memoizedContent ? renderPageContent() : <LoadingIndicator />}

        <div onClick={handleOk} className="fixed top-4 right-4 cursor-pointer">
          <svg
            className="h-8 w-8 text-gray-500 dark:text-gray-200"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
      </div>
    </div>
  ) : null;
};

export default NotionModal;
