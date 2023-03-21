import { NextApiRequest, NextApiResponse } from "next";
import { TOKEN } from "../../../../../config/index";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { id } = req.query;

  const response = await fetch(
    `https://api.notion.com/v1/blocks/${id}/children?page_size=100`,
    {
      headers: {
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
  const data: any = await response.json();

  res.status(200).json(data);
}
