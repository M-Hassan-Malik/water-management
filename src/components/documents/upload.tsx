import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import { getUniqueNumberDynamic } from "@/utils/helpers/functions";

import { Alert, LoadingComponent } from "../core";
import { Icons } from "../icons";

const UploadFilesButton: React.FC = () => {
  const user: IUser = useSelector((state: any) => state.user.user);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [isFileUploading, setIsFileUploading] = useState<boolean>(false);
  const [fail, setFail] = useState<IAlertSuccessData>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) setSelectedFiles(event.target.files);
  };

  const handleUpload = async () => {
    setIsFileUploading(true);
    if (selectedFiles) {
      const formData = new FormData();
      Array.from(selectedFiles).forEach((file) => {
        const fileName = `${
          user._id
        }/documents/${getUniqueNumberDynamic()}_-_-_${file.name}`; // _-_-_ is unique is separation between actual file name
        formData.append(fileName, file);
      });

      try {
        const response = await axios.post(
          `${process.env.FRONT_END_URL}/api/s3/uploadFile`,
          formData
        );
        if (response.status !== 200)
          setFail({
            status: true,
            title: "Upload Failed",
            description: "Unable to upload files",
          });

        setIsFileUploading(false);
        setSelectedFiles(null);
      } catch (error: any) {
        setIsFileUploading(false);
        setSelectedFiles(null);
        setFail({
          status: true,
          title: "Failed",
          description: error?.message || "Something went wrong",
        });
        console.error("Error uploading files:", error);
      }
    }
  };

  return (
    <Box>
      <Alert show={fail} theme="error" timeout={5000} />
      {isFileUploading && (
        <Flex
          position={"absolute"}
          justify={"center"}
          p={"100px"}
          m={"-10px"}
          height={"100%"}
          width={"100%"}
          zIndex={20}
          bgColor={"rgba(0,0,0,0.3)"}
          rounded={"10px"}
        >
          <LoadingComponent
            minH={"0"}
            text={" Please wait, Processing File..."}
          />
        </Flex>
      )}
      {/* <Button onClick={handleUpload} disabled={!selectedFiles}>
        Being Upload
      </Button> */}
      {/* <Input mt="2" type="file" multiple onChange={handleFileChange} /> */}
      <label
        htmlFor="uploadFile1"
        className="h-46 mt-2 flex w-full max-w-[300px] cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed border-gray-300 bg-white py-[20px] font-[sans-serif]   text-black"
      >
        <Icons.RiUploadCloud2Fill fontSize={"50px"} />
        Upload file
        <Input
          id="uploadFile1"
          mt="2"
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        {/* <input type="file" id='uploadFile1' className="hidden" /> */}
        <p className="mt-2 text-xs text-gray-400">
          txt, pdf, csv, excel, doc and docx are Allowed.
        </p>
      </label>

      <Text mt={2} fontSize="sm" color="gray.500">
        {`Select file(s) to upload`}
      </Text>

      {selectedFiles && selectedFiles?.length > 0 && (
        <Button
          onClick={handleUpload}
          disabled={!selectedFiles || isFileUploading}
          colorScheme="blue"
          mt={4}
        >
          {isFileUploading ? "Uploading..." : "Start Uploading"}
        </Button>
      )}
    </Box>
  );
};

export default UploadFilesButton;
