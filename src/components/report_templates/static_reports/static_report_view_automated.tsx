import { Flex } from "@chakra-ui/react";

import BH_T_IDEN from "./bh_t_iden";
import SRFooter from "./sr_footer";
import SRTable from "./sr_table";
import ThreeInput from "./three_input";
import ThreeLinesBoxTextWithTwoInputs from "./three_lines_box_text_with_two_inputs";
import TwoInput from "./two_input";
import TwoTables from "./two_tables";

interface IStaticReportView_AutomatedProps {}

const StaticReportView_Automated: React.FunctionComponent<
  IStaticReportView_AutomatedProps
> = () => {
  const BH_T_IDEN_data = {
    title: "Automated External Defibrillator (AED) Equipment Inspection Report",
    description:
      "AED Equipment must be checked at least once per day (and/or during opening and closing facility checks) to ensure functionality (according to manufacturer specifications), equipment components, and accessories, as well as ensuring the immediate readiness of all equipment in the event of an emergency. EAP operating criteria call for AED Equipment be available to a guest in distress within two minutes of extrication from the water. ",
    gradient: "linear-gradient(#007BFF, #FFFFFF)",
  };
  const ThreeInput_data = {
    input1: "Organization",
    input2: "Facility",
    input3: "Location of AED Equipment",
  };
  const TwoInput_data = {
    input1: "Report Start Date",
    input2: "Report End Date",
  };
  const ThreeLinesBoxTextWithTwoInputs_data = {
    text1:
      "AED Electrode Pads (Adult and Pediatric) must be packaged, in good condition, and have not expired.",
    text2:
      "CHECK THE BOXES IN EACH CATAGORY TO INDICATE AVAILABLITY AND GOOD CONDITION.",
    text3:
      " All emergency equipment must be in good, fully functional condition or immediately corrected / replaced.",
    headding: "EXPIRATION DATES OF PADS",
    input_first: "ADULT PADS",
    input_second: "PEDIATRIC PADS",
  };
  const Table_data = {
    columns: [
      "Date",
      "Time",
      "AEDSelfTestSuccessful",
      "BackupBatteryAvailable",
      "ClothingScissorsAvailable",
      "HairRazorAvailable",
      "ADULTPadsAvailable",
      "PEDIATRICPadsorKeyAvailable",
      "BackupPadsAvailable",
      "AlcoholWipesAvailable",
      "TowelAvailable",
      "StaffInitials",
    ],
    data: [
      {
        Date: false,
        Time: false,
        AEDSelfTestSuccessful: true,
        BackupBatteryAvailable: true,
        ClothingScissorsAvailable: true,
        HairRazorAvailable: true,
        ADULTPadsAvailable: true,
        PEDIATRICPadsorKeyAvailable: true,
        BackupPadsAvailable: true,
        AlcoholWipesAvailable: true,
        TowelAvailable: true,
        StaffInitials: false,
      },
      {
        Date: false,
        Time: false,
        AEDSelfTestSuccessful: true,
        BackupBatteryAvailable: true,
        ClothingScissorsAvailable: true,
        HairRazorAvailable: true,
        ADULTPadsAvailable: true,
        PEDIATRICPadsorKeyAvailable: true,
        BackupPadsAvailable: true,
        AlcoholWipesAvailable: true,
        TowelAvailable: true,
        StaffInitials: false,
      },
      {
        Date: false,
        Time: false,
        AEDSelfTestSuccessful: true,
        BackupBatteryAvailable: true,
        ClothingScissorsAvailable: true,
        HairRazorAvailable: true,
        ADULTPadsAvailable: true,
        PEDIATRICPadsorKeyAvailable: true,
        BackupPadsAvailable: true,
        AlcoholWipesAvailable: true,
        TowelAvailable: true,
        StaffInitials: false,
      },
      {
        Date: false,
        Time: false,
        AEDSelfTestSuccessful: true,
        BackupBatteryAvailable: true,
        ClothingScissorsAvailable: true,
        HairRazorAvailable: true,
        ADULTPadsAvailable: true,
        PEDIATRICPadsorKeyAvailable: true,
        BackupPadsAvailable: true,
        AlcoholWipesAvailable: true,
        TowelAvailable: true,
        StaffInitials: false,
      },
      {
        Date: false,
        Time: false,
        AEDSelfTestSuccessful: true,
        BackupBatteryAvailable: true,
        ClothingScissorsAvailable: true,
        HairRazorAvailable: true,
        ADULTPadsAvailable: true,
        PEDIATRICPadsorKeyAvailable: true,
        BackupPadsAvailable: true,
        AlcoholWipesAvailable: true,
        TowelAvailable: true,
        StaffInitials: false,
      },
      {
        Date: false,
        Time: false,
        AEDSelfTestSuccessful: true,
        BackupBatteryAvailable: true,
        ClothingScissorsAvailable: true,
        HairRazorAvailable: true,
        ADULTPadsAvailable: true,
        PEDIATRICPadsorKeyAvailable: true,
        BackupPadsAvailable: true,
        AlcoholWipesAvailable: true,
        TowelAvailable: true,
        StaffInitials: false,
      },
      {
        Date: false,
        Time: false,
        AEDSelfTestSuccessful: true,
        BackupBatteryAvailable: true,
        ClothingScissorsAvailable: true,
        HairRazorAvailable: true,
        ADULTPadsAvailable: true,
        PEDIATRICPadsorKeyAvailable: true,
        BackupPadsAvailable: true,
        AlcoholWipesAvailable: true,
        TowelAvailable: true,
        StaffInitials: false,
      },
      {
        Date: false,
        Time: false,
        AEDSelfTestSuccessful: true,
        BackupBatteryAvailable: true,
        ClothingScissorsAvailable: true,
        HairRazorAvailable: true,
        ADULTPadsAvailable: true,
        PEDIATRICPadsorKeyAvailable: true,
        BackupPadsAvailable: true,
        AlcoholWipesAvailable: true,
        TowelAvailable: true,
        StaffInitials: false,
      },
      {
        Date: false,
        Time: false,
        AEDSelfTestSuccessful: true,
        BackupBatteryAvailable: true,
        ClothingScissorsAvailable: true,
        HairRazorAvailable: true,
        ADULTPadsAvailable: true,
        PEDIATRICPadsorKeyAvailable: true,
        BackupPadsAvailable: true,
        AlcoholWipesAvailable: true,
        TowelAvailable: true,
        StaffInitials: false,
      },
      {
        Date: false,
        Time: false,
        AEDSelfTestSuccessful: true,
        BackupBatteryAvailable: true,
        ClothingScissorsAvailable: true,
        HairRazorAvailable: true,
        ADULTPadsAvailable: true,
        PEDIATRICPadsorKeyAvailable: true,
        BackupPadsAvailable: true,
        AlcoholWipesAvailable: true,
        TowelAvailable: true,
        StaffInitials: false,
      },
      {
        Date: false,
        Time: false,
        AEDSelfTestSuccessful: true,
        BackupBatteryAvailable: true,
        ClothingScissorsAvailable: true,
        HairRazorAvailable: true,
        ADULTPadsAvailable: true,
        PEDIATRICPadsorKeyAvailable: true,
        BackupPadsAvailable: true,
        AlcoholWipesAvailable: true,
        TowelAvailable: true,
        StaffInitials: false,
      },
      {
        Date: false,
        Time: false,
        AEDSelfTestSuccessful: true,
        BackupBatteryAvailable: true,
        ClothingScissorsAvailable: true,
        HairRazorAvailable: true,
        ADULTPadsAvailable: true,
        PEDIATRICPadsorKeyAvailable: true,
        BackupPadsAvailable: true,
        AlcoholWipesAvailable: true,
        TowelAvailable: true,
        StaffInitials: false,
      },
      {
        Date: false,
        Time: false,
        AEDSelfTestSuccessful: true,
        BackupBatteryAvailable: true,
        ClothingScissorsAvailable: true,
        HairRazorAvailable: true,
        ADULTPadsAvailable: true,
        PEDIATRICPadsorKeyAvailable: true,
        BackupPadsAvailable: true,
        AlcoholWipesAvailable: true,
        TowelAvailable: true,
        StaffInitials: false,
      },
      {
        Date: false,
        Time: false,
        AEDSelfTestSuccessful: true,
        BackupBatteryAvailable: true,
        ClothingScissorsAvailable: true,
        HairRazorAvailable: true,
        ADULTPadsAvailable: true,
        PEDIATRICPadsorKeyAvailable: true,
        BackupPadsAvailable: true,
        AlcoholWipesAvailable: true,
        TowelAvailable: true,
        StaffInitials: false,
      },
      {
        Date: false,
        Time: false,
        AEDSelfTestSuccessful: true,
        BackupBatteryAvailable: true,
        ClothingScissorsAvailable: true,
        HairRazorAvailable: true,
        ADULTPadsAvailable: true,
        PEDIATRICPadsorKeyAvailable: true,
        BackupPadsAvailable: true,
        AlcoholWipesAvailable: true,
        TowelAvailable: true,
        StaffInitials: false,
      },
      {
        Date: false,
        Time: false,
        AEDSelfTestSuccessful: true,
        BackupBatteryAvailable: true,
        ClothingScissorsAvailable: true,
        HairRazorAvailable: true,
        ADULTPadsAvailable: true,
        PEDIATRICPadsorKeyAvailable: true,
        BackupPadsAvailable: true,
        AlcoholWipesAvailable: true,
        TowelAvailable: true,
        StaffInitials: false,
      },
      {
        Date: false,
        Time: false,
        AEDSelfTestSuccessful: true,
        BackupBatteryAvailable: true,
        ClothingScissorsAvailable: true,
        HairRazorAvailable: true,
        ADULTPadsAvailable: true,
        PEDIATRICPadsorKeyAvailable: true,
        BackupPadsAvailable: true,
        AlcoholWipesAvailable: true,
        TowelAvailable: true,
        StaffInitials: false,
      },
      {
        Date: false,
        Time: false,
        AEDSelfTestSuccessful: true,
        BackupBatteryAvailable: true,
        ClothingScissorsAvailable: true,
        HairRazorAvailable: true,
        ADULTPadsAvailable: true,
        PEDIATRICPadsorKeyAvailable: true,
        BackupPadsAvailable: true,
        AlcoholWipesAvailable: true,
        TowelAvailable: true,
        StaffInitials: false,
      },
      {
        Date: false,
        Time: false,
        AEDSelfTestSuccessful: true,
        BackupBatteryAvailable: true,
        ClothingScissorsAvailable: true,
        HairRazorAvailable: true,
        ADULTPadsAvailable: true,
        PEDIATRICPadsorKeyAvailable: true,
        BackupPadsAvailable: true,
        AlcoholWipesAvailable: true,
        TowelAvailable: true,
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
          "AEDInProperLocation",
          "EquipmentProperlyOrganized",
          "AllEquipmentinGoodCondition",
          "SupervisorInitials",
        ],
        data: [
          {
            Date: false,
            AEDInProperLocation: true,
            EquipmentProperlyOrganized: true,
            AllEquipmentinGoodCondition: true,
            SupervisorInitials: false,
          },
          {
            Date: false,
            AEDInProperLocation: true,
            EquipmentProperlyOrganized: true,
            AllEquipmentinGoodCondition: true,
            SupervisorInitials: false,
          },
          {
            Date: false,
            AEDInProperLocation: true,
            EquipmentProperlyOrganized: true,
            AllEquipmentinGoodCondition: true,
            SupervisorInitials: false,
          },
        ],
      },
    },
    table2: {
      title: "AED PAD Replacement",
      tableData: {
        columns: [
          "DateofReplacement",
          "WhatwasReplaced",
          "PadsReturnedtoproperlocation",
          "SupervisorInitials",
        ],
        data: [
          {
            DateofReplacement: false,
            WhatwasReplaced: false,
            PadsReturnedtoproperlocation: true,
            SupervisorInitials: false,
          },
        ],
      },
      note: "*Pediatric pads are highly recommend, but not required.",
    },
  };
  const SRFooter_data = "© Jeff Ellis & Associates, Inc. | Client Template 10";
  return (
    <Flex
      rowGap={"10px"}
      flexDirection={"column"}
      borderRadius="10px"
      padding="20px"
      boxShadow="0px 2px 5px 2px rgba(0,0,0,0.05)"
      backgroundColor="white.500"
      maxWidth={"1000px"}
    >
      {/* row 1 */}
      <BH_T_IDEN data={BH_T_IDEN_data} />
      {/* row 2 */}
      <ThreeInput data={ThreeInput_data} />
      {/* row 3 */}
      <TwoInput data={TwoInput_data} />
      {/* row 4 */}
      <ThreeLinesBoxTextWithTwoInputs
        data={ThreeLinesBoxTextWithTwoInputs_data}
      />
      {/* row 5 */}
      <SRTable data={Table_data} />
      {/* row 6 */}
      <TwoTables data={TwoTables_data} />
      {/* row 7 footer */}
      <SRFooter data={SRFooter_data} />
    </Flex>
  );
};

export default StaticReportView_Automated;
