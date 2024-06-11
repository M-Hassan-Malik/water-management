import { Flex } from "@chakra-ui/react";

import BH_T_IDEN from "./bh_t_iden";
// import TwoTables from "./two_tables";
// import ThreeLinesBoxTextWithTwoInputs from "./three_lines_box_text_with_two_inputs";
import FourInputInOneRow from "./four_input_in_one_row";
import SignatureInput from "./signature_input";
import SRFooter from "./sr_footer";
import SRTable from "./sr_table";
import ThreeInput from "./three_input";

interface IStaticReportView_LifeguardRescueProps {}

const StaticReportView_LifeguardRescue: React.FunctionComponent<
  IStaticReportView_LifeguardRescueProps
> = () => {
  const BH_T_IDEN_data = {
    title: "Lifeguard Rescue Report",
    description:
      "A rescue report form must be completed when a lifeguard physically enters the water to aid a distressed swimmer or to  respond to some other type of life threatening emergency. Please complete this report and maintain a copy for your  facility records. E&A collects data from clients based upon completion of these reports annually/seasonally. If the rescue  is a major emergency (indicated by the ' ** ' in the form) contact E&A at 1-800-742-8720 within 1 hour of the incident.",
    gradient: "linear-gradient(#007BFF, #FFFFFF)",
  };
  const TwoInput_data1 = {
    input1: "Incident Day and Date:",
    input2: "Time of Day:",
  };
  const TwoInput_data2 = {
    input1: "Client Name:",
    input2: "Facility:",
  };
  const TwoInput_data3 = {
    input1: "Name of Guest",
    input2: "Date of Birth",
    input3: "Age*",
  };
  const TwoInput_data4 = {
    input1: "Guest's Street Address",
    input2: "Gender",
    input3: "Ethnic Background",
  };
  const TwoInput_data5 = {
    input1: "City",
    input2: "Guest's Home Phone",
  };

  const TwoInput_data6 = {
    input1: "State",
    input2: "Zip/Postal Code",
    input3: "Secondary Phone",
  };
  const SignatureInput_data = "Lead In-service Instructor's Signature";
  const FourInputInOneRow_data = {
    input1: "In-service Date",
    input2: "In-service START Time",
    input3: "In-service END Time",
    input4: "Total In-service Hours",
  };
  const Table_data = {
    columns: [
      "LifeguardName1",
      "LifeguardSignatureIndicatesActualAttendance1",
      "LifeguardName2",
      "LifeguardSignatureIndicatesActualAttendance2",
    ],
    data: [
      {
        LifeguardName1: false,
        LifeguardSignatureIndicatesActualAttendance1: false,
        LifeguardName2: false,
        LifeguardSignatureIndicatesActualAttendance2: false,
      },
      {
        LifeguardName1: false,
        LifeguardSignatureIndicatesActualAttendance1: false,
        LifeguardName2: false,
        LifeguardSignatureIndicatesActualAttendance2: false,
      },
      {
        LifeguardName1: false,
        LifeguardSignatureIndicatesActualAttendance1: false,
        LifeguardName2: false,
        LifeguardSignatureIndicatesActualAttendance2: false,
      },
      {
        LifeguardName1: false,
        LifeguardSignatureIndicatesActualAttendance1: false,
        LifeguardName2: false,
        LifeguardSignatureIndicatesActualAttendance2: false,
      },
      {
        LifeguardName1: false,
        LifeguardSignatureIndicatesActualAttendance1: false,
        LifeguardName2: false,
        LifeguardSignatureIndicatesActualAttendance2: false,
      },
      {
        LifeguardName1: false,
        LifeguardSignatureIndicatesActualAttendance1: false,
        LifeguardName2: false,
        LifeguardSignatureIndicatesActualAttendance2: false,
      },
      {
        LifeguardName1: false,
        LifeguardSignatureIndicatesActualAttendance1: false,
        LifeguardName2: false,
        LifeguardSignatureIndicatesActualAttendance2: false,
      },
      {
        LifeguardName1: false,
        LifeguardSignatureIndicatesActualAttendance1: false,
        LifeguardName2: false,
        LifeguardSignatureIndicatesActualAttendance2: false,
      },
      {
        LifeguardName1: false,
        LifeguardSignatureIndicatesActualAttendance1: false,
        LifeguardName2: false,
        LifeguardSignatureIndicatesActualAttendance2: false,
      },
      {
        LifeguardName1: false,
        LifeguardSignatureIndicatesActualAttendance1: false,
        LifeguardName2: false,
        LifeguardSignatureIndicatesActualAttendance2: false,
      },
      {
        LifeguardName1: false,
        LifeguardSignatureIndicatesActualAttendance1: false,
        LifeguardName2: false,
        LifeguardSignatureIndicatesActualAttendance2: false,
      },
      {
        LifeguardName1: false,
        LifeguardSignatureIndicatesActualAttendance1: false,
        LifeguardName2: false,
        LifeguardSignatureIndicatesActualAttendance2: false,
      },
      {
        LifeguardName1: false,
        LifeguardSignatureIndicatesActualAttendance1: false,
        LifeguardName2: false,
        LifeguardSignatureIndicatesActualAttendance2: false,
      },
    ],
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
      <ThreeInput data={TwoInput_data1} />
      {/* row 3 */}
      <ThreeInput data={TwoInput_data2} />
      {/* row 4 */}
      <ThreeInput data={TwoInput_data3} />
      <ThreeInput data={TwoInput_data4} />
      <ThreeInput data={TwoInput_data5} />
      <ThreeInput data={TwoInput_data6} />

      {/* row 5 */}
      <FourInputInOneRow data={FourInputInOneRow_data} />
      {/* row 6 */}
      <SRTable data={Table_data} broad />
      {/* row 7 */}
      <SignatureInput data={SignatureInput_data} />

      {/* row 8 footer */}
      <SRFooter data={SRFooter_data} />
    </Flex>
  );
};

export default StaticReportView_LifeguardRescue;
