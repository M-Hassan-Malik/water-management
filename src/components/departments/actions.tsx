import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";

import { Core } from "@/components";
import { HandleLogout } from "@/components/auth";
import type {
  AddDepartmentMutation,
  DepartmentInput,
  DepartmentUpdateInput,
  UpdateDepartmentMutation,
} from "@/graphql/generated/graphql";
import {
  AddDepartment,
  FindDepartmentById,
  UpdateDepartment,
} from "@/services/api";
import { getDefinedPatternedName } from "@/utils/helpers/functions";

import {
  addValidationSchema,
  updateValidationSchema,
} from "./department.validator";

interface IActionsDepartmentFormProps {}

const ActionsDepartmentForm: React.FunctionComponent<
  IActionsDepartmentFormProps
> = () => {
  const { push, query } = useRouter();

  const user: IUser = useSelector((state: any) => state.user.user);

  const [success, setSuccess] = useState<IAlertSuccessData>();
  const [fail, setFail] = useState<IAlertSuccessData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [prevData, setPrevData] = useState<IDepartment>({
    _id: "",
    active: true,
    name: "",
    createdBy: "",
  });

  const { mutate: mutateAddDepartment } = useMutation<
    AddDepartmentMutation,
    unknown,
    DepartmentInput
  >((variables) => AddDepartment({ departmentInput: variables }), {
    onSuccess: () => {
      setIsLoading(false);
      setSuccess({
        status: true,
        title: "Added",
        description: "The Department has been added successfully.",
      });
      setTimeout(() => {
        push("/departments");
      }, 1000);
    },
    onError: (_: any) => {
      const errorMsg = _?.response?.errors[0]?.message || "Unable to add role.";
      setIsLoading(false);
      setFail({
        status: true,
        title: "Failed",
        description: errorMsg,
      });
    },
  });

  const { mutate: mutateUpdateDepartment } = useMutation<
    UpdateDepartmentMutation,
    unknown,
    DepartmentUpdateInput
  >((variables) => UpdateDepartment({ departmentUpdateInput: variables }), {
    onSuccess: () => {
      setIsLoading(false);
      setSuccess({
        status: true,
        title: "Updated",
        description: "The Department has been updated successfully.",
      });

      setTimeout(() => {
        push("/departments");
      }, 1000);
    },
    onError: (_: any) => {
      setIsLoading(false);
      setFail({
        status: true,
        title: "Submit Failed",
        description: "Updating Department Failed.",
      });
    },
  });

  useQuery(
    ["setDeptData"],
    () => FindDepartmentById({ departmentId: String(query.id) || "" }),
    {
      onSuccess: ({ findDepartmentById }) => {
        if (findDepartmentById) setPrevData(findDepartmentById);
      },
      onError(_: any) {
        if (
          _?.response?.errors?.length &&
          _?.response?.errors[0]?.message === "Not Authorised!"
        )
          HandleLogout();

        const errorMsg =
          _?.response?.errors[0]?.message || "Unable to get roles.";
        setFail({
          status: true,
          title: "Fetching Failed",
          description: errorMsg,
        });
      },
      enabled: Boolean(query.id) && query?.slug !== "add", // Enable the query when actionRoleId is truthy, and pageType is not "add"
      refetchOnMount: true,
    }
  );

  const { handleSubmit, handleChange, values, errors, touched, setFieldValue } =
    useFormik<IDepartment>({
      initialValues: {
        _id: prevData._id ? prevData._id : "",
        active: prevData.active ? prevData.active : false,
        name: prevData.name ? prevData.name : "",
        createdBy: prevData.createdBy ? prevData.createdBy : String(user._id),
      },
      enableReinitialize: true,
      onSubmit: (inputValues) => {
        setIsLoading(true);

        if (query?.slug === "edit") {
          mutateUpdateDepartment({
            _id: String(query.id),
            active: inputValues.active,
            name: inputValues.name.toUpperCase(),
          });
        } else {
          mutateAddDepartment({
            active: inputValues.active,
            name: inputValues.name.toUpperCase(),
            createdBy: inputValues.createdBy,
          });
        }
      },
      validationSchema:
        query?.slug === "edit" ? updateValidationSchema : addValidationSchema,
    });

  const statusHandler = (value: string) => {
    const active = value === "true";
    setFieldValue("active", active);
  };

  const handleCancel = () => {
    push("/departments");
  };

  return (
    <Box>
      <Core.Alert show={success} theme="success" />
      <Core.Alert show={fail} theme="error" />
      {query?.slug !== "add" && !values.name ? (
        <Flex
          width={"100%"}
          height={"125px"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Core.BtnSpinner size="md" />
        </Flex>
      ) : (
        <>
          <Flex columnGap={"10px"}>
            <FormControl
              isRequired
              isInvalid={!!errors.name && touched.name}
              width={"50%"}
            >
              <FormLabel>Department</FormLabel>
              <Core.Input
                name="name"
                placeholder="Enter Department"
                type="text"
                onChange={handleChange}
                value={getDefinedPatternedName(values.name)}
                errorBorderColor="red.300"
                error={errors.name}
                touched={touched.name}
                isDisabled={query?.slug === "view"}
              />
            </FormControl>
            <FormControl width={"50%"}>
              <RadioGroup
                value={String(values.active)}
                isDisabled={query?.slug === "view"}
                onChange={(value) => statusHandler(value)}
                name="status"
              >
                <FormLabel>Status</FormLabel>
                <Stack spacing={5} direction="row" mt="20px">
                  <Radio colorScheme="green" value="true">
                    Active
                  </Radio>
                  <Radio colorScheme="red" value="false">
                    Inactive
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
          </Flex>
          {query?.slug !== "view" && (
            <Flex justifyContent="end" columnGap={"10px"}>
              {query?.slug === "edit" && (
                <Core.Button
                  button={"Cancel"}
                  btnGrayMd
                  onClick={handleCancel}
                />
              )}
              <Core.Button
                button={query?.slug === "edit" ? "Update" : "Add"}
                btnOrangeMd
                onClick={handleSubmit}
                isLoading={isLoading}
              />
            </Flex>
          )}
        </>
      )}
    </Box>
  );
};

export default ActionsDepartmentForm;
