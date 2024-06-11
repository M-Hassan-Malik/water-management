import {
  Alert,
  AlertIcon,
  Box,
  Card,
  Flex,
  FormLabel,
  Image,
  Text,
} from "@chakra-ui/react";
import { PDFDownloadLink } from "@react-pdf/renderer";
// import axios from "axios";
// import html2canvas from "html2canvas";
// import { jsPDF } from "jspdf";
// @ts-ignore
import { useRouter } from "next/router";
import React, {
  memo,
  // memo,
  useEffect,
  useRef,
  useState,
} from "react";
import { useQuery } from "react-query";

import uploadFile from "@/assets/svgs/upload-file.svg";
// import uploadImage from "@/assets/images/placeholder-image.png";
import uploadImage from "@/assets/svgs/upload-image.svg";
import uploadVideo from "@/assets/svgs/upload-video.svg";
import { HandleLogout } from "@/components/auth";
import { FindTemplateById } from "@/services/api";

import { Core, ReportTemplate } from "..";
import { Icons } from "../icons";
// import DndProviderComponent from "./dnd_provider_component";
interface UdOperationsProps {
  field: {
    type: string;
  };
  editItem?: any;
  deleteItem: any;
}
const UdOperations: React.FC<UdOperationsProps> = ({
  field,
  editItem,
  deleteItem,
}) => {
  return (
    <>
      {editItem && (
        <Icons.MdModeEditOutline
          color="blue"
          fontSize={"20px"}
          className="mt-[20px] cursor-pointer rounded-[20px] p-[4px] hover:bg-[#c9c9ff]"
          onClick={() => editItem(field)}
        />
      )}
      {deleteItem && (
        <Icons.RxCross2
          color="red"
          fontSize={"20px"}
          className="mt-[20px] cursor-pointer rounded-[50px] p-[2px] hover:bg-[#f5c3c3]"
          onClick={() => deleteItem(field)}
        />
      )}
    </>
  );
};

interface IMoveItemProps {
  resetClick: boolean;
  field: IFormField;
  fieldsToSwitch: IFormField[];
  setFieldsToSwitch: React.Dispatch<React.SetStateAction<IFormField[]>>;
  setResetClick: React.Dispatch<React.SetStateAction<boolean>>;
}
const MoveItem: React.FC<IMoveItemProps> = ({
  field,
  fieldsToSwitch,
  setFieldsToSwitch,
  resetClick,
  setResetClick,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (fieldsToSwitch.length < 2) {
      setIsClicked(!isClicked);
      if (fieldsToSwitch.includes(field)) {
        setFieldsToSwitch(fieldsToSwitch.filter((_) => _._id !== field._id));
      } else {
        setFieldsToSwitch([...fieldsToSwitch, field]);
      }
    }
  };

  useEffect(() => {
    if (resetClick) {
      setIsClicked(false);
      setResetClick(false);
    }
  }, [resetClick]);
  return (
    <>
      {/* //   <Box
  //   w="50px"
  //   h="50px"
  //   bg="blue.400"
  //   borderRadius="50%"
  //   animation="glow 1s infinite alternate"
  // ></Box> */}
      <Flex
        alignItems={"center"}
        animation={
          fieldsToSwitch.length === 1 && !fieldsToSwitch.includes(field)
            ? "glow 2s infinite alternate"
            : ""
        }
      >
        <Text fontSize={"9px"}>Switch Place</Text>
        <Box
          as="span"
          textColor={fieldsToSwitch.includes(field) ? "green" : "gray.400"}
          onClick={handleClick}
          cursor="pointer"
          borderRadius={fieldsToSwitch.length === 0 ? "" : "50%"}
        >
          <Icons.LuMove fontSize={"16px"} />
        </Box>
      </Flex>
    </>
  );
};

interface ReportFormProps {
  formFields?: IFormField[];
  setFormFields?: any;
  DropZone?: any;
  deleteItem?: any;
  editItem?: any;
  pageType?: string;
  templateName?: string;
  reportType?: string;
}

const ReportForm: React.FC<ReportFormProps> = ({
  DropZone,
  deleteItem,
  editItem,
  templateName,
  reportType,
  pageType,
  formFields,
  setFormFields,
}) => {
  const { query } = useRouter();
  const [fail, setFail] = useState<IAlertSuccessData>();
  const [_formFields, set_FormFields] = useState<IFormField[]>([]);
  const [_templateName, set_TemplateName] = useState<string>("");
  const [_reportType, set_ReportType] = useState<string>("");
  const [fieldsToSwitch, setFieldsToSwitch] = useState<IFormField[]>([]);
  const [resetClick, setResetClick] = useState<boolean>(false);
  const cardRef: any = useRef(null);

  const [error, setError] = useState<string>("");

  const onChangeHandle = (field: IFormField, e: any) => {
    if (
      field.type === "text" ||
      field.type === "password" ||
      field.type === "number" ||
      field.type === "email"
    ) {
      const existingItemIndex = _formFields.findIndex(
        (item) => item._id === field._id
      );

      if (existingItemIndex !== -1) {
        const updatedItem = {
          ..._formFields[existingItemIndex],
          value: "",
        };
        const updatedFormData = _formFields.map((item, index) =>
          index === existingItemIndex ? updatedItem : item
        );
        set_FormFields(updatedFormData as IFormField[]);
        setFormFields && setFormFields(updatedFormData as IFormField[]);
      } else {
        const updatedFormData = [..._formFields, { ...field, value: "" }];
        set_FormFields(updatedFormData as IFormField[]);
        setFormFields && setFormFields(updatedFormData as IFormField[]);
      }
    } else if (field.type === "organization") {
      const existingItemIndex = _formFields.findIndex(
        (item) => item._id === field._id
      );

      if (existingItemIndex !== -1) {
        const updatedItem = {
          ..._formFields[existingItemIndex],
          value: e,
        };

        const updatedFormData = _formFields.map((item, index) =>
          index === existingItemIndex ? updatedItem : item
        );

        set_FormFields(updatedFormData as IFormField[]);
        setFormFields && setFormFields(updatedFormData as IFormField[]);
      } else {
        const updatedFormData = [..._formFields, { ...field, value: e }];
        set_FormFields(updatedFormData as IFormField[]);
        setFormFields && setFormFields(updatedFormData as IFormField[]);
      }
    } else if (
      field.type === "select" ||
      field.type === "facility" ||
      field.type === "user" ||
      field.type === "lifeguard"
    ) {
      if (e.target.value.toLowerCase() === "select") {
        setError(`Select a valid ${field.type.toLowerCase()}`);
      } else {
        setError("");
        const existingItemIndex = _formFields.findIndex(
          (item) => item._id === field._id
        );

        if (existingItemIndex !== -1) {
          const updatedItem = {
            ..._formFields[existingItemIndex],
            value: e.target.value,
          };

          const updatedFormData = _formFields.map((item, index) =>
            index === existingItemIndex ? updatedItem : item
          );

          set_FormFields(updatedFormData as IFormField[]);
          setFormFields && setFormFields(updatedFormData as IFormField[]);
        } else {
          const updatedFormData = [
            ..._formFields,
            { ...field, value: e.target.value },
          ];
          set_FormFields(updatedFormData as IFormField[]);
          setFormFields && setFormFields(updatedFormData as IFormField[]);
        }
      }
    } else if (field.type === "date") {
      const existingItemIndex = _formFields.findIndex(
        (item) => item._id === field._id
      );

      if (existingItemIndex !== -1) {
        const updatedItem = {
          ..._formFields[existingItemIndex],
          value: e.target.value,
        };

        const updatedFormData = _formFields.map((item, index) =>
          index === existingItemIndex ? updatedItem : item
        );

        set_FormFields(updatedFormData as IFormField[]);
        setFormFields && setFormFields(updatedFormData as IFormField[]);
      } else {
        const updatedFormData = [
          ..._formFields,
          { ...field, value: e.target.value },
        ];
        set_FormFields(updatedFormData as IFormField[]);
        setFormFields && setFormFields(updatedFormData as IFormField[]);
      }
    } else if (field.type === "mcqs") {
      const existingItemIndex = _formFields.findIndex(
        (item) => item._id === field._id
      );

      if (existingItemIndex !== -1) {
        const updatedItem = {
          ..._formFields[existingItemIndex],
        };

        const updatedFormData = _formFields.map((item, index) =>
          index === existingItemIndex ? updatedItem : item
        );

        set_FormFields(updatedFormData as IFormField[]);
        setFormFields && setFormFields(updatedFormData as IFormField[]);
      } else {
        const updatedFormData = [..._formFields, { ...field }];
        set_FormFields(updatedFormData as IFormField[]);
        setFormFields && setFormFields(updatedFormData as IFormField[]);
      }
    }
  };

  useQuery(
    "TemplateByIdTrackPage",
    () => FindTemplateById({ findTemplateByIdId: String(query.id) }),
    {
      onSuccess({ findTemplateById }) {
        if (findTemplateById) {
          set_FormFields(findTemplateById?.fields as IFormField[]);
          set_TemplateName(findTemplateById.name);
          set_ReportType(findTemplateById.type);
        }
      },
      onError(_: any) {
        if (
          _?.response?.errors?.length &&
          _?.response?.errors[0]?.message === "Not Authorised!"
        )
          HandleLogout();
        setFail({
          status: true,
          title: "Unable to get report template",
          description: "Failed to fetch report template fields.",
        });
      },
      enabled:
        (Boolean(query?.id) && pageType === "view") || pageType === "edit",
      refetchOnMount: true,
    }
  );

  useEffect(() => {
    set_TemplateName(templateName || "");
    set_ReportType(reportType || "");
    set_FormFields(formFields?.length ? formFields : []);
  }, [templateName, reportType, formFields]);

  useEffect(() => {
    if (fieldsToSwitch.length === 2) {
      const firstId = fieldsToSwitch[0]?._id as string;
      const secondId = fieldsToSwitch[1]?._id as string;

      const firstIndex: number = _formFields.findIndex(
        (item) => item._id === firstId
      );
      const secondIndex: number = _formFields.findIndex(
        (item) => item._id === secondId
      );

      const newArray = [..._formFields];
      const firstFieldData = newArray[firstIndex];
      const secondField_id: string = newArray[secondIndex]?._id || "";

      newArray[firstIndex] = {
        ...newArray[secondIndex],
        _id: firstFieldData?._id,
      } as IFormField;
      newArray[secondIndex] = {
        ...firstFieldData,
        _id: secondField_id,
      } as IFormField;

      set_FormFields(newArray);
      setFieldsToSwitch([]);
    }
  }, [fieldsToSwitch]);

  // const downloadPDF = async () => {
  //   const cardElement: any = document.getElementById("my-card-element");

  //   // eslint-disable-next-line new-cap
  //   const pdf = new jsPDF();

  //   // Convert HTML content to canvas using html2canvas
  //   const canvas = await html2canvas(cardElement);

  //   // Calculate dimensions to fit the entire canvas
  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  //   // Add canvas image to PDF
  //   const imgData = canvas.toDataURL("image/png");
  //   pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

  //   // Save the PDF file
  //   pdf.save("report");
  // };

  // const generateAndDownloadPdf = async () => {
  //   try {
  //     const htmlContentElement = document.getElementById("my-card-element");

  //     if (!htmlContentElement) {
  //       console.error("HTML content element not found");
  //       return;
  //     }

  //     const htmlContent = htmlContentElement.innerHTML;

  //     const response = await axios.post(
  //       `${process.env.FRONT_END_URL}/api/generate-pdf`,
  //       { htmlContent },
  //       { responseType: "blob" }
  //     );

  //     if (response.status === 200) {
  //       // Create a Blob from the response data
  //       const pdfBlob = new Blob([response.data], { type: "application/pdf" });

  //       // Create a URL for the Blob
  //       const pdfUrl = URL.createObjectURL(pdfBlob);

  //       // Create a link element to trigger the download
  //       const a = document.createElement("a");
  //       a.href = pdfUrl;
  //       a.download = "downloaded_pdf.pdf";

  //       // Append the link to the document body and trigger the download
  //       document.body.appendChild(a);
  //       a.click();

  //       // Clean up by removing the link and revoking the URL
  //       document.body.removeChild(a);
  //       URL.revokeObjectURL(pdfUrl);
  //     } else {
  //       console.error("Failed to generate PDF");
  //     }
  //   } catch (erro) {
  //     console.error("Error generating PDF:", erro);
  //   }
  // };

  return (
    <>
      {pageType !== "create" && !_formFields ? (
        <Flex
          width={"100%"}
          height={"70vh"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Core.BtnSpinner size="md" />
        </Flex>
      ) : (
        <>
          {pageType !== "view" && _formFields.length >= 2 ? (
            <Alert status="warning" maxW={"800px"} mx={"auto"}>
              <Icons.TiInfo color="orange.900" />
              <Box as="span" ml="5px">
                Click on the move icon to switch the positions of form elements.
              </Box>
            </Alert>
          ) : (
            ""
          )}
          <Box maxW={"800px"} pt="10px" mx={"auto"}>
            <Flex justifyContent={"end"} gap={"10px"}>
              {/* <Core.Button btnBlueMd size="md" onClick={downloadPDF}>
                Download PDF - V1
              </Core.Button>
              {/* <Core.Button btnBlueMd size="md" onClick={generateAndDownloadPdf}>
                Download PDF - V2
              </Core.Button> */}
              {_formFields?.length > 0 && (
                <PDFDownloadLink
                  document={
                    <ReportTemplate.GeneratePDF
                      templateData={_formFields}
                      reportType={_reportType}
                      templateName={_templateName}
                    />
                  }
                  fileName="report.pdf"
                >
                  {({ loading }) => (
                    <Core.Button btnBlueMd size="md" isLoading={loading}>
                      Download PDF
                    </Core.Button>
                  )}
                </PDFDownloadLink>
              )}
            </Flex>
            <Card
              ref={cardRef}
              id="my-card-element"
              minHeight={"70vh"}
              padding={"20px"}
              // borderRadius={"10px"}
              backgroundColor={"white.100"}
              // boxShadow={"0px 2px 5px 2px rgba(0,0,0,0.05)"}
              mt="10px"
            >
              <Core.Alert show={fail} theme="error" />
              <Core.H6 color="textColor" pb="10px">
                {`Template Type: ${_reportType}`}
              </Core.H6>
              <Core.H5 color="textColor" className="capitalize" pb="10px">
                {`Template Name: ${_templateName}`}
              </Core.H5>
              <Flex flexDirection={"column"} justifyContent={"space-between"}>
                <Flex
                  rowGap={pageType && pageType === "view" ? "15px" : "10px"}
                  columnGap={"2px"}
                  flexWrap={"wrap"}
                  justifyContent={"space-between"}
                >
                  {/* <DndProviderComponent
          fields={_formFields}
          editItem={editItem}
          deleteItem={deleteItem}
          setFields={set_FormFields}
          onChangeHandle={onChangeHandle}
          pageType={pageType}
        /> */}
                  {_formFields?.map((field) => {
                    // Auto-generated
                    if (field.type === "organization") {
                      return (
                        <Flex
                          background={
                            pageType && pageType === "view" ? "" : "white.200"
                          }
                          borderRadius={"10px"}
                          padding={pageType && pageType === "view" ? "" : "5px"}
                          key={field._id}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          columnGap={"2px"}
                          width={"49%"}
                        >
                          <ReportTemplate.InputAutoPopulateText
                            field={field}
                            onChange={onChangeHandle}
                          />
                          <Flex
                            flexDirection={"column"}
                            alignItems={"end"}
                            columnGap={"2px"}
                          >
                            <MoveItem
                              field={field}
                              fieldsToSwitch={fieldsToSwitch}
                              setFieldsToSwitch={setFieldsToSwitch}
                              resetClick={resetClick}
                              setResetClick={setResetClick}
                            />
                            <Flex justifyContent={"end"} columnGap={"2px"}>
                              {fieldsToSwitch.length === 0 && (
                                <UdOperations
                                  field={field}
                                  deleteItem={deleteItem}
                                />
                              )}
                            </Flex>
                          </Flex>
                        </Flex>
                      );
                    }
                    if (field.type === "facility") {
                      return (
                        <Flex
                          background={
                            pageType && pageType === "view" ? "" : "white.200"
                          }
                          borderRadius={"10px"}
                          padding={pageType && pageType === "view" ? "" : "5px"}
                          key={field._id}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          columnGap={"2px"}
                          width={"49%"}
                        >
                          <ReportTemplate.FacilityFieldAutoPopulate
                            field={field}
                            onChange={onChangeHandle}
                          />
                          <Flex
                            flexDirection={"column"}
                            alignItems={"end"}
                            columnGap={"2px"}
                          >
                            <MoveItem
                              field={field}
                              fieldsToSwitch={fieldsToSwitch}
                              setFieldsToSwitch={setFieldsToSwitch}
                              resetClick={resetClick}
                              setResetClick={setResetClick}
                            />
                            <Flex justifyContent={"end"} columnGap={"2px"}>
                              {fieldsToSwitch.length === 0 && (
                                <UdOperations
                                  field={field}
                                  editItem={editItem}
                                  deleteItem={deleteItem}
                                />
                              )}
                            </Flex>
                          </Flex>
                        </Flex>
                      );
                    }
                    if (field.type === "user") {
                      return (
                        <Flex
                          background={
                            pageType && pageType === "view" ? "" : "white.200"
                          }
                          borderRadius={"10px"}
                          padding={pageType && pageType === "view" ? "" : "5px"}
                          key={field._id}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          columnGap={"2px"}
                          width={"49%"}
                        >
                          <ReportTemplate.UserFieldAutoPopulate
                            field={field}
                            onChange={onChangeHandle}
                          />
                          <Flex
                            flexDirection={"column"}
                            alignItems={"end"}
                            columnGap={"2px"}
                          >
                            <MoveItem
                              field={field}
                              fieldsToSwitch={fieldsToSwitch}
                              setFieldsToSwitch={setFieldsToSwitch}
                              resetClick={resetClick}
                              setResetClick={setResetClick}
                            />
                            <Flex justifyContent={"end"} columnGap={"2px"}>
                              {fieldsToSwitch.length === 0 && (
                                <UdOperations
                                  field={field}
                                  editItem={editItem}
                                  deleteItem={deleteItem}
                                />
                              )}
                            </Flex>
                          </Flex>
                        </Flex>
                      );
                    }
                    if (field.type === "lifeguard") {
                      return (
                        <Flex
                          background={
                            pageType && pageType === "view" ? "" : "white.200"
                          }
                          borderRadius={"10px"}
                          padding={pageType && pageType === "view" ? "" : "5px"}
                          key={field._id}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          width={"49%"}
                        >
                          <ReportTemplate.LifeguardFieldAutoPopulate
                            field={field}
                            onChange={onChangeHandle}
                          />
                          {/* <Flex flexDirection={"column"}>
                            <FormLabel fontSize={"12px"}>
                              Attendance Proof
                            </FormLabel>
                            <Image
                              src={field?.src || uploadImage?.src}
                              mb={"5px"}
                              width={"120px"}
                              alt="image upload"
                            />
                          </Flex> */}
                          <Flex
                            flexDirection={"column"}
                            alignItems={"end"}
                            columnGap={"2px"}
                          >
                            <MoveItem
                              field={field}
                              fieldsToSwitch={fieldsToSwitch}
                              setFieldsToSwitch={setFieldsToSwitch}
                              resetClick={resetClick}
                              setResetClick={setResetClick}
                            />
                            <Flex justifyContent={"end"} columnGap={"2px"}>
                              {fieldsToSwitch.length === 0 && (
                                <UdOperations
                                  field={field}
                                  editItem={editItem}
                                  deleteItem={deleteItem}
                                />
                              )}
                            </Flex>
                          </Flex>
                        </Flex>
                      );
                    }
                    // Manual
                    if (
                      field.type === "text" ||
                      field.type === "password" ||
                      field.type === "number" ||
                      field.type === "email"
                    ) {
                      return (
                        <Flex
                          background={
                            pageType && pageType === "view" ? "" : "white.200"
                          }
                          borderRadius={"10px"}
                          padding={pageType && pageType === "view" ? "" : "5px"}
                          key={field._id}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          columnGap={"2px"}
                          width={"49%"}
                        >
                          <ReportTemplate.InputText
                            field={field}
                            onChange={onChangeHandle}
                          />
                          <Flex
                            flexDirection={"column"}
                            alignItems={"end"}
                            columnGap={"2px"}
                          >
                            <MoveItem
                              field={field}
                              fieldsToSwitch={fieldsToSwitch}
                              setFieldsToSwitch={setFieldsToSwitch}
                              resetClick={resetClick}
                              setResetClick={setResetClick}
                            />
                            <Flex justifyContent={"end"} columnGap={"2px"}>
                              {fieldsToSwitch.length === 0 && (
                                <UdOperations
                                  field={field}
                                  editItem={editItem}
                                  deleteItem={deleteItem}
                                />
                              )}
                            </Flex>
                          </Flex>
                        </Flex>
                      );
                    }
                    if (field.type === "textarea") {
                      return (
                        <Flex
                          background={
                            pageType && pageType === "view" ? "" : "white.200"
                          }
                          borderRadius={"10px"}
                          padding={pageType && pageType === "view" ? "" : "5px"}
                          key={field._id}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          columnGap={"2px"}
                          width={"100%"}
                        >
                          <ReportTemplate.TextArea field={field} />
                          <Flex
                            flexDirection={"column"}
                            alignItems={"end"}
                            columnGap={"2px"}
                          >
                            <MoveItem
                              field={field}
                              fieldsToSwitch={fieldsToSwitch}
                              setFieldsToSwitch={setFieldsToSwitch}
                              resetClick={resetClick}
                              setResetClick={setResetClick}
                            />
                            <Flex justifyContent={"end"} columnGap={"2px"}>
                              {fieldsToSwitch.length === 0 && (
                                <UdOperations
                                  field={field}
                                  editItem={editItem}
                                  deleteItem={deleteItem}
                                />
                              )}
                            </Flex>
                          </Flex>
                        </Flex>
                      );
                    }
                    if (field.type === "select") {
                      return (
                        <Flex
                          background={
                            pageType && pageType === "view" ? "" : "white.200"
                          }
                          borderRadius={"10px"}
                          padding={pageType && pageType === "view" ? "" : "5px"}
                          key={field._id}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          columnGap={"2px"}
                          width={"49%"}
                        >
                          <ReportTemplate.SelectField
                            field={field}
                            onChange={onChangeHandle}
                          />
                          <Flex
                            flexDirection={"column"}
                            alignItems={"end"}
                            columnGap={"2px"}
                          >
                            <MoveItem
                              field={field}
                              fieldsToSwitch={fieldsToSwitch}
                              setFieldsToSwitch={setFieldsToSwitch}
                              resetClick={resetClick}
                              setResetClick={setResetClick}
                            />
                            <Flex justifyContent={"end"} columnGap={"2px"}>
                              {fieldsToSwitch.length === 0 && (
                                <UdOperations
                                  field={field}
                                  editItem={editItem}
                                  deleteItem={deleteItem}
                                />
                              )}
                            </Flex>
                          </Flex>
                        </Flex>
                      );
                    }
                    if (field.type === "date") {
                      return (
                        <Flex
                          background={
                            pageType && pageType === "view" ? "" : "white.200"
                          }
                          borderRadius={"10px"}
                          padding={pageType && pageType === "view" ? "" : "5px"}
                          key={field._id}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          columnGap={"2px"}
                          width={"49%"}
                        >
                          <ReportTemplate.DatePicker
                            field={field}
                            onChange={onChangeHandle}
                          />
                          <Flex
                            flexDirection={"column"}
                            alignItems={"end"}
                            columnGap={"2px"}
                          >
                            <MoveItem
                              field={field}
                              fieldsToSwitch={fieldsToSwitch}
                              setFieldsToSwitch={setFieldsToSwitch}
                              resetClick={resetClick}
                              setResetClick={setResetClick}
                            />
                            <Flex justifyContent={"end"} columnGap={"2px"}>
                              {fieldsToSwitch.length === 0 && (
                                <UdOperations
                                  field={field}
                                  editItem={editItem}
                                  deleteItem={deleteItem}
                                />
                              )}
                            </Flex>
                          </Flex>
                        </Flex>
                      );
                    }
                    if (field.type === "mcqs") {
                      return (
                        <Flex
                          background={
                            pageType && pageType === "view" ? "" : "white.200"
                          }
                          borderRadius={"10px"}
                          padding={pageType && pageType === "view" ? "" : "5px"}
                          key={field._id}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          columnGap={"2px"}
                          width={"100%"}
                        >
                          <ReportTemplate.Mcqs
                            field={field}
                            onChange={onChangeHandle}
                          />
                          <Flex
                            flexDirection={"column"}
                            alignItems={"end"}
                            columnGap={"2px"}
                          >
                            <MoveItem
                              field={field}
                              fieldsToSwitch={fieldsToSwitch}
                              setFieldsToSwitch={setFieldsToSwitch}
                              resetClick={resetClick}
                              setResetClick={setResetClick}
                            />
                            <Flex justifyContent={"end"} columnGap={"2px"}>
                              {fieldsToSwitch.length === 0 && (
                                <UdOperations
                                  field={field}
                                  editItem={editItem}
                                  deleteItem={deleteItem}
                                />
                              )}
                            </Flex>
                          </Flex>
                        </Flex>
                      );
                    }
                    if (field.type === "image") {
                      return (
                        <Flex
                          background={
                            pageType && pageType === "view" ? "" : "white.200"
                          }
                          borderRadius={"10px"}
                          padding={pageType && pageType === "view" ? "" : "5px"}
                          key={field._id}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          columnGap={"2px"}
                          width={"49%"}
                        >
                          {/* <ReportTemplate.File accept="image/*" field={field} /> */}
                          <Flex flexDirection={"column"}>
                            <FormLabel fontSize={"12px"}>
                              Select Image To Upload
                            </FormLabel>
                            <Image
                              src={field?.src || uploadImage?.src}
                              width={"120px"}
                              mb={"5px"}
                              alt="image upload"
                            />
                          </Flex>

                          <Flex
                            flexDirection={"column"}
                            alignItems={"end"}
                            columnGap={"2px"}
                          >
                            <MoveItem
                              field={field}
                              fieldsToSwitch={fieldsToSwitch}
                              setFieldsToSwitch={setFieldsToSwitch}
                              resetClick={resetClick}
                              setResetClick={setResetClick}
                            />
                            <Flex justifyContent={"end"} columnGap={"2px"}>
                              <UdOperations
                                field={field}
                                deleteItem={deleteItem}
                              />
                            </Flex>
                          </Flex>
                        </Flex>
                      );
                    }
                    if (field.type === "video") {
                      return (
                        <Flex
                          background={
                            pageType && pageType === "view" ? "" : "white.200"
                          }
                          borderRadius={"10px"}
                          padding={pageType && pageType === "view" ? "" : "5px"}
                          key={field._id}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          columnGap={"2px"}
                          width={"49%"}
                        >
                          {/* <ReportTemplate.File accept="video/*" field={field} /> */}
                          <Flex flexDirection={"column"}>
                            <FormLabel fontSize={"12px"}>
                              Select Video To Upload
                            </FormLabel>
                            <Image
                              src={field?.src || uploadVideo?.src}
                              width={"120px"}
                              mb={"5px"}
                              alt="video upload"
                            />
                          </Flex>
                          <Flex
                            flexDirection={"column"}
                            alignItems={"end"}
                            columnGap={"2px"}
                          >
                            <MoveItem
                              field={field}
                              fieldsToSwitch={fieldsToSwitch}
                              setFieldsToSwitch={setFieldsToSwitch}
                              resetClick={resetClick}
                              setResetClick={setResetClick}
                            />
                            <Flex justifyContent={"end"} columnGap={"2px"}>
                              <UdOperations
                                field={field}
                                deleteItem={deleteItem}
                              />
                            </Flex>
                          </Flex>
                        </Flex>
                      );
                    }
                    if (field.type === "heading") {
                      return (
                        <Flex
                          background={
                            pageType && pageType === "view" ? "" : "white.200"
                          }
                          borderRadius={"10px"}
                          padding={pageType && pageType === "view" ? "" : "5px"}
                          key={field._id}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          columnGap={"2px"}
                          width={"100%"}
                          minHeight={"70px"}
                        >
                          <h4 className="overflow-auto font-bold capitalize">
                            {field?.label}:
                          </h4>
                          <Flex
                            flexDirection={"column"}
                            alignItems={"end"}
                            columnGap={"2px"}
                          >
                            <MoveItem
                              field={field}
                              fieldsToSwitch={fieldsToSwitch}
                              setFieldsToSwitch={setFieldsToSwitch}
                              resetClick={resetClick}
                              setResetClick={setResetClick}
                            />
                            <Flex justifyContent={"end"} columnGap={"2px"}>
                              {fieldsToSwitch.length === 0 && (
                                <UdOperations
                                  field={field}
                                  editItem={editItem}
                                  deleteItem={deleteItem}
                                />
                              )}
                            </Flex>
                          </Flex>
                        </Flex>
                      );
                    }
                    if (field.type === "paragraph") {
                      return (
                        <Flex
                          background={
                            pageType && pageType === "view" ? "" : "white.200"
                          }
                          borderRadius={"10px"}
                          padding={pageType && pageType === "view" ? "" : "5px"}
                          key={field._id}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          columnGap={"2px"}
                          width={"100%"}
                          minHeight={"70px"}
                        >
                          <p className="overflow-auto text-[14px]">
                            {field?.label}.
                          </p>
                          <Flex
                            flexDirection={"column"}
                            alignItems={"end"}
                            columnGap={"2px"}
                          >
                            <MoveItem
                              field={field}
                              fieldsToSwitch={fieldsToSwitch}
                              setFieldsToSwitch={setFieldsToSwitch}
                              resetClick={resetClick}
                              setResetClick={setResetClick}
                            />
                            <Flex justifyContent={"end"} columnGap={"2px"}>
                              {fieldsToSwitch.length === 0 && (
                                <UdOperations
                                  field={field}
                                  editItem={editItem}
                                  deleteItem={deleteItem}
                                />
                              )}
                            </Flex>
                          </Flex>
                        </Flex>
                      );
                    }
                    if (field.type === "attachment") {
                      return (
                        <Flex
                          background={
                            pageType && pageType === "view" ? "" : "white.200"
                          }
                          borderRadius={"10px"}
                          padding={pageType && pageType === "view" ? "" : "5px"}
                          key={field._id}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          columnGap={"2px"}
                          width={"49%"}
                        >
                          {/* <ReportTemplate.File accept="image/*" field={field} /> */}
                          <Flex flexDirection={"column"}>
                            <FormLabel fontSize={"12px"}>
                              Upload Attachment
                            </FormLabel>
                            <Image
                              src={field?.src || uploadFile?.src}
                              width={"120px"}
                              mb={"5px"}
                              alt="upload file"
                            />
                          </Flex>

                          <Flex
                            flexDirection={"column"}
                            alignItems={"end"}
                            columnGap={"2px"}
                          >
                            <MoveItem
                              field={field}
                              fieldsToSwitch={fieldsToSwitch}
                              setFieldsToSwitch={setFieldsToSwitch}
                              resetClick={resetClick}
                              setResetClick={setResetClick}
                            />
                            <Flex justifyContent={"end"} columnGap={"2px"}>
                              <UdOperations
                                field={field}
                                deleteItem={deleteItem}
                              />
                            </Flex>
                          </Flex>
                        </Flex>
                      );
                    }
                    return null;
                  })}
                  {error && (
                    <Alert status="error" mt="15px">
                      <AlertIcon />
                      {error}
                    </Alert>
                  )}
                </Flex>
                {DropZone && <DropZone />}
                <hr style={{ marginTop: "20px" }} />
                <Flex justifyContent={"end"} columnGap={"2px"}>
                  <Core.Button btnOrangeMd isDisabled={true}>
                    Submit Report
                  </Core.Button>
                </Flex>
              </Flex>
            </Card>
          </Box>
        </>
      )}
    </>
  );
};
export default memo(ReportForm);
