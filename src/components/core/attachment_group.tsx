import { Box, Flex, Image, Input, useColorModeValue } from "@chakra-ui/react";
import type { StaticImageData } from "next/image";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

import { isImageOrVideoURL } from "@/utils/helpers/functions";
import getPathSizeFromS3 from "@/utils/helpers/get_path_size_s3";

import { Core } from "..";
import { Icons } from "../icons";

interface AttachmentGroupProps {
  attachments: any[];
  setAttachmentList: Dispatch<SetStateAction<StaticImageData[]>>;
  setUploadFiles: Dispatch<SetStateAction<File[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setRemoveFiles: Dispatch<SetStateAction<string[]>>;
  uploadFiles: File[];
}

const AttachmentGroup: React.FunctionComponent<AttachmentGroupProps> = ({
  attachments,
  setAttachmentList,
  setUploadFiles,
  uploadFiles,
  setRemoveFiles,
  setIsLoading,
}) => {
  const [fail, setFail] = useState<IAlertSuccessData>();
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const user: IUser = useSelector((state: any) => state.user.user);

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoader(true);
    setIsLoading(true);
    const selectedFiles: any = e.target.files;

    let totalFilesSizes = 0;
    const fileData = Array.from(selectedFiles);

    fileData.forEach((file: any) => {
      if (file?.size) {
        totalFilesSizes += file?.size || 0;
      } else {
        setFail({
          status: true,
          title: "Upload Failed",
          description: "Inappropriate image file",
        });
        setIsLoader(false);
        setIsLoading(false);
      }
    });

    // Get storage available in the S3
    const folderPath: string = `${user._id}/`;
    const pathResult = await getPathSizeFromS3(folderPath);

    if (pathResult.status && pathResult.data && user?.package?.sizeInGB) {
      // convert GB to Bytes and remove -ve sign
      const storageAvailableInBytes: number = Math.abs(
        user.package.sizeInGB * 1024 ** 3 - pathResult.data.sizeInBytes
      );
      if (storageAvailableInBytes < totalFilesSizes) {
        setFail({
          status: true,
          title: "Upload Failed",
          description:
            "You do not have sufficient space to upload the file of this size",
        });
        setIsLoader(false);
        setIsLoading(false);
        return;
      }
    }

    setUploadFiles((prev: any) => [...prev, ...fileData]);

    if (selectedFiles) {
      const updatedAttachments = [...attachments];

      for (let i = 0; i < selectedFiles.length; i++) {
        setIsLoader(true);
        setIsLoading(true);
        const file = selectedFiles[i];
        const reader = new FileReader(); // Create a new FileReader for each file

        reader.onload = (_e) => {
          const uploadedDataUrl = _e.target?.result as string;
          updatedAttachments.push(uploadedDataUrl);

          if (i === selectedFiles.length - 1) {
            setIsLoader(false);
            setIsLoading(false);

            setAttachmentList(updatedAttachments);
          }
        };

        // Read the file as a data URL
        if (file) {
          reader.readAsDataURL(file);
        }
      }
    }
  };

  const deleteFile = (attachment: string, index: number) => {
    const updatedAttachments = [...attachments];
    updatedAttachments.splice(index, 1); // Remove the attachment at the specified index
    setAttachmentList(updatedAttachments);

    const updatedUploadFiles = [...uploadFiles];
    updatedUploadFiles.splice(index, 1); // Remove the UploadFiles at the specified index
    setUploadFiles(updatedUploadFiles);

    // this will save the files that you wanna remove from S3 bucket
    setRemoveFiles((prev) => [...prev, attachment]);
  };

  return (
    <Flex gap={"8px"} flexWrap={"wrap"}>
      <Core.Alert show={fail} timeout={5000} theme="error" />
      {attachments.map((attachment, index) => {
        return (
          <Box key={index} position={"relative"}>
            {/* <Flex justifyContent={"flex-end"} pr={"5px"} pb="5px"> */}
            <Box
              onClick={() => deleteFile(attachment, index)}
              cursor={"pointer"}
              position={"absolute"}
              right={"10px"}
              top={"5px"}
              borderRadius={"15px"}
              bg={"white.100"}
              zIndex={10}
            >
              <Icons.RxCross2
                color="red"
                fontSize={"20px"}
                className="cursor-pointer rounded-[20px] p-[1px] hover:bg-[#f5c3c3]"
              />
            </Box>
            {/* </Flex> */}
            <Box
              key={index}
              borderRadius={"10px"}
              overflow={"hidden"}
              marginRight={"5px"}
              maxWidth={"150px"}
              height={"150px"}
            >
              {attachment?.startsWith("data:image/") ||
              isImageOrVideoURL(attachment) === "image" ? (
                <Image
                  src={attachment}
                  width="100%"
                  height="100%"
                  objectFit={"cover"}
                  alt="Attached Images"
                />
              ) : attachment?.startsWith("data:video/") ||
                isImageOrVideoURL(attachment) === "video" ? (
                <video
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  controls
                >
                  <source
                    src={attachment}
                    type={attachment.split(";")[0].split(":")[1]}
                  />
                  Your browser does not support the video tag.
                </video>
              ) : null}
            </Box>
          </Box>
        );
      })}
      {isLoader && (
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          width={"130px"}
          height={"130px"}
          borderRadius={"10px"}
          backgroundColor={"gray.200"}
          margin={"35px 10px 25px 10px"}
        >
          <Core.BtnSpinner />
        </Flex>
      )}
      <Flex justifyContent={"center"} alignItems={"center"} p={4}>
        <Flex
          w="6rem"
          h="6rem"
          justifyContent={"center"}
          alignItems={"center"}
          p={3}
          rounded="md"
          backgroundColor={"gray.200"}
          cursor={"pointer"}
          _hover={{
            boxShadow: useColorModeValue(
              "0 4px 6px rgba(160, 174, 192, 0.6)",
              "0 4px 6px rgba(9, 17, 28, 0.4)"
            ),
          }}
          position="relative"
        >
          <Input
            type="file"
            // id={`videoInput_${index}`}
            // name={`video_${index}`}
            height="100%"
            width="100%"
            border="2px solid blue"
            position="absolute"
            top="0"
            left="0"
            opacity="0"
            aria-hidden="true"
            accept="image/*,video/*"
            multiple
            zIndex={5}
            onChange={(e) => handleFileUpload(e)}
          />
          <Icons.IoMdAdd fontSize={"50px"} color="gray" />
        </Flex>
      </Flex>

      {/* {uploadedVideos[index] && (
                  <Box
                    maxWidth="210px"
                    width="100%"
                    height="120px"
                    maxHeight="120px"
                  >
                    <Core.Video
                      src={uploadedVideos[index]}
                      width="100%"
                      height="120px"
                    />
                  </Box>
                )}
                {!uploadedVideos[index] && (
                  <Box
                    maxWidth="210px"
                    width="100%"
                    height="120px"
                    maxHeight="120px"
                  >
                    <Image
                      src={videoPlaceholder.src}
                      fallbackSrc={videoPlaceholder.src}
                      width="100%"
                      height="120px"
                      rounded="5px"
                      alt="logo"
                      className="chakra-image"
                    />
                  </Box>
                )} */}
    </Flex>
  );
};

export default AttachmentGroup;
