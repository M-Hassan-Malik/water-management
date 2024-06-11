import type AWS from "aws-sdk";

import s3 from "@/utils/aws.config";

interface IResponseObject {
  status: boolean;
  code: number;
  message: string;
  data: null | IStorage;
}

const getPathSizeFromS3 = async (
  folderPath: string
): Promise<IResponseObject> => {
  try {
    // Folder path

    // Parameters for listing objects in the specified folder
    const params: AWS.S3.ListObjectsRequest = {
      Bucket: "ellis-docs",
      Prefix: folderPath,
    };

    // Function to recursively list all objects in the folder
    const listObjects = async (
      _params: AWS.S3.ListObjectsRequest
    ): Promise<{ status: boolean; size: number }> => {
      let totalSize = 0;

      const data = await s3.listObjects(_params).promise();
      if (!data?.Contents?.length) return { status: false, size: totalSize };

      // Add size of each object to the total size
      for (const object of data.Contents || []) {
        totalSize += object.Size || 0;
      }

      // If there are more objects to list, continue recursively
      if (data.IsTruncated) {
        const nextParams: AWS.S3.ListObjectsRequest = {
          ..._params,
          Marker: data.NextMarker,
        };
        const tempResp = await listObjects(nextParams);
        totalSize + tempResp.size;
      }

      return { status: true, size: totalSize };
    };

    // Get the total size of the folder in bytes
    const { status, size } = await listObjects(params);
    if (!status)
      return {
        status,
        code: 404,
        message: "Path not found",
        data: null,
      };

    // Convert bytes to KB
    const folderSizeInKB = size / 1024;
    // Convert bytes to MB
    const folderSizeInMB = size / (1024 * 1024);
    // Convert bytes to MB
    const folderSizeInGB = size / (1024 * 1024 * 1024);

    return {
      status: true,
      code: 200,
      message: "Folder size retrieved successfully",
      data: {
        sizeInBytes: Number(size.toFixed(1)),
        sizeInKB: Number(folderSizeInKB.toFixed(1)),
        sizeInMB: Number(folderSizeInMB.toFixed(1)),
        sizeInGB: Number(folderSizeInGB.toFixed(1)),
      },
    };
  } catch (error: any) {
    return {
      status: false,
      code: 500,
      message: "Folder size retrieved successfully",
      data: null,
    };
  }
};

export default getPathSizeFromS3;
