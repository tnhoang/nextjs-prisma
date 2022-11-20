import { prisma } from "../../../server/db/client";
import { PrismaClient } from "@prisma/client";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { postId } = req.query;

  console.log("Postid: " + postId);

  switch (method) {
    case "DELETE":
      //   use prisma to create a new post using that data
      const post = await prisma.post.delete({
        where: {
          id: Number(postId),
        },
      });
      res.status(200).json(post);
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
