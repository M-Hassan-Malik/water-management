import {
  Box,
  Card,
  Flex,
  FormControl,
  FormLabel,
  useDisclosure,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";

import { Core } from "@/components";
import { HandleLogout } from "@/components/auth";
import type { PointOfInterest } from "@/graphql/generated/graphql";
import {
  AddPectoraAuth,
  DeletePointOffInterest,
  GetPointsOfInterest,
  queryClient,
} from "@/services/api";

import { addValidationSchema } from "./attraction_listing.validator";

const actions = { view: true, edit: true, delete: true };

interface AttractionsListingProps {}
interface RequiredFieldsType {
  X_Auth_Id: string;
  X_Auth_Token: string;
}

const AttractionsListing: React.FC<AttractionsListingProps> = () => {
  const { query } = useRouter();
  const [fail, setFail] = useState<IAlertSuccessData>();
  const [success, setSuccess] = useState<IAlertSuccessData>();
  const [idToDelete, setIdToDelete] = useState<string>("");
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState<any>(null); // Initialized with a default value
  const [modalType, setModalType] = useState<string>("addAttraction"); // Initialized with a default value
  const [pointOfInterests, setPointOfInterests] = useState<
    PointOfInterest[] | any[]
  >();
  const columns = ["name", "type", "action"];

  const openModal = () => {
    onOpen();
    setData(null);
    setModalType("addAttraction");
  };

  const { isFetching } = useQuery(
    ["getPointOfInterest"],
    () => GetPointsOfInterest({ facilityId: query.id as string }),
    {
      onSuccess: ({ getPointsOfInterest }) => {
        setPointOfInterests(getPointsOfInterest);
      },
      onError(_: any) {
        if (
          _?.response?.errors?.length &&
          _?.response?.errors[0]?.message === "Not Authorised!"
        )
          HandleLogout();
      },
      // Enable the query when userId is truthy
      enabled: true,
      refetchOnMount: true,
    }
  );

  const { mutate } = useMutation(DeletePointOffInterest, {
    onSuccess: ({ deletePointOffInterest }) => {
      setSuccess({
        status: true,
        title: "Success",
        description: deletePointOffInterest.message || "",
      });
      queryClient.invalidateQueries({ queryKey: ["getPointOfInterest"] });
      onClose();
    },
    onError: (_: any) => {
      setFail({
        status: true,
        title: "Failed",
        description: _?.response?.errors[0]?.message,
      });
    },
  });

  const { mutate: AddPectoraAuthMutation } = useMutation(AddPectoraAuth, {
    onSuccess: ({ addPectoraAuth }) => {
      setSuccess({
        status: true,
        title: "Success",
        description: addPectoraAuth,
      });
      onClose();
    },
    onError: (_: any) => {
      setFail({
        status: true,
        title: "Failed",
        description: _?.response?.errors[0]?.message,
      });
    },
  });

  const { handleSubmit, handleChange, values, errors, touched } =
    useFormik<RequiredFieldsType>({
      initialValues: {
        X_Auth_Id: "",
        X_Auth_Token: "",
      },
      enableReinitialize: true,

      onSubmit: (inputValues) => {
        AddPectoraAuthMutation({
          addPectoraAuthInput: {
            X_Auth_Id: inputValues.X_Auth_Id,
            X_Auth_Token: inputValues.X_Auth_Token,
            facilityId: query.id as string,
          },
        });
        onClose();
      },
      validationSchema: addValidationSchema,
    });

  const onViewClick = (id: any) => {
    onOpen();
    const selectedAttraction = pointOfInterests?.find(
      (attraction) => String(attraction._id) === String(id)
    );
    if (selectedAttraction) {
      setModalType("viewAttraction");
      setData({ ...selectedAttraction });
    } else {
      setModalType("addAttraction");
    }
  };
  const onEditClick = (id: any) => {
    onOpen();
    const selectedAttraction = pointOfInterests?.find(
      (attraction) => String(attraction._id) === String(id)
    );
    if (selectedAttraction) {
      setModalType("editAttraction");
      setData(selectedAttraction);
    } else {
      setModalType("addAttraction");
    }
  };

  const onDeleteClick = (id: any) => {
    setIdToDelete(id);
    onOpenDelete();
  };
  const confirmAction = (id: string) => {
    mutate({ id });
    onCloseDelete();
  };

  return (
    <>
      <Core.Alert show={success} theme="success" />
      <Core.Alert show={fail} theme="error" />
      {/* ----- for edit ----- */}
      <Core.ModalMd
        isOpen={isOpen}
        onClose={onClose}
        id={"44"}
        DoubleXl
        type={modalType}
        data={data}
      />
      {/* ----- for Delete ----- */}
      <Core.Modal
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        onClick={confirmAction}
        id={idToDelete}
      />
      {/* ----- Points Of Interest ----- */}
      <Box mt="10px">
        <Core.Table
          heading={"Points Of Interest"}
          actionButton={{
            name: "Add Attraction",
            action: openModal,
          }}
          id="attractions-listing"
          tableData={pointOfInterests?.length ? (pointOfInterests as any) : []}
          columns={columns}
          shadow
          isLoading={isFetching}
          actions={actions}
          onViewClick={onViewClick}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
        />
      </Box>
      {/* ----- Pectora Tokens ----- */}
      <Card mt="10px" p={4} backgroundColor={"white.100"}>
        <Core.H5 color="textColor">Pectora Authentication</Core.H5>

        <Flex columnGap={"2%"} mt={"10px"}>
          <FormControl
            isRequired
            width={"49%"}
            mb="10px"
            isInvalid={!!errors.X_Auth_Id && touched.X_Auth_Id}
          >
            <FormLabel>X-Auth-Id</FormLabel>
            <Core.Input
              title="X_Auth_Id"
              name="X_Auth_Id"
              placeholder="Enter X-Auth-Id"
              type="text"
              onChange={handleChange}
              value={values.X_Auth_Id}
              errorBorderColor="red.300"
              error={errors.X_Auth_Id}
              touched={touched.X_Auth_Id}
            />
          </FormControl>
          <FormControl
            isRequired
            width={"49%"}
            mb="10px"
            isInvalid={!!errors.X_Auth_Token && touched.X_Auth_Token}
          >
            <FormLabel>X-Auth-Token</FormLabel>
            <Core.Input
              title="X_Auth_Token"
              name="X_Auth_Token"
              placeholder="Enter X-Auth-Token"
              type="text"
              onChange={handleChange}
              value={values.X_Auth_Token}
              errorBorderColor="red.300"
              error={errors.X_Auth_Token}
              touched={touched.X_Auth_Token}
            />
          </FormControl>
        </Flex>
        <Flex>
          <Core.Button btnOrangeMd size="md" onClick={handleSubmit}>
            Add Pectora Auths
          </Core.Button>
        </Flex>
      </Card>
    </>
  );
};

export default AttractionsListing;
