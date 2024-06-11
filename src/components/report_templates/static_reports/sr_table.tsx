import {
  Box,
  Checkbox,
  Flex,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

interface ISRTableProps {
  // data: {
  //   columns: string[];
  //   data: {
  //     Date: boolean;
  //     Time: boolean;
  //     OxygenTankLevel1200min: boolean;
  //     _15LPMFlowRateSetPreset: boolean;
  //     RegulatorisAssembled: boolean;
  //     OxygenTubingAvailable: boolean;
  //     BVMsAvailable: boolean;
  //     SealEasyMaskwO2PortAvailable: boolean;
  //     NonrebreatherMasksAvailable: boolean;
  //     SuctionDeviceAvailable: boolean;
  //     ExamGlovesAvailable: boolean;
  //     StaffInitials: boolean;
  //   }[];
  // };
  data: any;
  broad?: boolean;
}
const all_th = (th: string) => {
  switch (th) {
    case "Date":
      return "Date";
    case "Time":
      return "Time";
    case "OxygenTankLevel1200min":
      return "Oxygen Tank Level (1200 min)";
    case "_15LPMFlowRateSetPreset":
      return "15 LPM Flow Rate Set/Preset";
    case "RegulatorisAssembled":
      return "Regulator is Assembled";
    case "OxygenTubingAvailable":
      return "Oxygen Tubing Available";
    case "BVMsAvailable":
      return "BVM(s) Available";
    case "SealEasyMaskwO2PortAvailable":
      return "Seal Easy Mask w/ O2 Port Available";
    case "NonrebreatherMasksAvailable":
      return "Non-rebreather Masks Available";
    case "SuctionDeviceAvailable":
      return "Suction Device Available";
    case "ExamGlovesAvailable":
      return "Exam Gloves Available";
    case "StaffInitials":
      return "Staff Initials";
    case "OxygenTankFillLevelpsi":
      return "Oxygen Tank Fill Level (psi)";
    case "EquipmentProperlyOrganized":
      return "Equipment Properly Organized?";
    case "AllEquipmentinGoodCondition":
      return "All Equipment in Good Condition?";
    case "SupervisorInitials":
      return "Supervisor Initials";
    case "DateofRefill":
      return "Date of Refill";
    case "TankRefillLevelpsi":
      return "Tank Refill Level (psi";
    case "TankReturnedtoproperlocation":
      return "Tank Returned to proper location? ";
    case "AEDSelfTestSuccessful":
      return "AED Self Test Successful?";
    case "BackupBatteryAvailable":
      return "Backup Battery Available?";
    case "ClothingScissorsAvailable":
      return "Clothing Scissors Available?";
    case "HairRazorAvailable":
      return "Hair Razor Available?";
    case "ADULTPadsAvailable":
      return "ADULT Pads Available?";
    case "PEDIATRICPadsorKeyAvailable":
      return "PEDIATRIC* Pads (orKey) Available?";
    case "BackupPadsAvailable":
      return "Backup Pads Available?";
    case "AlcoholWipesAvailable":
      return "Alcohol Wipes Available?";
    case "TowelAvailable":
      return "Towel Available?";
    case "DateofReplacement":
      return "Date of Replacement";
    case "WhatwasReplaced":
      return "What was Replaced?";
    case "PadsReturnedtoproperlocation":
      return "Pads Returned to proper location?";

    case "AEDInProperLocation":
      return "AED in proper location?";

    case "LifeguardName1":
      return "Lifeguard Name";
    case "LifeguardName2":
      return "Lifeguard Name";

    case "LifeguardSignatureIndicatesActualAttendance1":
      return "Lifeguard Signature (Indicates actual attendance)";

    case "LifeguardSignatureIndicatesActualAttendance2":
      return "Lifeguard Signature (Indicates actual attendance)";

    default:
      return th;
  }
};
const all_td = (td: boolean) => {
  if (td === true) {
    return (
      <Flex columnGap={"5px"} justifyContent={"center"}>
        Yes
        <Checkbox />
      </Flex>
    );
  }
  return (
    <Input
      color={"blue"}
      size="xs"
      variant={"unstyled"}
      border="0"
      padding="0"
      outline={"none"}
      margin={"0"}
      focusBorderColor="transparent"
    />
  );
};

const SRTable: React.FunctionComponent<ISRTableProps> = ({ data, broad }) => {
  return (
    <Box width={"100%"} overflow={"auto"}>
      <Table
        // theme.colors.white
        // colorScheme={broad ? "blue" : "red"}
        // variant={broad ? "striped" : "simple"}
        variant={"simple"}
        size="sm"
        borderWidth="1px"
        borderRadius="lg"
        fontSize={"9px"}
      >
        <Thead>
          <Tr>
            {data.columns.map((column: string) => (
              <Th
                key={column}
                px="2px"
                py="5px"
                m="0"
                borderWidth="1px"
                borderColor="gray.500"
                textAlign={"center"}
              >
                {all_th(column)}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.data.map((rowData: any) => (
            <Tr key={rowData._id}>
              {data.columns.map((column: string) => (
                <Td
                  key={column}
                  m="0"
                  // px="2px"
                  px={broad ? "5px" : "2px"}
                  // py="5px"
                  py={broad ? "8px" : "5px"}
                  borderWidth="1px"
                  borderColor="gray.500"
                  textAlign="center"
                >
                  {all_td(rowData[column])}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default SRTable;
