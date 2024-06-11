import { Box, Card, Flex, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

import { ReportTemplate } from "@/components";
import { EReportType } from "@/graphql/generated/graphql";

interface ITrackReportTemplatesProps {}

interface ITableViewList {
  name: string;
  value: string;
}

const tableViewList: ITableViewList[] = [
  {
    name: "Template",
    value: "template",
  },
  {
    name: "Tracking",
    value: "tracking",
  },
];

const InServiceTables: React.FC<ITrackReportTemplatesProps> = () => {
  const { query } = useRouter();
  const [viewBy, setViewBy] = useState<ITableViewList>(
    query.table === "tracking"
      ? {
          name: "Tracking",
          value: "tracking",
        }
      : {
          name: "Template",
          value: "template",
        }
  );

  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      height={"80vh"}
      width={"100%"}
    >
      <Card
        // width={"15%"}
        minWidth={"250px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        minHeight="40px"
        backgroundColor={"white.200"}
        padding={"10px"}
      >
        <RadioGroup
          value={String(viewBy.value)}
          onChange={(val: any) => {
            val === "template"
              ? setViewBy({
                  name: "Template",
                  value: "template",
                })
              : setViewBy({
                  name: "Tracking",
                  value: "tracking",
                });
          }}
        >
          <Stack spacing={5} direction="row">
            {tableViewList.map((item, index) => (
              <Radio key={index} colorScheme="green" value={item.value}>
                {item.name}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      </Card>

      {viewBy.value === "template" ? (
        <Box paddingTop={"10px"} width={"100%"}>
          <ReportTemplate.ReportTemplatesListing
            pageType={EReportType.InService}
          />
        </Box>
      ) : (
        <Box paddingTop={"10px"} width={"100%"}>
          <ReportTemplate.Track pageType={EReportType.InService} />
        </Box>
      )}
    </Flex>
  );
};

export default InServiceTables;
