import type { AlertStatus } from "@chakra-ui/react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { Icons } from "../icons";

interface AlertsProps {
  show: IAlertSuccessData | undefined;
  theme?: AlertStatus;
  timeout?: number;
}

const Alerts: React.FC<AlertsProps> = ({ show, timeout = 4000, theme }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show?.status) {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, timeout);
    }
  }, [show]);

  return (
    <>
      {visible && (
        <Alert
          status={theme || "info"}
          position={"fixed"}
          bottom={"30px"}
          right={"40px"}
          zIndex={"10"}
          maxW="500px"
          boxShadow="md"
        >
          <AlertIcon />
          <Box>
            <AlertTitle color={"blackAlpha.900"} overflowWrap={"anywhere"}>
              {show?.title}
            </AlertTitle>
            <AlertDescription
              color={"blackAlpha.900"}
              overflowWrap={"anywhere"}
            >
              {show?.description}
            </AlertDescription>
          </Box>
          <Box
            className="slot-cross-icon"
            position={"absolute"}
            right={"1%"}
            top={"5px"}
          >
            <Icons.RxCross2
              color="red"
              fontSize={"30px"}
              className="relative z-10 cursor-pointer rounded-[50px] p-[2px] hover:bg-[#f5c3c3]"
              onClick={() => setVisible(false)}
            />
          </Box>
        </Alert>
      )}
    </>
  );
};

export default Alerts;
