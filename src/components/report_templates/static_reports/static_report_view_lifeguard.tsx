import { Flex } from "@chakra-ui/react";

import BH_T_IDEN from "./bh_t_iden";
// import TwoTables from "./two_tables";
// import ThreeLinesBoxTextWithTwoInputs from "./three_lines_box_text_with_two_inputs";
import FourInputInOneRow from "./four_input_in_one_row";
import SignatureInput from "./signature_input";
import SRFooter from "./sr_footer";
import SRTable from "./sr_table";
import ThreeInput from "./three_input";

interface IStaticReportView_LifeguardProps {}

const StaticReportView_Lifeguard: React.FunctionComponent<
  IStaticReportView_LifeguardProps
> = () => {
  const BH_T_IDEN_data = {
    title: "Lifeguard In-service Attendance",
    description:
      "E&A Lifeguards working 20 or more hours in a month are required to attend a minimum of four hours  of in-service training. E&A Lifeguards regularly working 19 hours or less must attend a minimum of  three hours of in-service training per quarter - administered to provide at least one hour of In-service  training each month. Cumulative and specific in-service attendance documentation must be  maintained and available for inspection. The following details in-service attendance on a particular  date and time, along with a description of topics covered. Please complete all requested fields then  print the sheet for lifeguard sign in during the described training.",
    innerShadow: "inset 0px 0px 50px 38px #0C0C86",
  };
  const TwoInput_data1 = {
    input1: "Organization",
    input2: "Facility",
  };
  const TwoInput_data2 = {
    input1: "Lead Instructor for In-service",
    input2: "Assistants",
  };
  const TwoInput_data3 = {
    input1: "Topics Covered",
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

export default StaticReportView_Lifeguard;
