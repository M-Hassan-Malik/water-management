import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import type { Dispatch } from "react";
import { useRef } from "react";

import { Core } from "..";

interface ModalBoxProps {
  isOpen: boolean;
  onClose: any;
  requiredFieldsFor: string;
  setRequiredFields: Dispatch<React.SetStateAction<RequiredFieldsType>>;
  requiredFields: RequiredFieldsType;
  formFields: IFormField[];
}
const ModalBox: React.FC<ModalBoxProps> = ({
  isOpen,
  onClose,
  requiredFieldsFor,
  setRequiredFields,
  requiredFields,
  formFields,
}) => {
  const initialRef = useRef<HTMLInputElement>(null);

  const rf = requiredFieldsFor || requiredFields.type;

  const inputTypes = [
    {
      name: "Select Type",
      value: "---",
    },
    {
      name: "text",
      value: "text",
    },
    {
      name: "password",
      value: "password",
    },
    {
      name: "email",
      value: "email",
    },
    {
      name: "number",
      value: "number",
    },
    {
      name: "textarea",
      value: "textarea",
    },
  ];

  const { handleSubmit, handleChange, values, errors, touched, setFieldValue } =
    useFormik<RequiredFieldsType>({
      initialValues: {
        type: requiredFields.type ? requiredFields.type : "",
        _id: requiredFields._id
          ? requiredFields._id
          : `id${formFields.length + 2}`,
        label: requiredFields.label ? requiredFields.label : "",
        placeholder: requiredFields.placeholder
          ? requiredFields.placeholder
          : "",
        options: requiredFields.options ? requiredFields.options : ["", ""],
      },
      enableReinitialize: true,

      onSubmit: (inputValues) => {
        setRequiredFields({
          _id: inputValues._id,
          label: inputValues.label,
          type: inputValues.type,
          options: inputValues.options,
          placeholder: inputValues.placeholder,
        });
        onClose();
      },
    });
  const addOptionsField = () => {
    // if (values.options) {
    //   setFieldValue("options", [...values.options, ""]);
    // }
    if (values.options && values.options.length < 100) {
      setFieldValue("options", [...values.options, ""]);
    }
  };

  const subtractOptionsField = () => {
    if (values.options && values.options.length) {
      const updatedArray = values.options.slice(0, -1);
      setFieldValue("options", updatedArray);
    }
  };
  const handleClose = () => {
    setRequiredFields({
      _id: "",
      label: "",
      type: "",
      options: [],
      placeholder: "",
    });

    if (requiredFields.type) formFields.splice(formFields.length - 1, 1); // to remove it already initialized setRequiredFields

    onClose();
  };

  let label;

  switch (rf) {
    case "mcqs":
      label = "Question:";
      break;
    case "heading":
      label = "Heading Text:";
      break;
    case "paragraph":
      label = "Paragraph Text:";
      break;
    default:
      label = "Label:";
      break;
  }

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <form>
        <ModalContent backgroundColor={"white.500"}>
          <ModalHeader>
            {rf === "lifeguard" && "Lifeguard Attendance Box"}
            {rf === "image" && "Image Box"}
            {rf === "input" && "Enter Input Field Details"}
            {rf === "select" && "Enter Select Box Details"}
            {rf === "date" && "Enter Date Picker Details"}
            {rf === "mcqs" && "Enter Date MCQ Details"}
            {rf === "heading" && "Enter Heading Text"}
            {rf === "paragraph" && "Enter Paragraph Text"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            pb={6}
            display={"flex"}
            flexDirection={"column"}
            rowGap={"15px"}
          >
            {rf === "input" ? (
              <FormControl>
                <FormLabel>Type</FormLabel>
                <Core.Select
                  name="type"
                  textTransform="lowercase"
                  onChange={handleChange}
                  value={String(values.type)}
                  list={inputTypes}
                  errorBorderColor="red.300"
                  error={errors.type}
                  touched={touched.type}
                />
              </FormControl>
            ) : null}
            {rf === "input" ||
            rf === "select" ||
            rf === "date" ||
            rf === "mcqs" ||
            rf === "image" ||
            rf === "lifeguard" ||
            rf === "heading" ? (
              <FormControl>
                <FormLabel>{label}</FormLabel>
                <Core.Input
                  name="label"
                  placeholder=""
                  type="text"
                  onChange={handleChange}
                  value={String(values.label)}
                  errorBorderColor="red.300"
                  error={errors.label}
                  touched={touched.label}
                />
              </FormControl>
            ) : null}
            {rf === "paragraph" ? (
              <FormControl>
                <FormLabel>{label}</FormLabel>
                <Core.Textarea
                  name="label"
                  placeholder=""
                  rows={4}
                  onChange={handleChange}
                  value={String(values.label)}
                  errorBorderColor="red.300"
                  error={errors.label}
                  touched={touched.label}
                />
              </FormControl>
            ) : null}
            {rf === "select" ? (
              <>
                {values.options &&
                  values.options.map((option, index) => {
                    return (
                      <FormControl key={index}>
                        <FormLabel>{`Option ${index + 1}`}</FormLabel>
                        <Core.Input
                          name={`options.${index}`}
                          placeholder=""
                          type="text"
                          onChange={handleChange}
                          value={option}
                          errorBorderColor="red.300"
                          error={errors.options}
                          touched={touched.options}
                        />
                      </FormControl>
                    );
                  })}
                <Flex justifyContent={"center"} columnGap={"10px"}>
                  <Core.IconicButton
                    button="subtract"
                    className="w-[70px]"
                    size={"md"}
                    onClick={subtractOptionsField}
                    isDisabled={
                      values.options !== null &&
                      values.options !== undefined &&
                      values.options.length <= 2
                    }
                  ></Core.IconicButton>
                  <Core.IconicButton
                    button="add"
                    className="w-[70px]"
                    size={"md"}
                    onClick={addOptionsField}
                  ></Core.IconicButton>
                </Flex>
              </>
            ) : null}
            {rf === "input" && (
              <FormControl>
                <FormLabel>Placeholder</FormLabel>
                <Core.Input
                  name="placeholder"
                  placeholder=""
                  type="text"
                  onChange={handleChange}
                  value={String(values.placeholder)}
                  errorBorderColor="red.300"
                  error={errors.placeholder}
                  touched={touched.placeholder}
                />
              </FormControl>
            )}
            {rf === "mcqs" && (
              <>
                <Core.H5 className="pt-[10px] text-center">MCQ Options</Core.H5>
                {values.options &&
                  values.options.map((option, index) => {
                    return (
                      <FormControl key={index}>
                        <FormLabel>{`Option ${index + 1}`}</FormLabel>
                        <Core.Input
                          name={`options.${index}`}
                          placeholder=""
                          type="text"
                          onChange={handleChange}
                          value={option}
                          errorBorderColor="red.300"
                          error={errors.options}
                          touched={touched.options}
                        />
                      </FormControl>
                    );
                  })}
                <Flex justifyContent={"center"} columnGap={"10px"}>
                  <Core.IconicButton
                    button="subtract"
                    className="w-[70px]"
                    size={"md"}
                    onClick={subtractOptionsField}
                    isDisabled={
                      values.options !== null &&
                      values.options !== undefined &&
                      values.options.length <= 2
                    }
                  ></Core.IconicButton>
                  <Core.IconicButton
                    button="add"
                    className="w-[70px]"
                    size={"md"}
                    isDisabled={
                      values.options !== null &&
                      values.options !== undefined &&
                      values.options.length === 100
                    }
                    onClick={addOptionsField}
                  ></Core.IconicButton>
                </Flex>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              isDisabled={values.label === ""}
              mr={3}
              onClick={() => {
                handleSubmit();
              }}
            >
              Save
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default ModalBox;
