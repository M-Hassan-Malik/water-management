import { Box, Card, Flex, Heading } from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Core } from "..";
import Alert from "../core/alert";
import { Icons } from "../icons";

interface DocumentsProps {}

const getFileTypeIcon = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase().split("?x")[0];

  // FaRegFilePdf, BsFiletypeCsv,BsFiletypeDocx
  switch (extension) {
    case "txt":
      return <Icons.BsFiletypeTxt size={"26px"} color="orange.500" />;
    case "pdf":
      return (
        <span className="text-orange.500 text-[orange.500]">
          <Icons.FaRegFilePdf color="orange.500" size={"26px"} />
        </span>
      );
    case "csv":
      return <Icons.BsFiletypeCsv size={"26px"} />;
    case "excel":
      return <Icons.SiMicrosoftexcel size={"26px"} />;
    case "doc":
      return <Icons.BsFiletypeDocx size={"26px"} />;
    case "docx":
      return <Icons.BsFiletypeDocx size={"26px"} />;
    default:
      return <Icons.FaRegFile size={"26px"} />;
  }
};

const getFileNameFromUrl = (url: string) => {
  const decodedUrl: string | undefined = decodeURIComponent(url);
  const splitUrl: string = decodedUrl?.split("?X")[0] as string;
  if (splitUrl) {
    const urlWithUniqueCode = splitUrl.substring(splitUrl.lastIndexOf("/") + 1);
    return urlWithUniqueCode.split("_-_-_")[1] as string;
  }
  return "unknown";
};

const DocumentsList: React.FC<DocumentsProps> = () => {
  const user: IUser = useSelector((state: any) => state.user.user);
  const [fail, setFail] = useState<IAlertSuccessData>();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.FRONT_END_URL}/api/s3/get-path-files?folderPath=${String(
          user._id
        )}/documents/`
      )
      .then((response) => {
        if (response.status !== 200)
          setFail({
            status: true,
            title: "Failed",
            description:
              response.data.message || "Unable to fetch files from folder",
          });
        else if (!response.data.data.length)
          setFail({
            status: true,
            title: "Failed",
            description: "Unable to fetch files from folder",
          });
        else setFiles(response.data.data);
      });
  }, []);

  const deleteDoc = (url: string, i: number) => {
    console.log("delete this", url, "--", i);
  };

  return (
    <Flex flexWrap={"wrap"} flexDirection={"column"} rowGap={"8px"}>
      <Alert show={fail} theme="error" timeout={5000} />
      {files?.map((url, i: number) => (
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          columnGap={"20px"}
          key={url + i}
        >
          <Box width={"100%"}>
            <Link href={url} target="_blank">
              <Card
                key={i}
                padding="3"
                // borderWidth="1px"
                borderRadius="md"
                boxShadow="md"
                backgroundColor={"white.200"}
                // display={"block"}
                width={"100%"}
                // marginY={"3px"}
              >
                <Flex
                  columnGap={"3px"}
                  alignItems={"center"}
                  textAlign="center"
                >
                  {getFileTypeIcon(url)}
                  <Heading as="h3" size="sm" mt="2">
                    {getFileNameFromUrl(url)}
                  </Heading>
                </Flex>
                {/* <Box textAlign="center">Open File</Box> */}
              </Card>
            </Link>
          </Box>
          <Core.IconicButton
            button={"Delete"}
            onClick={() => deleteDoc(url, i)}
          />
        </Flex>
      ))}
    </Flex>
  );
};

export default DocumentsList;
