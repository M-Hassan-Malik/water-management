import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Select,
  Stack,
  // Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import moment from "moment";
import { Types } from "mongoose";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";

import {
  type ActivityLogInput,
  type CreateActivityLogMutation,
  type EReportType,
  Interface,
} from "@/graphql/generated/graphql";
import {
  AddReportTemplate,
  CreateActivityLog,
  FindTemplateById,
  GetFacilities,
  UpdateReportTemplate,
} from "@/services/api";
import { updateFormField } from "@/utils/helpers/templateField";

import { Core, ReportTemplate } from "..";
import { HandleLogout } from "../auth";
import { Icons } from "../icons";

interface DraggableItem {
  id: string;
  type: string;
}

interface ReportTemplateBProps {
  pageType?: PageType;
}

interface IFacilitiesData {
  value: string;
  name: string;
}

const ReportTemplateBuilder: React.FC<ReportTemplateBProps> = ({
  pageType,
}) => {
  const { push, query } = useRouter();
  const [formFields, setFormFields] = useState<IFormField[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [requiredFieldsFor, setRequiredFieldsFor] = useState<string>("");
  const [templateName, setTemplateName] = useState<string>("");
  const [reportType, setReportType] = useState<EReportType>(
    (query["template-type"] as EReportType) ||
      ("STANDARD" as EReportType.Standard)
  );
  const [templateFacility, setTemplateFacility] = useState<IFacilitiesData>();
  const [success, setSuccess] = useState<IAlertSuccessData>();
  const [reportStatus, setReportStatus] = useState<boolean>(true);
  const [error, setError] = useState<IAlertSuccessData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [universalAccess, setUniversalAccess] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const user: IUser = useSelector((state: any) => state.user.user);
  const [requiredFields, setRequiredFields] = useState<RequiredFieldsType>({
    _id: "",
    type: "",
    label: "",
    placeholder: "",
    value: "",
    src: "",
    options: [],
  });
  const [droppedItem, setDroppedItem] = useState<DraggableItem | null | string>(
    null
  );
  const [facilities, setFacilities] = useState<IFacilitiesData[]>([]);

  useQuery(
    "findTemplateById",
    () => FindTemplateById({ findTemplateByIdId: query?.id as string }),
    {
      onSuccess: ({ findTemplateById }) => {
        if (findTemplateById?.universalAccess) {
          setUniversalAccess(true);
        } else
          setTemplateFacility({
            name: String(findTemplateById?.facility?.facility || ""),
            value: String(findTemplateById?.facility?._id || ""),
          } as IFacilitiesData);

        const formFieldData: IFormField[] = [
          ...findTemplateById.fields,
        ] as IFormField[];

        setTemplateName(findTemplateById.name);
        setReportType(findTemplateById.type);

        setReportStatus(findTemplateById?.status || false);
        setFormFields(formFieldData);
      },
      onError: (_: any) => {
        if (
          _?.response?.errors?.length &&
          _?.response?.errors[0]?.message === "Not Authorised!"
        )
          HandleLogout();
        const errorMsg =
          _?.response?.errors[0]?.message || "Failed to fetch template.";
        setError({
          status: true,
          title: "Something went wrong",
          description: errorMsg,
        });
      },
      enabled: Boolean(query?.id) && pageType === "edit",
      refetchOnMount: true,
    }
  );

  useQuery(
    "getFacilitiesForAddReport",
    () => GetFacilities({ userId: user._id || "" }),
    {
      onSuccess({ getFacilities }) {
        const facilityData: IFacilitiesData[] = [
          { name: "Select Facility", value: "" },
        ];
        getFacilities.forEach((item) => {
          if (item.active) {
            facilityData.push({
              name: item.facility,
              value: item._id ? item._id : "",
            });
          }
        });
        setFacilities(facilityData);
      },
      onError(_: any) {
        if (
          _?.response?.errors?.length &&
          _?.response?.errors[0]?.message === "Not Authorised!"
        )
          HandleLogout();
      },
      refetchOnMount: true,
    }
  );

  const [errorFormSubmission, setErrorFormSubmission] = useState<string>("");

  useMemo(() => {
    const rf = requiredFields;
    if (rf) {
      const updatedFields = updateFormField(
        formFields,
        String(droppedItem),
        rf
      );

      setFormFields(updatedFields);
    }
    if (formFields.length > 0) {
      setErrorFormSubmission("");
    }
  }, [requiredFields]);

  const handleDrop = (item: DraggableItem) => {
    setRequiredFields({
      _id: "",
      type: "",
      label: "",
      placeholder: "",
      value: "",
      src: "",
    });
    setDroppedItem(item.type);
    // Auto-generated
    if (item.type === "organization") {
      setRequiredFields({
        _id: `id${formFields.length + 2}`,
        type: "organization",
        label: "Organization",
        placeholder: "Organization",
      });
    } else if (item.type === "facility") {
      setRequiredFields({
        _id: `id${formFields.length + 2}`,
        type: "facility",
        label: "Facility Name",
        value: "",
        placeholder: "Facility",
      });
    } else if (item.type === "user") {
      setRequiredFields({
        _id: `id${formFields.length + 2}`,
        type: "user",
        value: "",
        label: "User",
        placeholder: "User",
      });
    } else if (item.type === "lifeguard") {
      setRequiredFields({
        _id: `id${formFields.length + 2}`,
        type: "lifeguard",
        value: "",
        label: "",
        placeholder: "",
      });
      onOpen();
    }
    // Manual
    else if (
      item.type === "input" ||
      item.type === "password" ||
      item.type === "textarea" ||
      item.type === "password" ||
      item.type === "text" ||
      item.type === "email" ||
      item.type === "number"
    ) {
      setRequiredFieldsFor("input");
      onOpen();
    } else if (item.type === "select") {
      setRequiredFieldsFor("select");
      onOpen();
    } else if (item.type === "radio") {
      setRequiredFieldsFor("radio");
      onOpen();
    } else if (item.type === "date") {
      setRequiredFieldsFor("date");
      onOpen();
    } else if (item.type === "mcqs") {
      setRequiredFieldsFor("mcqs");
      onOpen();
    } else if (item.type === "image") {
      setRequiredFields({
        _id: `id${formFields.length + 2}`,
        type: "image",
        label: "Select Images to Upload",
        placeholder: "",
      });
      onOpen();
    } else if (item.type === "video") {
      setRequiredFields({
        _id: `id${formFields.length + 2}`,
        type: "video",
        label: "Select videos to upload",
        placeholder: "",
      });
    } else if (item.type === "attachment") {
      setRequiredFields({
        _id: `id${formFields.length + 2}`,
        type: "attachment",
        label: "Upload Attachment",
        placeholder: "",
      });
    } else if (item.type === "heading") {
      setRequiredFieldsFor("heading");
      onOpen();
    } else if (item.type === "paragraph") {
      setRequiredFieldsFor("paragraph");
      onOpen();
    }
  };

  // Define the draggable form field component
  const DraggableFormField: React.FC<IFormField> = ({
    _id: id,
    type,
    label,
  }) => {
    const [{ isDragging }, dragRef] = useDrag({
      type: "form-field", // Add the 'type' property here
      item: { id, type },
      collect: (monitor: any) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    return (
      <div
        ref={dragRef}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: "10px",
          color: isDragging ? "#fff" : "#000",
          backgroundColor: isDragging ? "#1f3c71" : "",
          padding: "8px",
          cursor: "move",
        }}
      >
        {label}
        <span>
          {type === "select" && (
            <Icons.GoSingleSelect fontSize={"18px"} opacity={".5"} />
          )}
          {type === "input" && (
            <Icons.BsInputCursorText fontSize={"16px"} opacity={".5"} />
          )}
          {type === "organization" && (
            <Icons.BsInputCursorText fontSize={"16px"} opacity={".5"} />
          )}
          {type === "facility" && (
            <Icons.BsInputCursorText fontSize={"16px"} opacity={".5"} />
          )}
          {type === "user" && (
            <Icons.BsInputCursorText fontSize={"16px"} opacity={".5"} />
          )}
          {type === "lifeguard" && (
            <Icons.BsInputCursorText fontSize={"16px"} opacity={".5"} />
          )}
          {type === "date" && (
            <Icons.BsCalendarDate fontSize={"16px"} opacity={".5"} />
          )}
          {type === "mcqs" && (
            <Icons.BsQuestionCircle fontSize={"16px"} opacity={".5"} />
          )}
          {type === "image" && (
            <Icons.RiImageAddFill fontSize={"16px"} opacity={".5"} />
          )}
          {type === "video" && (
            <Icons.RiVideoUploadFill fontSize={"16px"} opacity={".5"} />
          )}
          {type === "heading" && (
            <Icons.GoHeading fontSize={"16px"} opacity={".5"} />
          )}
          {type === "paragraph" && (
            <Icons.PiParagraph fontSize={"16px"} opacity={".5"} />
          )}
          {type === "attachment" && (
            <Icons.IoMdAttach fontSize={"16px"} opacity={".5"} />
          )}
        </span>
      </div>
    );
  };

  // Define the drop zone component
  const DropZone: React.FC = () => {
    const [{ canDrop, isOver }, dropRef] = useDrop({
      accept: "form-field",
      drop: (item: DraggableItem) => handleDrop(item),
      collect: (monitor: any) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    });

    const isActive = canDrop && isOver;

    return (
      <div
        ref={dropRef}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100px",
          borderRadius: "10px",
          border: isActive ? "2px dashed blu" : "2px dashed #ccc",
          backgroundColor: isActive ? "#ccc" : "",
          color: isActive ? "#fff" : "#ccc",
          padding: "10px",
          marginTop: "20px",
          transition: "all .3s ease",
        }}
      >
        {isActive ? "Drop here" : "Drag items here"}
      </div>
    );
  };

  const { mutate: activityLogMutation } = useMutation<
    CreateActivityLogMutation,
    unknown,
    ActivityLogInput
  >((variables) => CreateActivityLog({ activityLogInput: variables }));

  const createReportTemplateMutation = useMutation(AddReportTemplate, {
    onSuccess: ({ addReportTemplate }) => {
      setSuccess({
        status: true,
        title: "Added",
        description: "Report Template has been added successfully.",
      });
      activityLogMutation({
        user_name: `${user?.first_name} ${user?.last_name}`,
        belongsTo: String(user.company.subAdmin ? user._id : user.belongsTo),
        role: String(
          user?.admin
            ? "SUPER-ADMIN"
            : !user?.company?._id
            ? `SUPER's Users`
            : user?.company?.subAdmin
            ? "CLIENT-ADMIN"
            : user?.company?.employeeType
        ),
        user_id: user?._id || "",
        interface: Interface.Web,
        dateTime: moment().toDate(),
        activity: "Report Template Created",
      });
      push(`/report-templates/view?id=${addReportTemplate.data}`);
      setIsLoading(false);
    },
    onError: (_: any) => {
      setIsLoading(false);
      setIsDisabled(false);
      const errorMsg =
        _?.response?.errors[0]?.message || "Unable to add report template.";
      setError({
        status: true,
        title: "Failed",
        description: errorMsg,
      });
    },
  });

  const updateReportTemplateMutation = useMutation(UpdateReportTemplate, {
    onSuccess: ({ updateReportTemplate }) => {
      setSuccess({
        status: true,
        title: "Updated",
        description: "Report Template has been updated successfully.",
      });
      activityLogMutation({
        user_name: `${user?.first_name} ${user?.last_name}`,
        belongsTo: String(user.company.subAdmin ? user._id : user.belongsTo),
        role: String(
          user?.admin
            ? "SUPER-ADMIN"
            : !user?.company?._id
            ? `SUPER's Users`
            : user?.company?.subAdmin
            ? "CLIENT-ADMIN"
            : user?.company?.employeeType
        ),
        user_id: user?._id || "",
        interface: Interface.Web,
        dateTime: moment().toDate(),
        activity: "Report Template Updated",
      });
      queryClient.invalidateQueries("findTemplateById");
      push(`/report-templates/view?id=${updateReportTemplate._id}`);
      setIsLoading(false);
    },
    onError: (_: any) => {
      setIsLoading(false);
      setIsDisabled(false);
      const errorMsg =
        _?.response?.errors[0]?.message || "Unable to update report template.";
      setError({
        status: true,
        title: "Failed",
        description: errorMsg,
      });
    },
  });

  const saveReportTemplate = () => {
    setIsLoading(true);
    setIsDisabled(true);
    if (formFields.length === 0) {
      setErrorFormSubmission("Form does not contain any field.");
    } else if (!templateName) {
      setIsLoading(false);
      setIsDisabled(false);
      setErrorFormSubmission("Form name is required");
      setIsLoading(false);
      setIsDisabled(false);
    } else if (!templateFacility?.value) {
      setErrorFormSubmission("Please select a Facility");
      setIsLoading(false);
      setIsDisabled(false);
    } else {
      if (pageType === "create") {
        const payload: ReportTemplateInput = {
          name: templateName,
          type: reportType as string,
          fields: formFields as [FormFieldInput],
          status: reportStatus,
          created_by: String(user._id),
        };
        if (!universalAccess)
          payload.facility = String(templateFacility?.value || "");

        createReportTemplateMutation.mutate({
          reportTemplateInput: payload,
        });
      } else if (pageType === "edit" && (query?.id as string)) {
        const payload: UpdateReportTemplateInput = {
          _id: universalAccess
            ? String(new Types.ObjectId())
            : (query.id as string),
          name: templateName,
          status: reportStatus,
          fields: formFields as [FormFieldInput],
        };

        if (universalAccess) {
          payload.created_by = user._id;
          payload.clientAdminRef = user.belongsTo ? user.belongsTo : user._id;
          payload.type = reportType as string;
          payload.facility = String(templateFacility?.value || "");
        } else payload.facility = String(templateFacility?.value || "");

        updateReportTemplateMutation.mutate({
          updateReportTemplateInput: payload,
        });
      }
      setErrorFormSubmission("");
    }
  };

  const deleteItem = (item: IFormField) => {
    setFormFields((prevFormFields) =>
      prevFormFields.filter((itm) => itm._id !== item._id)
    );
  };

  const editItem = (item: IFormField) => {
    handleDrop({
      id: item._id ? item._id : "",
      type: item.type ? item.type : "",
    });
    setRequiredFields({
      _id: item._id,
      type: item.type,
      label: item.label,
      placeholder: item.placeholder,
      options: item.options,
    });
  };

  return (
    <Box w="100%">
      <Core.Alert show={success} theme="success" />
      <Core.Alert show={error} theme="error" />
      <Core.ModalBox
        isOpen={isOpen}
        onClose={onClose}
        setRequiredFields={setRequiredFields}
        requiredFieldsFor={requiredFieldsFor}
        requiredFields={requiredFields}
        formFields={formFields}
      />
      <Core.H2 color="textColor" mb="10px">
        {`${pageType === "edit" ? `Edit` : `Create`} Template`}
      </Core.H2>
      <Box mb="3">
        <Flex gap={"10px"}>
          <Box w="33%">
            <Text fontSize={"17px"} textTransform={"capitalize"} mb="2px">
              Template Name:
            </Text>
            <Core.Input
              type="text"
              fontSize="14px"
              textTransform="capitalize"
              id="reportNameInput"
              value={templateName}
              placeholder="Form Name"
              onChange={(e) => setTemplateName(e.currentTarget.value)}
            />
          </Box>
          <Box w="33%">
            <Text fontSize={"17px"} textTransform={"capitalize"} mb="2px">
              Template Type:
            </Text>
            <Select
              disabled={pageType === "edit"}
              id="templateType"
              value={reportType}
              onChange={(e) => {
                setReportType(e.target.value as EReportType);
              }}
              maxWidth="260px"
              color={"textColor"}
            >
              <option value="STANDARD">STANDARD REPORT</option>
              <option value="INCIDENT">INCIDENT REPORT</option>
              <option value="INVENTORY">INVENTORY CHECKLIST</option>
              <option value="VAT">VAT</option>
              <option value="IN_SERVICE">IN SERVICE</option>
            </Select>
          </Box>

          <Box>
            <FormControl isRequired>
              <FormLabel>Facility:</FormLabel>
              <Core.Select
                placeholder="Select Facility"
                isDisabled={pageType === "view"}
                value={templateFacility?.value}
                list={facilities}
                name="facility"
                onChange={(_) => {
                  setTemplateFacility({
                    name: _.target.value,
                    value: _.target.value,
                  });
                }}
              />
            </FormControl>
          </Box>

          <Box width="32%">
            <RadioGroup
              isDisabled={pageType === "view"}
              value={reportStatus ? "true" : "false"}
              onChange={(value) => setReportStatus(value === "true")}
              name="status"
            >
              <Text fontSize={"17px"} textTransform={"capitalize"} mb="2px">
                Status:
              </Text>
              <Stack spacing={5} direction="row" mt="20px">
                <Radio colorScheme="green" value="true">
                  Active
                </Radio>
                <Radio colorScheme="red" value="false">
                  Inactive
                </Radio>
              </Stack>
            </RadioGroup>
          </Box>
        </Flex>
      </Box>
      <hr />
      <Box w="full" style={{ display: "flex" }} mt="10px">
        <Box
          w="20%"
          borderRadius={"10px"}
          backgroundColor={"#ddd"}
          padding={"15px"}
        >
          <Flex
            justifyContent={"center"}
            alignItems={"left"}
            flexDirection={"column"}
            rowGap={"7px"}
            paddingBottom="10px"
            position={"sticky"}
            top="0"
          >
            <Core.H3>Items</Core.H3>
            <Core.ItemBtn p="0" bg={"#fff"}>
              <DraggableFormField _id="" type="heading" label="Heading" />
            </Core.ItemBtn>
            <Core.ItemBtn p="0" bg={"#fff"}>
              <DraggableFormField
                _id=""
                type="organization"
                label="Organization"
              />
            </Core.ItemBtn>
            <Core.ItemBtn p="0" bg={"#fff"}>
              <DraggableFormField _id="" type="facility" label="Facility" />
            </Core.ItemBtn>
            <Core.ItemBtn p="0" bg={"#fff"}>
              <DraggableFormField _id="" type="user" label="User" />
            </Core.ItemBtn>
            <Core.ItemBtn p="0" bg={"#fff"}>
              <DraggableFormField _id="" type="lifeguard" label="Lifeguard" />
            </Core.ItemBtn>
            <Core.ItemBtn p="0" bg={"#fff"}>
              <DraggableFormField _id="" type="input" label="Input Field" />
            </Core.ItemBtn>
            <Core.ItemBtn p="0" bg={"#fff"}>
              <DraggableFormField _id="" type="select" label="Select Field" />
            </Core.ItemBtn>
            <Core.ItemBtn p="0" bg={"#fff"}>
              <DraggableFormField _id="" type="date" label="Date Picker" />
            </Core.ItemBtn>
            <Core.ItemBtn p="0" bg={"#fff"}>
              <DraggableFormField _id="" type="mcqs" label="MCQs" />
            </Core.ItemBtn>
            <Core.ItemBtn p="0" bg={"#fff"}>
              <DraggableFormField _id="" type="paragraph" label="Paragraph" />
            </Core.ItemBtn>
            <Core.ItemBtn p="0" bg={"#fff"}>
              <DraggableFormField _id="" type="image" label="Image" />
            </Core.ItemBtn>
            <Core.ItemBtn p="0" bg={"#fff"}>
              <DraggableFormField _id="" type="video" label="Video" />
            </Core.ItemBtn>
            <Core.ItemBtn p="0" bg={"#fff"}>
              <DraggableFormField _id="" type="attachment" label="Attachment" />
            </Core.ItemBtn>
          </Flex>
        </Box>
        <Box
          w="80%"
          ml={".5rem"}
          padding={"15px"}
          borderRadius={"10px"}
          backgroundColor={"#ddd"}
        >
          <Core.H3 pb="10px">Preview:</Core.H3>
          <ReportTemplate.ReportForm
            formFields={formFields}
            setFormFields={setFormFields}
            DropZone={DropZone}
            deleteItem={deleteItem}
            editItem={editItem}
            pageType={pageType}
            templateName={templateName}
            reportType={reportType}
          />
          {errorFormSubmission && (
            <Alert status="error" mt="15px">
              <AlertIcon />
              {errorFormSubmission}
            </Alert>
          )}
          <Flex justifyContent={"center"} mt="15px">
            <Core.Button
              btnOutline
              onClick={saveReportTemplate}
              isLoading={isLoading}
              isDisabled={
                formFields.length === 0 || templateName === ""
                  ? true
                  : isDisabled
              }
            >
              {pageType === "create"
                ? "Save Template"
                : universalAccess
                ? "Save as new Template"
                : "Update Template"}
            </Core.Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default ReportTemplateBuilder;
