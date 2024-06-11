// import { useTheme } from "@chakra-ui/react";
import Head from "next/head";
import type { ReactElement } from "react";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

import { Core } from "@/components";
import {
  GetAllParks,
  GetAllSubscriptions,
  GetClientDashboardStats,
  GetFacilities,
  GetIncidentReportsForClientDashboardStats,
  GetPost,
  GetSuperAdminDashboardStats,
} from "@/services/api";

import {
  blueDefaultTheme,
  darkTheme,
  greenTheme,
  orangeDefaultTheme,
  purpleTheme,
  theme1,
  theme2,
  theme3,
} from "../../utils/AppConfig"; // Import your custom theme
import { HandleLogout } from "../auth";
import { Icons } from "../icons";

interface IDashboardListingProps {}
interface IStatsData {
  title: string;
  number: string;
  percentage: string;
  status: boolean;
  type: boolean;
  icon: ReactElement<any, any>;
  defaultName?: string;
  options?: any;
}

const DashboardListing: React.FC<IDashboardListingProps> = () => {
  // const theme = useTheme();

  const user: IUser = useSelector((state: any) => state.user.user);
  const isAdmin = useMemo(() => user.admin, [user.admin]);
  const [statsData, setStatsData] = useState<IStatsData[]>([]);

  const [statCardsData, setStatCardsData] = useState<any>();
  const [superAdminStatCardsData, setSuperAdminStatCardsData] = useState<any>();

  const [facilityId, setFacilityId] = useState<string>();
  const [facilityList, setFacilityList] =
    useState<{ _id: string; facility: string }[]>();

  const [dataSets, setDataSets] = useState<any>([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [clientAdminId, setClientAdminId] = useState<any>();
  const [clientAdminList, setClientAdminList] = useState<any>([]);

  const [packageId, setPackageId] = useState<any>();
  const [packageList, setPackageList] = useState<any>([]);
  const [messageBoxData, setMessageBoxData] = useState<{
    title: string;
    message: string;
  }>();

  const colors = ["#7070ff", "#DF7F1B", "#666666", "#990066"];

  useQuery(["GetAllParks"], () => GetAllParks(), {
    onSuccess({ getAllParks }) {
      setClientAdminList(getAllParks);
      setClientAdminId(getAllParks && getAllParks[0]?._id);
    },
    onError(_: any) {
      if (
        _?.response?.errors?.length &&
        _?.response?.errors[0]?.message === "Not Authorised!"
      )
        HandleLogout();
    },
    refetchOnMount: true,
  });

  // useQuery(["GetAllClientAdmins"], () => GetAllClientAdmins(), {
  //   onSuccess({ getAllClientAdmins }) {
  // setClientAdminList(getAllClientAdmins);
  // setClientAdminId(getAllClientAdmins && getAllClientAdmins[0]?._id);
  //   },
  //   onError(error) {
  //
  //   },
  //   refetchOnMount: true,
  // });

  useQuery(["GetAllSubscriptions"], () => GetAllSubscriptions(), {
    onSuccess({ getAllSubscriptions }) {
      setPackageList(getAllSubscriptions);
      setPackageId(getAllSubscriptions && getAllSubscriptions[0]?._id);
    },
    onError(_: any) {
      if (
        _?.response?.errors?.length &&
        _?.response?.errors[0]?.message === "Not Authorised!"
      )
        HandleLogout();
    },
    refetchOnMount: true,
  });

  useQuery(
    ["GetSuperAdminDashboardStats1", packageId, clientAdminId],
    () =>
      GetSuperAdminDashboardStats({
        clientAdminId: clientAdminId as unknown as string,
        packageId: packageId as unknown as string,
      }),
    {
      onSuccess({ getSuperAdminDashboardStats }) {
        setSuperAdminStatCardsData(getSuperAdminDashboardStats);
      },
      onError(_: any) {
        if (
          _?.response?.errors?.length &&
          _?.response?.errors[0]?.message === "Not Authorised!"
        )
          HandleLogout();
      },
      enabled:
        (user.admin || !user.company._id) &&
        Boolean(clientAdminId) &&
        Boolean(packageId),
      refetchOnMount: true,
    }
  );

  useQuery(
    ["GetClientDashboardStats", facilityId],
    () =>
      GetClientDashboardStats({
        userId: user._id as any,
        facilityId: facilityId as string,
      }),
    {
      onSuccess({ getClientDashboardStats }) {
        setStatCardsData(getClientDashboardStats);
      },
      onError(_: any) {
        if (
          _?.response?.errors?.length &&
          _?.response?.errors[0]?.message === "Not Authorised!"
        )
          HandleLogout();
      },
      enabled: Boolean(user?.company?._id) && Boolean(facilityId),
      refetchOnMount: true,
    }
  );

  useQuery(
    "getFacilitiesForDashboardStats",
    () => GetFacilities({ userId: user._id || "" }),
    {
      onSuccess({ getFacilities }) {
        setFacilityList(
          getFacilities.map((_) => ({
            _id: String(_._id),
            facility: String(_.facility),
          }))
        );
        setFacilityId(getFacilities && String(getFacilities[0]?._id));
      },
      onError(_: any) {
        if (
          _?.response?.errors?.length &&
          _?.response?.errors[0]?.message === "Not Authorised!"
        )
          HandleLogout();
      },
      enabled: Boolean(user?.company?._id),
      refetchOnMount: true,
    }
  );

  useQuery(
    ["GetIncidentReportsForClientDashboardStats", startDate, endDate],
    () =>
      GetIncidentReportsForClientDashboardStats({
        userId: user._id as string,
        filter: {
          startDate,
          endDate,
          reportType: "INCIDENT",
        },
      }),
    {
      onSuccess({ getIncidentReportsForClientDashboardStats: reportData }) {
        if (reportData) {
          const chartData = reportData.map((v, i) => {
            return {
              label: `Week ${v?._id}`,
              data: v?.dailyCounts,
              borderColor: colors[i],
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            };
          });

          setDataSets(chartData);
        }
      },
      onError(_: any) {
        if (
          _?.response?.errors?.length &&
          _?.response?.errors[0]?.message === "Not Authorised!"
        )
          HandleLogout();
      },
      enabled: Boolean(user?.company?._id),
      refetchOnMount: true,
    }
  );

  useQuery("getPost", () => GetPost(), {
    onSuccess({ getPost }) {
      setMessageBoxData({
        title: getPost.data?.title || "",
        message: getPost.data?.message || "",
      });
    },
    onError(_: any) {
      if (
        _?.response?.errors?.length &&
        _?.response?.errors[0]?.message === "Not Authorised!"
      )
        HandleLogout();
    },
    enabled: !user.company._id,
    refetchOnMount: true,
  });

  const setUserTheme = () => {
    if (user?.themeId === "green") {
      return greenTheme;
    }
    if (user?.themeId === "purple") {
      return purpleTheme;
    }
    if (user?.themeId === "dark") {
      return darkTheme;
    }
    if (user?.themeId === "theme1") {
      return theme1;
    }
    if (user?.themeId === "theme2") {
      return theme2;
    }
    if (user?.themeId === "theme3") {
      return theme3;
    }
    if (user.admin) {
      return blueDefaultTheme;
    }
    return orangeDefaultTheme;
  };

  const chosenTheme = useMemo(() => setUserTheme(), [user?.themeId]);

  function createGradient(startColor: string, endColor: string) {
    const ctx: any = document.createElement("canvas").getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, startColor);
    gradient.addColorStop(1, endColor);
    return gradient;
  }

  const chartsData = user?.company?._id
    ? [
        {
          chartName: "Bar",
          data: {
            labels: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
            datasets: [
              {
                label: user.admin ? "Label" : "Tasks",
                data: [3, 10, 20, 16, 12, 10, 20, 23, 27, 25, 30, 46],
                // backgroundColor: ["black", "red", "orange", "blue"],
                // backgroundColor: "rgba(223, 127, 27,0.8)",
                // backgroundColor: theme.colors.blue[100],
                // borderColor: ["black", "red", "green", "purple"],
                // tension: 0.6,
                // fill: true,

                backgroundColor: createGradient(
                  chosenTheme.colors.blue[40],
                  chosenTheme.colors.orange[900]
                ),
              },
            ],
          },
          options: {},
          dates: true,
        },
        {
          chartName: "Line",
          data: {
            labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            // datasets: [
            //   {
            //     label: user.admin ? "Label" : "Incident Reports",
            //     data: [20, 30, 40, 36, 55, 60],
            //     tension: 0.4,
            //     fill: true,
            //     backgroundColor: createGradient(
            //       chosenTheme.colors.blue[40],
            //       chosenTheme.colors.blue[900]
            //     ),
            //     // borderColor: theme.colors.blue[500],
            //   },
            // ],

            datasets:
              user?.company?._id && dataSets.length
                ? dataSets
                : [
                    {
                      label: "Week 1",
                      data: [0, 0, 0, 0],
                      borderColor: "rgb(255, 99, 132)",
                      backgroundColor: "rgba(255, 99, 132, 0.5)",
                    },
                    {
                      label: "Week 2",
                      data: [0, 0, 0, 0],
                      borderColor: "rgb(53, 162, 235)",
                      backgroundColor: "rgba(53, 162, 235, 0.5)",
                    },
                    {
                      label: "Week 2",
                      data: [0, 0, 0, 0],
                      borderColor: "rgb(53, 162, 135)",
                      backgroundColor: "rgba(53, 162, 235, 0.5)",
                    },
                  ],
          },
          options: {},
          dates: true,
        },
      ]
    : [
        {
          chartName: "Bar",
          data: {
            labels: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
            datasets: [
              {
                label: user.admin ? "Label" : "Tasks",
                data: [3, 10, 20, 16, 12, 10, 20, 23, 27, 25, 30, 46],
                // backgroundColor: ["black", "red", "orange", "blue"],
                // backgroundColor: "rgba(223, 127, 27,0.8)",
                // backgroundColor: theme.colors.blue[100],
                // borderColor: ["black", "red", "green", "purple"],
                // tension: 0.6,
                // fill: true,

                backgroundColor: createGradient(
                  chosenTheme.colors.blue[40],
                  chosenTheme.colors.blue[900]
                ),
              },
            ],
          },
          options: {},
          dates: true,
        },
      ];

  useEffect(() => {
    if (user.admin || !user.company._id)
      setStatsData([
        {
          title: "Accounts",
          number:
            typeof superAdminStatCardsData?.accountsCount === "number"
              ? superAdminStatCardsData.accountsCount
              : undefined,
          percentage: "0",
          status: false,
          type: false,
          icon: <Icons.RiAccountPinBoxFill />,
        },
        {
          title: "Client for current month",
          number:
            typeof superAdminStatCardsData?.newClientsOfCurrentMonth ===
            "number"
              ? superAdminStatCardsData.newClientsOfCurrentMonth
              : undefined,
          percentage: "29",
          status: false,
          type: false,
          icon: <Icons.RiCustomerService2Fill />,
        },
        {
          title: "Total Facilities",
          number:
            typeof superAdminStatCardsData?.facilityCount === "number"
              ? superAdminStatCardsData.facilityCount
              : undefined,
          percentage: "50",
          status: true,
          type: false,
          icon: <Icons.FaHandHoldingUsd />,
        },
        {
          title: "Active Users",
          number:
            typeof superAdminStatCardsData?.activeUsersCount === "number"
              ? superAdminStatCardsData.activeUsersCount
              : undefined,
          percentage: "20",
          status: false,
          type: false,
          icon: <Icons.HiUsers />,
        },
        {
          title: "Users",
          number:
            typeof superAdminStatCardsData?.usersCountAccordingClientAdmin ===
            "number"
              ? superAdminStatCardsData.usersCountAccordingClientAdmin
              : undefined,
          percentage: "20",
          status: false,
          type: false,
          options: clientAdminList || [],
          defaultName: "By Account",
          icon: <Icons.HiUsers />,
        },
        {
          title: "Users",
          number:
            typeof superAdminStatCardsData?.usersCountBySubscription ===
            "number"
              ? superAdminStatCardsData.usersCountBySubscription
              : undefined,
          percentage: "0",
          status: false,
          type: false,
          options: packageList || [],
          defaultName: "By Subscription",
          icon: <Icons.HiUsers />,
        },
      ]);
    else
      setStatsData([
        {
          title: "Users",
          number:
            typeof statCardsData?.usersCountAccordingFacility === "number"
              ? statCardsData.usersCountAccordingFacility
              : undefined,
          percentage: "20",
          status: false,
          type: false,
          options: facilityList || [],
          defaultName: "By Facility",
          icon: <Icons.HiUsers />,
        },
        {
          title: "Pending Tasks",
          number:
            typeof statCardsData?.taskPendingCount === "number"
              ? statCardsData.taskPendingCount
              : undefined,
          percentage: "50",
          status: true,
          type: false,
          icon: <Icons.FaTasks />,
        },
        {
          title: "Completed Tasks",
          number:
            typeof statCardsData?.taskCompletedCount === "number"
              ? statCardsData.taskCompletedCount
              : undefined,
          percentage: "50",
          status: true,
          type: false,
          icon: <Icons.FaTasks />,
        },
        {
          title: "Pending Reports",
          number:
            typeof statCardsData?.reportPendingCount === "number"
              ? statCardsData.reportPendingCount
              : undefined,
          percentage: "50",
          status: true,
          type: false,
          icon: <Icons.HiDocumentReport />,
        },
        {
          title: "Completed Reports",
          number:
            typeof statCardsData?.reportCompletedCount === "number"
              ? statCardsData.reportCompletedCount
              : undefined,
          percentage: "50",
          status: true,
          type: false,
          icon: <Icons.HiDocumentReport />,
        },
        {
          title: "Completed Trainings",
          number:
            typeof statCardsData?.trainingSessionCount === "number"
              ? statCardsData.trainingSessionCount
              : undefined,
          percentage: "50",
          status: true,
          type: false,
          icon: <Icons.FaTasks />,
        },
      ]);
  }, [
    isAdmin,
    statCardsData,
    superAdminStatCardsData,
    clientAdminList,
    facilityList,
  ]);

  return (
    <>
      <Head>
        <title>Dashboard | Ellis Docs</title>
      </Head>
      {messageBoxData?.title && <Core.MessageBox data={messageBoxData} />}
      <Core.StatsGroup
        statsData={statsData}
        setClientAdminId={setClientAdminId}
        setPackageId={setPackageId}
        setFacilityId={setFacilityId}
      />
      <Core.ChartsGroup
        chartsData={chartsData}
        chosenTheme={chosenTheme}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
    </>
  );
};

export default DashboardListing;
