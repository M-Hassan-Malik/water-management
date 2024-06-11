import type * as AWS from "aws-sdk";
import busboy from "busboy";
import type { NextApiRequest, NextApiResponse } from "next";

import s3 from "@/utils/aws.config";

export const config = {
  api: {
    bodyParser: false, // Disable built-in bodyParser
    sizeLimit: "200mb",
  },
};

async function uploadFileToS3(
  file: any,
  fileName: string,
  info: any
): Promise<AWS.S3.ManagedUpload.SendData> {
  const params: AWS.S3.PutObjectRequest = {
    Bucket: "ellis-docs",
    Key: `${fileName}.${info.mimeType.split("/")[1]}`,
    Body: file,
    ContentType: info.mimeType,
  };

  // Handle files with unsupported MIME types
  if (!params.ContentType) {
    // Set a default content type for unsupported files, like application/octet-stream
    params.ContentType = "application/octet-stream";
  }

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const bb = busboy({ headers: req.headers });

    const uploadPromises: Promise<AWS.S3.ManagedUpload.SendData>[] = [];

    bb.on("file", async (name, file, info) => {
      if (!name) {
        res.status(400).send("No field name found for the file upload.");
        return;
      }

      try {
        const uploadPromise = uploadFileToS3(file, name, info);
        uploadPromises.push(uploadPromise);
      } catch (error: any) {
        res.status(500).send(error.message);
      }
    });

    bb.on("finish", async () => {
      try {
        // Wait for all upload promises to complete
        const uploadResults = await Promise.all(uploadPromises);
        res.status(200).json({
          message: "Files uploaded successfully",
          results: uploadResults,
        });
      } catch (error: any) {
        res.status(500).send(error.message);
      }
    });

    // Handle busboy errors
    bb.on("error", (error: any) => {
      res.status(500).send(error.message);
    });

    req.pipe(bb);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export default handler;
