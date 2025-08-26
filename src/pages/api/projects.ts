import { NextApiRequest, NextApiResponse } from "next";
import { getAllProjectsWithReadme } from "@/utils/projectUtils";

/**
 * API route to fetch all projects with README content
 * GET /api/projects - Returns all projects with their markdown content
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const projects = await getAllProjectsWithReadme();

    // Set cache headers for better performance
    res.setHeader(
      "Cache-Control",
      "s-maxage=3600, stale-while-revalidate=86400"
    );

    return res.status(200).json({ projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return res.status(500).json({ error: "Failed to fetch projects" });
  }
}
