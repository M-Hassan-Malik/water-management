/* eslint-disable prettier/prettier */
import { StatGroup } from "@chakra-ui/react";

import { Core } from "@/components";

interface IStatsGroupProps {
  statsData: any;
  setPackageId?: any;
  setClientAdminId?: any;
  setFacilityId?: any;
}

const StatsGroup: React.FunctionComponent<IStatsGroupProps> = ({
  statsData,
  setPackageId,
  setClientAdminId,
  setFacilityId
}) => {
  return (
    <StatGroup
      style={{ columnGap: "1.2%", rowGap: "10px", flexWrap: "wrap" }}
      // justifyContent={statsData.length >= 4 ? "space-between" : "start"}
      justifyContent={"start"}
      mb="15px"
      minHeight={"85px"}
    >
      {statsData.map((statData: any, index: any) => {
        return (
          <Core.Stats
            key={index * 3}
            title={statData.title}
            number={statData.number}
            percentage={statData.percentage}
            status={statData.status}
            type={statData.type}
            icon={statData.icon}
            options={statData?.options}
            defaultName={statData?.defaultName}
            setPackageId={setPackageId}
            setClientAdminId={setClientAdminId}
            setFacilityId={setFacilityId}
          />
        );
      })}
    </StatGroup>
  );
};

export default StatsGroup;
