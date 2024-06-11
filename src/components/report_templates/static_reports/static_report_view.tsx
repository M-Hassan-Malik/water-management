import { Flex } from "@chakra-ui/react";

import BH_T_IDEN from "./bh_t_iden";
import SRFooter from "./sr_footer";
import SRTable from "./sr_table";
import ThreeInput from "./three_input";
import ThreeLinesBoxText from "./three_lines_box_text";
import TwoInput from "./two_input";
import TwoTables from "./two_tables";

interface IStaticReportViewProps {}

const StaticReportView: React.FunctionComponent<
  IStaticReportViewProps
> = () => {
  const BH_T_IDEN_data = {
    title:
      "Supplemental Oxygen & Related Emergency Equipment Inspection Report",
    description:
      "Supplemental Oxygen and related Emergency Equipment must be checked at least once per day (and/or during opening and closing facility checks) to ensure adequate supplies of Oxygen, equipment components, and accessories, as well as ensuring the proper functionality and immediate readiness of all equipment in the event of an emergency. EAP operating criteria call for Supplemental Oxygen and related equipment be available to a guest in distress within one minute of extrication from the water.",
    gradient: "linear-gradient(#007BFF, #FFFFFF)",
  };
  const ThreeInput_data = {
    input1: "Organization",
    input2: "Facility",
    input3: "Location of Equipment",
  };
  const TwoInput_data = {
    input1: "Report Start Date",
    input2: "Report End Date",
  };
  const ThreeLinesBoxText_data = {
    text1:
      "  Oxygen tanks must be filled (min. 1200 psi) to accommodate at least 15 minutes of continuous flow at 15 LPM.",
    text2:
      "CHECK THE BOXES IN EACH CATAGORY TO INDICATE AVAILABLITY AND GOOD CONDITION.",
    text3:
      " All emergency equipment must be in good, fully functional condition or immediately corrected / replaced.",
  };
  const Table_data = {
    columns: [
      "Date",
      "Time",
      "OxygenTankLevel1200min",
      "_15LPMFlowRateSetPreset",
      "RegulatorisAssembled",
      "OxygenTubingAvailable",
      "BVMsAvailable",
      "SealEasyMaskwO2PortAvailable",
      "NonrebreatherMasksAvailable",
      "SuctionDeviceAvailable",
      "ExamGlovesAvailable",
      "StaffInitials",
    ],
    data: [
      {
        Date: false,
        Time: false,
        OxygenTankLevel1200min: false,
        _15LPMFlowRateSetPreset: true,
        RegulatorisAssembled: true,
        OxygenTubingAvailable: true,
        BVMsAvailable: true,
        SealEasyMaskwO2PortAvailable: true,
        NonrebreatherMasksAvailable: true,
        SuctionDeviceAvailable: true,
        ExamGlovesAvailable: true,
        StaffInitials: false,
      },
      {
        Date: false,
        Time: false,
        OxygenTankLevel1200min: false,
        _15LPMFlowRateSetPreset: true,
        RegulatorisAssembled: true,
        OxygenTubingAvailable: true,
        BVMsAvailable: true,
        SealEasyMaskwO2PortAvailable: true,
        NonrebreatherMasksAvailable: true,
        SuctionDeviceAvailable: true,
        ExamGlovesAvailable: true,
        StaffInitials: false,
      },
      {
        Date: false,
        Time: false,
        OxygenTankLevel1200min: false,
        _15LPMFlowRateSetPreset: true,
        RegulatorisAssembled: true,
        OxygenTubingAvailable: true,
        BVMsAvailable: true,
        SealEasyMaskwO2PortAvailable: true,
        NonrebreatherMasksAvailable: true,
        SuctionDeviceAvailable: true,
        ExamGlovesAvailable: true,
        StaffInitials: false,
      },
      {
        Date: false,
        Time: false,
        OxygenTankLevel1200min: false,
        _15LPMFlowRateSetPreset: true,
        RegulatorisAssembled: true,
        OxygenTubingAvailable: true,
        BVMsAvailable: true,
        SealEasyMaskwO2PortAvailable: true,
        NonrebreatherMasksAvailable: true,
        SuctionDeviceAvailable: true,
        ExamGlovesAvailable: true,
        StaffInitials: false,
      },
      {
        Date: false,
        Time: false,
        OxygenTankLevel1200min: false,
        _15LPMFlowRateSetPreset: true,
        RegulatorisAssembled: true,
        OxygenTubingAvailable: true,
        BVMsAvailable: true,
        SealEasyMaskwO2PortAvailable: true,
        NonrebreatherMasksAvailable: true,
        SuctionDeviceAvailable: true,
        ExamGlovesAvailable: true,
        StaffInitials: false,
      },
      {
        Date: false,
        Time: false,
        OxygenTankLevel1200min: false,
        _15LPMFlowRateSetPreset: true,
        RegulatorisAssembled: true,
        OxygenTubingAvailable: true,
        BVMsAvailable: true,
        SealEasyMaskwO2PortAvailable: true,
        NonrebreatherMasksAvailable: true,
        SuctionDeviceAvailable: true,
        ExamGlovesAvailable: true,
        StaffInitials: false,
      },
      {
        Date: false,
        Time: false,
        OxygenTankLevel1200min: false,
        _15LPMFlowRateSetPreset: true,
        RegulatorisAssembled: true,
        OxygenTubingAvailable: true,
        BVMsAvailable: true,
        SealEasyMaskwO2PortAvailable: true,
        NonrebreatherMasksAvailable: true,
        SuctionDeviceAvailable: true,
        ExamGlovesAvailable: true,
        StaffInitials: false,
      },
      {
        Date: false,
        Time: false,
        OxygenTankLevel1200min: false,
        _15LPMFlowRateSetPreset: true,
        RegulatorisAssembled: true,
        OxygenTubingAvailable: true,
        BVMsAvailable: true,
        SealEasyMaskwO2PortAvailable: true,
        NonrebreatherMasksAvailable: true,
        SuctionDeviceAvailable: true,
        ExamGlovesAvailable: true,
        StaffInitials: false,
      },
      {
        Date: false,
        Time: false,
        OxygenTankLevel1200min: false,
        _15LPMFlowRateSetPreset: true,
        RegulatorisAssembled: true,
        OxygenTubingAvailable: true,
        BVMsAvailable: true,
        SealEasyMaskwO2PortAvailable: true,
        NonrebreatherMasksAvailable: true,
        SuctionDeviceAvailable: true,
        ExamGlovesAvailable: true,
        StaffInitials: false,
      },
      {
        Date: false,
        Time: false,
        OxygenTankLevel1200min: false,
        _15LPMFlowRateSetPreset: true,
        RegulatorisAssembled: true,
        OxygenTubingAvailable: true,
        BVMsAvailable: true,
        SealEasyMaskwO2PortAvailable: true,
        NonrebreatherMasksAvailable: true,
        SuctionDeviceAvailable: true,
        ExamGlovesAvailable: true,
        StaffInitials: false,
      },
      {
        Date: false,
        Time: false,
        OxygenTankLevel1200min: false,
        _15LPMFlowRateSetPreset: true,
        RegulatorisAssembled: true,
        OxygenTubingAvailable: true,
        BVMsAvailable: true,
        SealEasyMaskwO2PortAvailable: true,
        NonrebreatherMasksAvailable: true,
        SuctionDeviceAvailable: true,
        ExamGlovesAvailable: true,
        StaffInitials: false,
      },
      {
        Date: false,
        Time: false,
        OxygenTankLevel1200min: false,
        _15LPMFlowRateSetPreset: true,
        RegulatorisAssembled: true,
        OxygenTubingAvailable: true,
        BVMsAvailable: true,
        SealEasyMaskwO2PortAvailable: true,
        NonrebreatherMasksAvailable: true,
        SuctionDeviceAvailable: true,
        ExamGlovesAvailable: true,
        StaffInitials: false,
      },
      {
        Date: false,
        Time: false,
        OxygenTankLevel1200min: false,
        _15LPMFlowRateSetPreset: true,
        RegulatorisAssembled: true,
        OxygenTubingAvailable: true,
        BVMsAvailable: true,
        SealEasyMaskwO2PortAvailable: true,
        NonrebreatherMasksAvailable: true,
        SuctionDeviceAvailable: true,
        ExamGlovesAvailable: true,
        StaffInitials: false,
      },
      {
        Date: false,
        Time: false,
        OxygenTankLevel1200min: false,
        _15LPMFlowRateSetPreset: true,
        RegulatorisAssembled: true,
        OxygenTubingAvailable: true,
        BVMsAvailable: true,
        SealEasyMaskwO2PortAvailable: true,
        NonrebreatherMasksAvailable: true,
        SuctionDeviceAvailable: true,
        ExamGlovesAvailable: true,
        StaffInitials: false,
      },
      {
        Date: false,
        Time: false,
        OxygenTankLevel1200min: false,
        _15LPMFlowRateSetPreset: true,
        RegulatorisAssembled: true,
        OxygenTubingAvailable: true,
        BVMsAvailable: true,
        SealEasyMaskwO2PortAvailable: true,
        NonrebreatherMasksAvailable: true,
        SuctionDeviceAvailable: true,
        ExamGlovesAvailable: true,
        StaffInitials: false,
      },
      {
        Date: false,
        Time: false,
        OxygenTankLevel1200min: false,
        _15LPMFlowRateSetPreset: true,
        RegulatorisAssembled: true,
        OxygenTubingAvailable: true,
        BVMsAvailable: true,
        SealEasyMaskwO2PortAvailable: true,
        NonrebreatherMasksAvailable: true,
        SuctionDeviceAvailable: true,
        ExamGlovesAvailable: true,
        StaffInitials: false,
      },
      {
        Date: false,
        Time: false,
        OxygenTankLevel1200min: false,
        _15LPMFlowRateSetPreset: true,
        RegulatorisAssembled: true,
        OxygenTubingAvailable: true,
        BVMsAvailable: true,
        SealEasyMaskwO2PortAvailable: true,
        NonrebreatherMasksAvailable: true,
        SuctionDeviceAvailable: true,
        ExamGlovesAvailable: true,
        StaffInitials: false,
      },
      {
        Date: false,
        Time: false,
        OxygenTankLevel1200min: false,
        _15LPMFlowRateSetPreset: true,
        RegulatorisAssembled: true,
        OxygenTubingAvailable: true,
        BVMsAvailable: true,
        SealEasyMaskwO2PortAvailable: true,
        NonrebreatherMasksAvailable: true,
        SuctionDeviceAvailable: true,
        ExamGlovesAvailable: true,
        StaffInitials: false,
      },
      {
        Date: false,
        Time: false,
        OxygenTankLevel1200min: false,
        _15LPMFlowRateSetPreset: true,
        RegulatorisAssembled: true,
        OxygenTubingAvailable: true,
        BVMsAvailable: true,
        SealEasyMaskwO2PortAvailable: true,
        NonrebreatherMasksAvailable: true,
        SuctionDeviceAvailable: true,
        ExamGlovesAvailable: true,
        StaffInitials: false,
      },
    ],
  };
  const TwoTables_data = {
    table1: {
      title: "Periodic Supervisor Equipment Check",
      tableData: {
        columns: [
          "Date",
          "OxygenTankFillLevelpsi",
          "EquipmentProperlyOrganized",
          "AllEquipmentinGoodCondition",
          "SupervisorInitials",
        ],
        data: [
          {
            Date: false,
            OxygenTankFillLevelpsi: false,
            EquipmentProperlyOrganized: true,
            AllEquipmentinGoodCondition: true,
            SupervisorInitials: false,
          },
          {
            Date: false,
            OxygenTankFillLevelpsi: false,
            EquipmentProperlyOrganized: true,
            AllEquipmentinGoodCondition: true,
            SupervisorInitials: false,
          },
          {
            Date: false,
            OxygenTankFillLevelpsi: false,
            EquipmentProperlyOrganized: true,
            AllEquipmentinGoodCondition: true,
            SupervisorInitials: false,
          },
        ],
      },
    },
    table2: {
      title: "Oxygen Refill Log",
      tableData: {
        columns: [
          "DateofRefill",
          "TankRefillLevelpsi",
          "TankReturnedtoproperlocation",
          "SupervisorInitials",
        ],
        data: [
          {
            DateofRefill: false,
            TankRefillLevelpsi: false,
            TankReturnedtoproperlocation: true,
            SupervisorInitials: false,
          },
          {
            DateofRefill: false,
            TankRefillLevelpsi: false,
            TankReturnedtoproperlocation: true,
            SupervisorInitials: false,
          },
          {
            DateofRefill: false,
            TankRefillLevelpsi: false,
            TankReturnedtoproperlocation: true,
            SupervisorInitials: false,
          },
        ],
      },
    },
  };

  const SRFooter_data = " © Jeff Ellis & Associates, Inc. | Client Template 9";

  return (
    <Flex
      rowGap={"10px"}
      flexDirection={"column"}
      borderRadius="10px"
      padding="20px"
      boxShadow="0px 2px 5px 2px rgba(0,0,0,0.05)"
      backgroundColor="white.100"
      maxWidth={"1000px"}
    >
      {/* row 1 */}
      <BH_T_IDEN data={BH_T_IDEN_data} />
      {/* row 2 */}
      <ThreeInput data={ThreeInput_data} />
      {/* row 3 */}
      <TwoInput data={TwoInput_data} />
      {/* row 4 */}
      <ThreeLinesBoxText data={ThreeLinesBoxText_data} />
      {/* row 5 */}
      <SRTable data={Table_data} />
      {/* row 6 */}
      <TwoTables data={TwoTables_data} />
      {/* row 7 footer */}
      <SRFooter data={SRFooter_data} />
    </Flex>
  );
};

export default StaticReportView;
