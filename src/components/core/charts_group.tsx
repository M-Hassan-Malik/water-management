/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prettier/prettier */
import { Box, Flex, Input, Tooltip, useMediaQuery } from "@chakra-ui/react";
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
} from "chart.js";
import * as React from "react";
import {
  Bar,
  Bubble,
  Doughnut,
  Line,
  Pie,
  PolarArea,
  Radar,
  Scatter,
} from "react-chartjs-2";

import { darkTheme } from "@/utils/AppConfig";
// import { Core } from "..";

interface IChartsGroupProps {
  chartsData: any;
  chosenTheme: Record<string, any>;
  setStartDate: Function;
  setEndDate: Function;
}

const ChartsGroup: React.FunctionComponent<IChartsGroupProps> = ({
  chartsData,
  chosenTheme,
  setStartDate,
  setEndDate,
}) => {
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
    Legend
  );
  const [isMobileScreen] = useMediaQuery("(max-width: 640px)");
  return (
    <Flex
      width={"100%"}
      flexWrap={"wrap"}
      columnGap={"1%"}
      rowGap={"20px"}
      className="charts-main"
    >
      {chartsData?.map((chartData: any, index: any) => {
        return (
          <Box
            key={index * 8}
            className="chart-box"
            borderRadius="10px"
            padding="10px"
            boxShadow="0px 2px 5px 2px rgba(0,0,0,0.05)"
            backgroundColor={
              chosenTheme === darkTheme ? "blue.900" : "white.100"
            }
          >
            {chartData.chartName === "Bar" ? (
              <Bar
                key={index * 4}
                data={chartData.data}
                options={chartData.options}
              />
            ) : (
              ""
            )}
            {chartData.chartName === "Line" ? (
              <>
                <Flex justifyContent={"space-between"}>
                  {chartData?.dates ? (
                    <Tooltip label={"Start Date"}>
                      <Input
                        variant="outline"
                        size="xs"
                        textTransform={"uppercase"}
                        maxW={isMobileScreen ? "100%" : "185px"}
                        opacity={0.8}
                        borderRadius={"5px"}
                        padding={"15px 10px"}
                        type="datetime-local"
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </Tooltip>
                  ) : (
                    ""
                  )}
                  <span className="text-[13px] font-bold">Incident Reports</span>
                  <Tooltip label={"End Date"}>
                    {chartData?.dates ? (
                      <Input
                        variant="outline"
                        size="xs"
                        textTransform={"uppercase"}
                        maxW={isMobileScreen ? "100%" : "185px"}
                        opacity={0.8}
                        borderRadius={"5px"}
                        padding={"15px 10px"}
                        type="datetime-local"
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    ) : (
                      ""
                    )}
                  </Tooltip>
                </Flex>
                <Line
                  key={index * 4}
                  data={chartData.data}
                  options={chartData.options}
                />
              </>
            ) : (
              ""
            )}
            {chartData.chartName === "Scatter" ? (
              <Scatter
                key={index * 4}
                data={chartData.data}
                options={chartData.options}
              />
            ) : (
              ""
            )}
            {chartData.chartName === "Bubble" ? (
              <Bubble
                key={index * 4}
                data={chartData.data}
                options={chartData.options}
              />
            ) : (
              ""
            )}
            {chartData.chartName === "Radar" ? (
              <Radar
                key={index * 4}
                data={chartData.data}
                options={chartData.options}
              />
            ) : (
              ""
            )}
            {chartData.chartName === "Doughnut" ? (
              <Doughnut
                key={index * 4}
                data={chartData.data}
                options={chartData.options}
              />
            ) : (
              ""
            )}
            {chartData.chartName === "PolarArea" ? (
              <PolarArea
                key={index * 4}
                data={chartData.data}
                options={chartData.options}
              />
            ) : (
              ""
            )}
            {chartData.chartName === "Pie" ? (
              <Pie
                key={index * 4}
                data={chartData.data}
                options={chartData.options}
              />
            ) : (
              ""
            )}
          </Box>
        );
      })}
    </Flex>
  );
};

export default ChartsGroup;
