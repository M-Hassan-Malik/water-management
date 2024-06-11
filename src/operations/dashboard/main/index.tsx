// import Link from "next/link";
import { Box } from "@chakra-ui/react";
import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  TimeScale,
  Title,
  Tooltip,
} from "chart.js";

import { Dashboard } from "@/components";

const UploaderMainView = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    Filler,
    LineElement,
    RadialLinearScale,
    TimeScale,
    BarController,
    BarElement,
    Title,
    ArcElement,
    Tooltip,
    Legend
  );

  const breadcrumb = [
    { label: "Waterpark Management", link: "/dashboard" },
    { label: "Dashboard" },
  ];

  return (
    <Box w="100%" p={4}>
      <Dashboard.DashboardHeader heading="Dashboard" breadcrumb={breadcrumb} />
      <Dashboard.DashboardListing />
    </Box>
  );
};

export default UploaderMainView;
