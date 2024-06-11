import type { NextApiRequest, NextApiResponse } from "next";

import getPathSizeFromS3 from "@/utils/helpers/get_path_size_s3";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Folder path
  const folderPath: string = `${req.query.userId}/`;

  const result = await getPathSizeFromS3(folderPath);
  res.status(result.code).json({
    status: result.status,
    message: result.message,
    data: result.data,
  });
};

export default handler;
