/* eslint-disable no-nested-ternary */
/* eslint-disable prettier/prettier */
import {
  Box,
  Flex,
  Skeleton,
  Spacer,
  Stat,
  // StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  useMediaQuery,
} from "@chakra-ui/react";

// import { Icons } from "@/components/icons";
import { Core } from "@/components";

interface IStatsProps {
  title: string;
  number: number;
  percentage?: number;
  status?: boolean;
  type?: boolean;
  icon: string;
  options?: any;
  defaultName?: string;
  setPackageId?: any;
  setClientAdminId?: any;
  setFacilityId?: any;
}

const Stats: React.FunctionComponent<IStatsProps> = ({
  title,
  number,
  // percentage,
  // status,
  type,
  icon,
  options,
  defaultName,
  setPackageId,
  setClientAdminId,
  setFacilityId
}) => {
  const [isLargerScreen] = useMediaQuery("(min-width: 991px)");
  const [isSmallScreen] = useMediaQuery("(max-width: 576px)");
  
  return (
    <Box
      display={"inline-block"}
      backgroundColor={"white.100"}
      borderRadius={"10px"}
      padding={"10px"}
      boxShadow={"0px 2px 5px 2px rgba(0,0,0,0.05)"}
      width={isLargerScreen ? "24%" : isSmallScreen ? "100%" : "49%"}
      // minWidth={isLargerScreen ? "24%" : isSmallScreen ? "100%" : "49%"}
      // width={"100%"}
      // maxWidth={"32%"}
      maxHeight="85px"
    >
      <Stat>
        <Flex>
          <Box>
            <StatLabel color={"gray.400"} fontWeight="bold" lineHeight={"15px"}>
              {title}
            </StatLabel>
            
            {typeof(number) === "number" ?
              <StatNumber
                color={"orange.900"}
                fontSize="26px"
                fontFamily={"Verdana"}
                height={"38px"}
              >
                {type ? "$" : ""}
                {number}
              </StatNumber>
              :
              <Skeleton mt={"8px"} height={"30px"} width={"38px"} />
            }
            <StatHelpText fontFamily={"Verdana"}>
              {/* {percentage && (
                <StatArrow type={status ? "increase" : "decrease"} />
              )}
              {percentage} {percentage ? "%" : ""} */}
            </StatHelpText>
          </Box>
          <Spacer />
          {options ? (
            <Core.ActionsDropdown
              xs
              defaultName={defaultName}
              dropdwonOptions={options}
              setPackageId={setPackageId}
              setClientAdminId={setClientAdminId}
              setFacilityId={setFacilityId}
            />
          ) : (
            <Box
              w="35px"
              h="35px"
              borderRadius="50%"
              backgroundColor={"blue.900"}
              color="#fff"
              fontSize="20px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {icon}
            </Box>
          )}
        </Flex>
      </Stat>
    </Box>
  );
};

export default Stats;
