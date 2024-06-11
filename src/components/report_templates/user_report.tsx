import { Avatar, Box, Flex, Stack, Text } from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";

import { HandleLogout } from "@/components/auth";
import { EScheduleType, ESubmissionStatus } from "@/graphql/generated/graphql";
import {
  ApproveReportSubmission,
  FindUserReportSubmissionById,
} from "@/services/api";

import { Core, ReportTemplate } from "..";
import { H2 } from "../core";
import { Icons } from "../icons";

interface IReportSubmission {
  _id: string;
  submissionDate?: string;
  status: string;
  date: Date;
  active?: boolean;
}

interface IUserReportProps {
  userReportId: string;
}

const UserReport: React.FC<IUserReportProps> = ({ userReportId }) => {
  // const [data, setData] = useState<ReportSubmittedData>();

  const [submissions, setSubmissions] = useState<IReportSubmission[]>();
  const user: IUser = useSelector((state: any) => state.user.user);
  const [data, setData] = useState<any>();
  const [userName, setUserName] = useState("");
  const [userProfilePic, setUserProfilePic] = useState("");
  const [facilityName, setFacilityName] = useState("");
  const [reportName, setReportName] = useState("");
  const [reportType, setReportType] = useState("");
  const [scheduleType, setScheduleType] = useState<EScheduleType>();
  const [allSubmissions, setAllSubmissions] = useState<any>();
  const [fail, setFail] = useState<IAlertSuccessData>();
  const [success, setSuccess] = useState<IAlertSuccessData>();
  const [currectSelectedSubmission, setCurrectSelectedSubmission] =
    useState("");

  const { refetch } = useQuery(
    "FindUserReport",
    () => FindUserReportSubmissionById({ reportId: userReportId }),
    {
      onSuccess({ findUserReportSubmissionById }) {
        if (findUserReportSubmissionById) {
          const submissionsData = findUserReportSubmissionById.submissions?.map(
            (item) => {
              return {
                _id: item?._id || "",
                submitted_data: item?.submitted_data,
                date: item?.date || new Date(),
                status: item?.status || "",
              };
            }
          );

          setSubmissions(submissionsData);

          if (findUserReportSubmissionById?.assignedToFacilityRef?.facility)
            setFacilityName(
              findUserReportSubmissionById.assignedToFacilityRef.facility
            );

          if (findUserReportSubmissionById?.assignedTo?.first_name)
            setUserName(
              `${findUserReportSubmissionById.assignedTo.first_name} ${findUserReportSubmissionById.assignedTo?.last_name}`
            );
          if (findUserReportSubmissionById?.assignedTo?.first_name)
            setUserProfilePic(
              `${findUserReportSubmissionById?.assignedTo?.photo_url}`
            );

          setReportName(findUserReportSubmissionById.title);
          setReportType(findUserReportSubmissionById?.reportType || "");
          setScheduleType(findUserReportSubmissionById.scheduleType);
        }
      },
      onError(_: any) {
        if (
          _?.response?.errors?.length &&
          _?.response?.errors[0]?.message === "Not Authorised!"
        )
          HandleLogout();
        console.log("error", _);
      },
      enabled: Boolean(userReportId),
      refetchOnMount: true,
    }
  );

  const { mutate: approveMutation } = useMutation(
    "approveReport",
    ApproveReportSubmission,
    {
      onSuccess: () => {
        setSuccess({
          status: true,
          title: "Success",
          description: "Report Submission Approved.",
        });
        refetch();
      },
      onError: (_: any) => {
        setFail({
          status: true,
          title: "Failed",
          description: _?.response?.errors[0]?.message,
        });
      },
    }
  );

  useEffect(() => {
    if (submissions) {
      const modifiedSubmissions = submissions.map(
        (submission: any, index: number) => ({
          ...submission,
          active: index === 0, // Set to true for the first submission, false for others
        })
      );
      setAllSubmissions(modifiedSubmissions);
      setData(submissions[0]);
    }
  }, [submissions]);

  const handleItemClick = (clickedItem: any, id: any) => {
    setCurrectSelectedSubmission(id);
    const updatedSubmissions = submissions?.map((submission: any) => ({
      ...submission,
      active: submission === clickedItem,
    }));
    setAllSubmissions(updatedSubmissions);
    setData(clickedItem);
  };
  return (
    <Flex justifyContent={"space-between"} maxWidth="1300px">
      <Core.Alert show={fail} theme="error" />
      <Core.Alert show={success} theme="success" />
      <Flex direction="column" pt={"60px"} rowGap={"30px"} maxWidth={"400px"}>
        {/* Assigned to */}

        {facilityName && (
          <Box>
            <Core.H6 color="textColor">Assigned To Facility:</Core.H6>
            <Stack
              display={"inline-flex"}
              direction={"row"}
              spacing={2}
              align={"center"}
              padding={"10px"}
              borderRadius={"10px"}
              backgroundColor={"white.100"}
              boxShadow={"0px 2px 5px 2px rgba(0,0,0,0.05)"}
              mt="10px"
            >
              <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                <Text fontWeight={600}>{facilityName}</Text>
              </Stack>
            </Stack>
          </Box>
        )}
        {userName && (
          <Box>
            <Core.H6 color="textColor">Assigned To User:</Core.H6>
            <Stack
              display={"inline-flex"}
              direction={"row"}
              spacing={2}
              align={"center"}
              padding={"10px"}
              borderRadius={"10px"}
              backgroundColor={"white.100"}
              boxShadow={"0px 2px 5px 2px rgba(0,0,0,0.05)"}
              mt="10px"
            >
              <Avatar
                src={
                  userProfilePic ||
                  "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                }
              />
              <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                <Text fontWeight={600}>{userName}</Text>
              </Stack>
            </Stack>
          </Box>
        )}

        {/* submissions */}
        <Box>
          <Core.H6 color="textColor">Submissions:</Core.H6>
          <Flex gap={"5px"} flexWrap={"wrap"} mt="10px">
            {allSubmissions?.map((value: any) => {
              return (
                <Box
                  key={String(value._id)}
                  // onClick={() => setData(value)}
                  onClick={() => handleItemClick(value, value._id)}
                  fontSize="sm"
                  color={
                    value._id === currectSelectedSubmission
                      ? "white.500"
                      : "gray.500"
                  }
                  fontWeight={"bold"}
                  display={"inline-block"}
                  alignItems={"center"}
                  borderRadius={"5px"}
                  cursor={"pointer"}
                  padding="5px 8px"
                  backgroundColor={
                    value._id === currectSelectedSubmission
                      ? "gray.500"
                      : "gray.200"
                  }
                  _hover={{
                    color: "white.500",
                    backgroundColor: "gray.500",
                  }}
                  transition={"all .3s ease"}
                >
                  <Flex justifyContent={"end"} my="3px">
                    <Core.Badge sm status={value.status}></Core.Badge>
                  </Flex>
                  {scheduleType !== EScheduleType.Always && (
                    <Text fontSize={"12px"}>
                      Date: {moment(value.date).format("MMMM Do YYYY")}
                    </Text>
                  )}
                </Box>
              );
            })}
          </Flex>
        </Box>
      </Flex>
      <Box ml={2}>
        {data?.status === ESubmissionStatus.Reviewing && (
          <Core.Button
            btnBlue
            leftIcon={<Icons.BiCheck />}
            size="sm"
            onClick={() => {
              if (user._id)
                approveMutation({
                  approverId: user._id,
                  assignedReportId: userReportId,
                  submissionId: data._id,
                });
            }}
            isDisabled={false}
          >
            Approve Submission!
          </Core.Button>
        )}
        <Box textAlign={"center"} mb={"20px"}>
          <H2>Preview</H2>
        </Box>
        {data?.submitted_data && (
          <ReportTemplate.ReportForm
            pageType="track"
            reportType={reportType}
            templateName={reportName}
            formFields={data?.submitted_data as IFormField[]}
          />
        )}
      </Box>
    </Flex>
  );
};

export default UserReport;
