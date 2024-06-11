/* eslint-disable */
import type * as AWS from "aws-sdk";
import { parse } from "url";
import type { NextApiRequest, NextApiResponse } from "next";
import s3 from "../../../utils/aws.config";

const fileExistsInS3 = async (key: string): Promise<boolean> => {
  const params: AWS.S3.HeadObjectRequest = {
    Bucket: "ellis-docs",
    Key: key,
  };

  return new Promise((resolve) => {
    s3.headObject(params, (err) => {
      if (err && err.code === "NotFound") {
        // File does not exist
        resolve(false);
      } else {
        // File exists or another error occurred
        resolve(true);
      }
    });
  });
};

const deleteFileFromS3 = async (url: string): Promise<string | null> => {
  const urlObj = parse(url);
  // Extract object key from the URL
  const key = urlObj.pathname?.substring(1);

  if (!key) {
    console.error("Invalid file URL");
    return url; // Return the original URL if it's invalid
  }

  const fileExists = await fileExistsInS3(key);
  
  if (!fileExists) {
    console.error("File does not exist in S3:", key);
    return url; // Return the original URL if the file does not exist
  }

  const params: AWS.S3.DeleteObjectRequest = {
    Bucket: "ellis-docs",
    Key: key,
  };

  return new Promise((resolve) => {
    s3.deleteObject(params, (err) => {
      if (err) {
        console.error(err);
        resolve(url); // Resolve with the URL if there was an error during deletion
      } else {
        resolve(null); // Resolve with null if deletion was successful
      }
    });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const removeFileUrls: string[] = req.body.removeFile || [];
    const deletePromises: Promise<string | null>[] = removeFileUrls.map((url) =>
      deleteFileFromS3(url)
    );

    // Wait for all delete promises to complete
    const failedDeletions = await Promise.all(deletePromises);

    // Filter out null values (successful deletions) and URLs where the file does not exist
    const failedUrls = failedDeletions.filter((url) => url !== null);

    if (failedUrls.length > 0) {
      res.status(500).json({
        message: "Some files failed to delete",
        failedUrls,
      });
    } else {
      res.status(200).json({
        message: "Files deleted successfully",
      });
    }
  } catch (error: any) {
    console.error("Error while handling file deletion:", error);
    res.status(500).send(error.message);
  }
}
