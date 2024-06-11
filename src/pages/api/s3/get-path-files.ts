/* eslint-disable */
import type * as AWS from "aws-sdk";
import { ListObjectsOutput } from "aws-sdk/clients/s3";
import type { NextApiRequest, NextApiResponse } from "next";
import s3 from "../../../utils/aws.config";

interface IResponseObject {
  status: boolean;
  code: number;
  message: string;
  data: null | string[];
}

const listFilesInS3Folder = async (folderPath: string): Promise<string[]> => {
  const params: AWS.S3.ListObjectsV2Request = {
    Bucket: "ellis-docs",
    Prefix: folderPath,
  };

  return new Promise((resolve, reject) => {
    s3.listObjectsV2(params, (err, data: ListObjectsOutput) => {
      if (err) {
        reject(err);
      } else {
        const fileUrls = data.Contents?.map((file) => {
          return s3.getSignedUrl("getObject", {
            Bucket: "ellis-docs",
            Key: file.Key!,
          });
        });
        resolve(fileUrls || []);
      }
    });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const folderPath: string = req.query.folderPath as string;
    if (!folderPath)
      return res.status(400).json({
        message: "Folder path is required",
        data: null,
      } as IResponseObject);

    const fileUrls = await listFilesInS3Folder(folderPath);

    res.status(200).json({
      message: "Success",
      data: fileUrls,
    } as IResponseObject);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      data: null,
    } as IResponseObject);
  }
}
