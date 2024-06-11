import {
  Box,
  Card,
  Flex,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";

import { Core } from "@/components";
import type {
  AddPointOffInterestMutation,
  PointOfInterestInput,
  UpdatePointOffInterestMutation,
  UpdatePointOfInterestInput,
} from "@/graphql/generated/graphql";
import { EPointOfAttraction } from "@/graphql/generated/graphql";
import {
  AddPointOffInterest,
  queryClient,
  UpdatePointOffInterest,
} from "@/services/api";

interface SubTask {
  detail: string;
  completed: boolean;
}

interface ActionAttractionFormProps {
  userId: string;
  data?: any;
  type: string;
  onClose: () => void;
}

const options = [
  {
    name: "Utility",
    value: EPointOfAttraction.Utility,
  },
  {
    name: "Attraction",
    value: EPointOfAttraction.Attraction,
  },
];

const ActionAttractionForm: React.FC<ActionAttractionFormProps> = ({
  userId,
  data,
  type,
  onClose,
}) => {
  const { query } = useRouter();
  const [fail, setFail] = useState<IAlertSuccessData>();
  const [success, setSuccess] = useState<IAlertSuccessData>();
  const [selectedType, setSelectedType] = useState<EPointOfAttraction>(
    data?.type || EPointOfAttraction.Utility
  );
  const [name, setName] = useState<string>(data?.name || "");
  const [subTask, setSubTask] = useState<string>("");
  const [values, setValues] = useState<{ subtasks: SubTask[] }>({
    subtasks: [],
  });

  const {
    mutate: mutateAddPointOfInterest,
    isLoading: addPointOfInterestIsLoading,
  } = useMutation<AddPointOffInterestMutation, unknown, PointOfInterestInput>(
    (variables) => AddPointOffInterest({ pointOfInterestInput: variables }),
    {
      onSuccess: () => {
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
    }
  );

  const {
    mutate: mutateUpdatePointOfInterest,
    isLoading: updatePointOfInterestIsLoading,
  } = useMutation<
    UpdatePointOffInterestMutation,
    unknown,
    UpdatePointOfInterestInput
  >(
    (variables) =>
      UpdatePointOffInterest({ updatePointOfInterestInput: variables }),
    {
      onSuccess: () => {
        setSuccess({
          status: true,
          title: "Success",
          description: "Updated",
        });
        queryClient.invalidateQueries({ queryKey: ["getPointOfInterest"] });
        setTimeout(() => {
          onClose();
        }, 2000);
      },
      onError: (_: any) => {
        setFail({
          status: true,
          title: "Error",
          description: _?.response?.errors[0]?.message,
        });
      },
    }
  );

  const deleteItem = (index: number) => {
    const updatedSubTasks = values.subtasks.filter((_, i) => i !== index);
    setValues({ ...values, subtasks: updatedSubTasks });
  };

  const addSubtask = () => {
    if (subTask.trim() !== "") {
      const newSubTask: SubTask = {
        detail: subTask,
        completed: false,
      };

      setValues({ ...values, subtasks: [...values.subtasks, newSubTask] });
      setSubTask("");
    }
  };

  useEffect(() => {
    if (type === "view" || type === "edit") {
      if (data && data.type) {
        setSelectedType(data.type);
      }
    }
  }, [type, data]);

  useEffect(() => {
    if (data && data.points) {
      const subtasks: SubTask[] = data.points.map((point: string) => ({
        completed: false, // Set your initial value for completion status
        detail: point,
      }));
      setValues({ subtasks });
    }
  }, [data]);

  const handleSubmit = () => {
    if (type === "edit" && data?._id) {
      mutateUpdatePointOfInterest({
        _id: data._id,
        name,
        type: selectedType,
        points: values.subtasks.map((_: any) => _.detail) as string[],
      });
    } else {
      mutateAddPointOfInterest({
        createdByRef: userId,
        belongsToFacilityRef: query.id as string,
        name,
        type: selectedType,
        points: values.subtasks.map((_: any) => _.detail) as string[],
      });
    }
  };

  return (
    <>
      <Core.Alert show={success} theme="success" />
      <Core.Alert show={fail} theme="error" />
      <FormControl width={"200px"} mx="auto">
        <Card
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"100%"}
          minHeight="40px"
          backgroundColor={"white.200"}
          padding={"10px"}
        >
          <RadioGroup
            value={selectedType}
            onChange={(value) => setSelectedType(value as EPointOfAttraction)}
          >
            <Stack spacing={5} direction="row">
              {options.map((item, index) => (
                <Radio
                  key={index}
                  colorScheme="green"
                  value={item.value}
                  isDisabled={type === "view"}
                >
                  {item.name}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </Card>
      </FormControl>
      <Flex flexDirection={"column"} rowGap={"10px"}>
        <FormControl>
          <FormLabel htmlFor="name" fontWeight={"normal"}>
            Name
          </FormLabel>
          <Core.Input
            id="name"
            name="name"
            placeholder="Name"
            value={name || ""}
            onChange={(_) => {
              setName(_.target.value);
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Elements:</FormLabel>
          <Box
            flexDirection="column"
            alignItems="center"
            borderRadius="15px"
            backgroundColor="white.200"
            padding="10px 5px"
          >
            <Flex flexWrap={"wrap"} gap={"5px"}>
              {values?.subtasks?.map((option, index) => (
                <Box
                  key={index}
                  px="10px"
                  py="5px"
                  borderRadius="10px"
                  // backgroundColor="#fafafa"
                  backgroundColor="white.100"
                >
                  <Flex justifyContent="space-between">
                    <Box>{option.detail}</Box>
                    {type !== "view" && (
                      <Box
                        as="button"
                        color="red"
                        fontSize="20px"
                        className="ml-[15px] cursor-pointer rounded-[20px] hover:bg-[#f5c3c3]"
                        onClick={() => deleteItem(index)}
                      >
                        &#10006;
                      </Box>
                    )}
                  </Flex>
                </Box>
              ))}
            </Flex>
          </Box>
          {type !== "view" && (
            <Flex justifyContent="end" columnGap="10px" mt="10px">
              <Core.Input
                placeholder="Add Elements"
                type="text"
                onChange={(e) => setSubTask(e.currentTarget.value)}
                value={subTask}
              />
              <Core.IconicButton
                button="add"
                className="w-[70px]"
                size={"md"}
                onClick={addSubtask}
              ></Core.IconicButton>
            </Flex>
          )}
        </FormControl>
      </Flex>
      <Flex justifyContent="end" columnGap={"5px"}>
        {type !== "view" && (
          <>
            <Core.Button btnGrayMd onClick={onClose}>
              Cancel
            </Core.Button>
            <Core.Button
              btnOrangeMd
              onClick={handleSubmit}
              isLoading={
                addPointOfInterestIsLoading || updatePointOfInterestIsLoading
              }
            >
              {type === "edit" ? `Edit` : `Add`}
            </Core.Button>
          </>
        )}
      </Flex>
    </>
  );
};

export default ActionAttractionForm;
