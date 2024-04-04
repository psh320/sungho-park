import ProjectItems from "@/components/Project/ProjectItem";
import NotionModal from "@/components/Project/ProjectPageModal";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import { TOKEN, DATABASE_ID } from "../../config/index";
import { projectsList } from "@/public/static/data";

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

export default function CityStocker() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center px-5 pt-24 mb-12">
      <h1 className="font-bold text-5xl">City Stocker</h1>
    </div>
  );
}
