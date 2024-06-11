/* eslint-disable */

// utils/chakraColorPlugin.js

import { useTheme } from "@chakra-ui/react";

const chakraColorPlugin = {
  id: "chakraColors",
  beforeDraw: (chart: any) => {
    const theme = useTheme();

    // Update background colors for datasets
    chart.data.datasets.forEach((dataset: any) => {
      if (dataset.backgroundColor === "blue.900") {
        dataset.backgroundColor = theme.colors.blue[500];
      } else if (dataset.backgroundColor === "green") {
        dataset.backgroundColor = theme.colors.green[500];
      } else if (dataset.backgroundColor === "orange.900") {
        dataset.backgroundColor = theme.colors.orange[500];
      }
      // Add more conditions for other colors as needed
    });
  },
};

export default chakraColorPlugin;
