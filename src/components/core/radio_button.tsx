import { Checkbox } from "@chakra-ui/react";

function AnimatedRadioButton() {
  return (
    <Checkbox
      className="checkbox-switch"
      defaultChecked
      // isChecked={isChecked}
      // onChange={(e) => setIsChecked(e.target.checked)}
      sx={{
        ".chakra-checkbox__control": {
          borderRadius: "full",
          bg: "gray.200",
          width: "60px",
          height: "34px",

          transition: "all 0.2s",
          _checked: {
            bg: "blue.50",

            transform: "translateX(0px)",
            // _before: {
            //   top: "220px",
            //   left: "-222px",
            // },
          },
          _before: {
            content: "''",

            borderRadius: "full",
            bg: "white",
            width: "28px",
            height: "28px",

            top: "222px",
            left: "222px",
            transition: "all 0.2s",
          },
          _checkedBefore: {
            bg: "white",
            top: "23px",
            left: "23px",
            transform: "translateX(333px)",
          },
        },
      }}
    ></Checkbox>
  );
}

export default AnimatedRadioButton;
