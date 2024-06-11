import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Image,
  // FormLabel,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";

import type {
  ActivityLogInput,
  CreateActivityLogMutation,
} from "@/graphql/generated/graphql";
import { EmployeeType, Interface } from "@/graphql/generated/graphql";
import {
  AddTrainingSession,
  CreateActivityLog,
  GetFacilities,
  GetTrainingById,
  UpdateTraining,
} from "@/services/api";
import { getUniqueNumberDynamic } from "@/utils/helpers/functions";
import getPathSizeFromS3 from "@/utils/helpers/get_path_size_s3";

import imagePlaceholder from "../../assets/images/placeholder-image.png";
import videoPlaceholder from "../../assets/images/placeholder-video.png";
import { Core } from "..";
import { LoadingComponent } from "../core";
import { Icons } from "../icons";

interface TrainingActionsProps {
  pageType: PageType;
}

interface Slot {
  text: string;
  image: any;
  video: any;
}

interface IFacilitiesData {
  value: string;
  name: string;
}

const TrainingActions: React.FC<TrainingActionsProps> = ({ pageType }) => {
  const { push, query } = useRouter();
  const user: IUser = useSelector((state: any) => state.user.user);
  const [sessionName, setSessionName] = useState<string>("");
  const [sessionFacility, setSessionFacility] = useState<IFacilitiesData>();
  const [success, setSuccess] = useState<IAlertSuccessData>();
  const [fail, setFail] = useState<IAlertSuccessData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploadedVideos, setUploadedVideos] = useState<string[]>([]);
  const [facilities, setFacilities] = useState<IFacilitiesData[]>([]);

  const evaluateClient = (): boolean => {
    return (
      Boolean(user.company._id) &&
      user.company.employeeType !== (EmployeeType.Pectora as any) &&
      user.company.employeeType !== (EmployeeType.Imported as any)
    );
  };

  useQuery(
    ["getTrainingById", query?.id],
    () => GetTrainingById({ trainingId: String(query?.id) }),
    {
      onSuccess: ({ getTrainingById }) => {
        if (getTrainingById) {
          setSessionName(getTrainingById.title);
          setSessionFacility({
            name: getTrainingById.facility.facility,
            value: String(getTrainingById.facility._id),
          } as IFacilitiesData);

          const sessionSlots: any = getTrainingById?.sessions?.map(
            (_) =>
              ({
                text: _?.detail as any | "",
                image: _?.image?.data as any | "",
                video: _.video?.data as any | "",
              } as Slot)
          );
          setSlots(sessionSlots);
        }
      },
      onError: (_: any) => {
        setFail({
          status: true,
          title: "Something went wrong",
          description: _?.response?.errors[0]?.message,
        });
      },
      enabled: Boolean(query?.id) && pageType !== "create",
      refetchOnMount: true,
    }
  );

  useQuery(
    "getFacilitiesForAddTraining",
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
      enabled: evaluateClient(),
      refetchOnMount: true,
    }
  );

  const { mutate: activityLogMutation } = useMutation<
    CreateActivityLogMutation,
    unknown,
    ActivityLogInput
  >((variables) => CreateActivityLog({ activityLogInput: variables }));

  const { mutate: addMutation } = useMutation(
    "TrainingSessionCreation",
    AddTrainingSession,
    {
      onSuccess: () => {
        setIsLoading(false);
        setSuccess({
          status: true,
          description: "Training Added Successfully.",
          title: "Success",
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
          activity: "Training Added",
        });

        setTimeout(() => {
          push("/trainings");
        }, 1000);
      },
      onError: (_: any) => {
        setIsLoading(false);
        setFail({
          status: true,
          title: "Failed",
          description: _?.response?.errors[0]?.message,
        });
      },
    }
  );

  const { mutate: editMutation } = useMutation(
    "updateTraining",
    UpdateTraining,
    {
      onSuccess: () => {
        setIsLoading(false);
        setSuccess({
          status: true,
          title: "Success",
          description: "Training Updated Successfully.",
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
          activity: "Training Edited",
        });

        setTimeout(() => {
          push("/trainings");
        }, 1000);
      },
      onError: (_: any) => {
        setIsLoading(false);
        setFail({
          status: true,
          title: "Updating Failed",
          description: _?.response?.errors[0]?.message,
        });
      },
    }
  );

  const handleAddSlot = () => {
    setSlots([...slots, { text: "", image: "", video: "" }]);
    setUploadedImages([...uploadedImages, ""]);
    setUploadedVideos([...uploadedVideos, ""]);
  };

  const handleDeleteSlot = (index: number) => {
    setIsLoading(true);
    const updatedSlots = [...slots];
    const updatedImages = [...uploadedImages];
    const updatedVideos = [...uploadedVideos];

    updatedSlots.splice(index, 1);
    updatedImages.splice(index, 1);
    updatedVideos.splice(index, 1);

    setSlots(updatedSlots);
    setUploadedImages(updatedImages);
    setUploadedVideos(updatedVideos);
    setIsLoading(false);
  };

  const handleSlotChange = (
    index: number,
    field: keyof Slot,
    value: string
  ) => {
    const updatedSlots: Slot[] = [...slots];
    const updatedSlot = {
      ...updatedSlots[index],
      [field]: value,
    };
    updatedSlots[index] = updatedSlot as unknown as Slot;
    setSlots(updatedSlots);
  };

  const handleSessionNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSessionName(event.target.value);
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    if (!sessionName) {
      setFail({
        status: true,
        title: "Error",
        description: "Please add a Training Name",
      });
      setIsLoading(false);
      return;
    }
    if (!sessionFacility?.value) {
      setFail({
        status: true,
        title: "Error",
        description: "Please add a Training Facility",
      });

      setIsLoading(false);
      return;
    }
    if (!slots.length) {
      setFail({
        status: true,
        title: "Error",
        description: "Please add a Training Slot",
      });
      setIsLoading(false);
      return;
    }
    const finalSlots: ISessions[] = [];
    try {
      for (const _ of slots) {
        const temp: ISessions = {
          detail: _.text,
        };

        if (_?.image) {
          if (typeof _.image === "string")
            temp.image = { data: _.image, complete: false };
          else {
            const response = await axios.post(
              `${process.env.FRONT_END_URL}/api/s3/uploadFile`,
              _.image
            );
            temp.image = {
              data: response?.data?.results[0]?.Location || "",
              complete: false,
            };
            delete temp.video;
          }
        } else if (_?.video) {
          if (typeof _.video === "string") {
            temp.video = { data: _.video || "", complete: false };
          } else {
            const response = await axios.post(
              `${process.env.FRONT_END_URL}/api/s3/uploadFile`,
              _.video
            );
            temp.video = {
              data: response?.data?.results[0]?.Location || "",
              complete: false,
            };
            delete temp.image;
          }
        } else if (!_?.video && !_?.image && _.text) {
          delete temp.image;
          delete temp.video;
        } else {
          setFail({
            status: true,
            title: "Error",
            description: "Please, add Media or text in the slot",
          });
          setIsLoading(false);
          return;
        }

        finalSlots.push(temp);
      }

      if (user._id && finalSlots.length) {
        if (pageType === "create")
          addMutation({
            addTrainingSessionInput: {
              createdBy: user._id,
              title: sessionName,
              facility: sessionFacility.value,
              sessions: finalSlots,
            },
          });
        else if (Boolean(query?.id) && pageType === "edit")
          editMutation({
            updateTrainingInput: {
              _id: String(query.id),
              title: sessionName,
              facility: sessionFacility.value,
              sessions: finalSlots,
            },
          });
      }
      setIsLoading(false);
    } catch (_: any) {
      setFail({
        status: true,
        title: "Error",
        description: "Internal Error",
      });
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setIsLoading(true);
    const file = event.target.files?.[0]; // Get the selected file
    if (!file?.size) {
      setFail({
        status: true,
        title: "Upload Failed",
        description: "Inappropriate image file",
      });
      setIsLoading(false);
      return;
    }

    // Get storage available in the S3
    const folderPath: string = `${user._id}/`;
    const pathResult = await getPathSizeFromS3(folderPath);

    if (pathResult.status && pathResult.data && user?.package?.sizeInGB) {
      // convert GB to Bytes and remove -ve sign
      const storageAvailableInBytes: number = Math.abs(
        user.package.sizeInGB * 1024 ** 3 - pathResult.data.sizeInBytes
      );

      if (storageAvailableInBytes < file.size) {
        setFail({
          status: true,
          title: "Upload Failed",
          description:
            "You do not have sufficient space to upload the file of this size",
        });
        setIsLoading(false);
        return;
      }
    }

    if (file) {
      const fileName =
        pageType === "edit"
          ? slots[index]?.image ||
            slots[index]?.video ||
            `${user._id}/${getUniqueNumberDynamic()}`
          : `${user._id}/${getUniqueNumberDynamic()}`;

      const formData = new FormData();
      formData.append(fileName, file as any);

      const reader = new FileReader(); // Create a FileReader object
      reader.onload = (e) => {
        const uploadedImageFromInput = e.target?.result as string; // Get the image data
        // Update the relevant slot and uploaded images in the state
        setSlots((prevSlots) => {
          const updatedSlots = [...prevSlots];

          const updatedSlot = {
            ...updatedSlots[index],
            image: formData,
            video: null,
          };

          updatedSlots[index] = updatedSlot as unknown as Slot;
          return updatedSlots;
        });
        setUploadedImages((prevImages) => {
          const updatedImages = [...prevImages];
          updatedImages[index] = uploadedImageFromInput;
          return updatedImages;
        });
        setUploadedVideos((prevVideos) => {
          const updatedVideos = [...prevVideos];
          updatedVideos[index] = "";
          return updatedVideos;
        });
        setIsLoading(false);
      };
      reader.readAsDataURL(file); // Read the file as data URL
    }
  };

  const handleVideoUpload = async (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setIsLoading(true);
    const file = event.target.files?.[0]; // Get the selected file

    if (!file?.size) {
      setFail({
        status: true,
        title: "Upload Failed",
        description: "Inappropriate video file",
      });
      setIsLoading(false);
      return;
    }

    // Get storage available in the S3
    const folderPath: string = `${user._id}/`;
    const pathResult = await getPathSizeFromS3(folderPath);

    if (pathResult.status && pathResult.data && user?.package?.sizeInGB) {
      // convert GB to Bytes and remove -ve sign
      const storageAvailableInBytes: number = Math.abs(
        user.package.sizeInGB * 1024 ** 3 - pathResult.data.sizeInBytes
      );

      if (storageAvailableInBytes < file.size) {
        setFail({
          status: true,
          title: "Upload Failed",
          description:
            "You do not have sufficient space to upload the file of this size",
        });
        setIsLoading(false);
        return;
      }
    }

    if (file) {
      const fileName =
        pageType === "edit"
          ? slots[index]?.video ||
            slots[index]?.image ||
            `${user._id}/${getUniqueNumberDynamic()}`
          : `${user._id}/${getUniqueNumberDynamic()}`;

      const formData = new FormData();
      formData.append(fileName, file as any);

      //= =======================
      const reader = new FileReader(); // Create a FileReader object
      // console.log("uploadedImages", uploadedImages);
      reader.onload = (e) => {
        const uploadedVideoFromInput = e.target?.result as string; // Get the video data
        // Update the relevant slot and uploaded videos in the state
        setSlots((prevSlots) => {
          const updatedSlots = [...prevSlots];

          const updatedSlot = {
            ...updatedSlots[index],
            video: formData,
            image: null,
          };
          updatedSlots[index] = updatedSlot as unknown as Slot;
          return updatedSlots;
        });
        setUploadedVideos((prevVideos) => {
          const updatedVideos = [...prevVideos];
          updatedVideos[index] = uploadedVideoFromInput;
          return updatedVideos;
        });
        setUploadedImages((prevImages) => {
          const updatedImages = [...prevImages];
          updatedImages[index] = "";
          return updatedImages;
        });
        setIsLoading(false);
      };
      reader.readAsDataURL(file); // Read the file as data URL
    }
  };

  return (
    <Flex
      justifyContent="center"
      maxWidth={"1000px"}
      borderRadius="10px"
      boxShadow="0px 2px 5px 2px rgba(0,0,0,0.05)"
      backgroundColor="white.100"
      padding="20px"
      mx={"auto"}
    >
      <Core.Alert show={success} theme="success" />
      <Core.Alert show={fail} theme="error" />
      <Box width="100%" maxWidth="1200px" position={"relative"}>
        {isLoading && (
          <Flex
            position={"absolute"}
            justify={"center"}
            pt={"100px"}
            height={"100%"}
            width={"100%"}
            zIndex={20}
            bgColor={"rgba(0,0,0,0.3)"}
            rounded={"10px"}
            py={"50px"}
          >
            <LoadingComponent
              minH={"0"}
              text={" Please wait, Processing File..."}
            />
          </Flex>
        )}
        {evaluateClient() && (
          <FormControl isRequired pb="20px">
            <FormLabel>Facility</FormLabel>
            <Core.Select
              placeholder="Select Facility"
              isDisabled={pageType === "view"}
              value={sessionFacility?.value}
              list={facilities}
              name="facility"
              onChange={(_) => {
                setSessionFacility({
                  name: _.target.value,
                  value: _.target.value,
                });
              }}
            />
          </FormControl>
        )}
        <Box width="49%" mb="3">
          <Text fontSize="17px" textTransform="capitalize" mb="2px">
            Training Name
          </Text>
          <Core.Input
            isDisabled={pageType === "view"}
            size="md"
            type="text"
            fontSize="14px"
            id="sessionNameInput"
            placeholder="Enter Training Name"
            value={sessionName}
            onChange={handleSessionNameChange}
          />
        </Box>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="start" width="100%">
            {slots?.map((slot, index) => (
              <Flex
                key={index}
                width="100%"
                columnGap="10px"
                borderRadius="10px"
                backgroundColor="gray.200"
                padding="15px"
                alignItems={"center"}
                position={"relative"}
              >
                <VStack flex={1.5}>
                  <Tabs
                    isLazy={true}
                    size="sm"
                    variant="soft-rounded"
                    colorScheme="blue"
                    maxWidth="250px"
                    width={"100%"}
                    defaultIndex={slot?.video ? 0 : 1}
                  >
                    <TabPanels width={"100%"}>
                      <TabPanel>
                        {/* Video */}
                        <FormControl>
                          <Flex flexDirection="column" rowGap="10px">
                            <Box
                              maxWidth="210px"
                              width="100%"
                              maxHeight="120px"
                              position="relative"
                            >
                              <Box
                                as="span"
                                top="5px"
                                right="5px"
                                position="absolute"
                              >
                                <Input
                                  type="file"
                                  id={`videoInput_${index}`}
                                  name={`video_${index}`}
                                  height="100%"
                                  width="100%"
                                  position="absolute"
                                  top="0"
                                  left="0"
                                  opacity="0"
                                  aria-hidden="true"
                                  accept="video/*"
                                  zIndex={5}
                                  onChange={(e) => handleVideoUpload(e, index)}
                                />
                                {pageType !== "view" && (
                                  <Core.IconicButton button="upload" />
                                )}
                              </Box>
                              {uploadedVideos[index] && (
                                <Box
                                  maxWidth="210px"
                                  width="100%"
                                  height="120px"
                                  maxHeight="120px"
                                >
                                  <Core.Video
                                    src={uploadedVideos[index]}
                                    width="100%"
                                    height="120px"
                                  />
                                </Box>
                              )}
                              {!uploadedVideos[index] && (
                                <Box
                                  maxWidth="210px"
                                  width="100%"
                                  height="120px"
                                  maxHeight="120px"
                                >
                                  {slot?.video ? (
                                    <Core.Video
                                      src={slot?.video}
                                      width="100%"
                                      height="120px"
                                    />
                                  ) : (
                                    <Image
                                      fallbackSrc={videoPlaceholder.src}
                                      width="100%"
                                      rounded="5px"
                                      alt="logo"
                                      className="chakra-image"
                                    />
                                  )}
                                </Box>
                              )}
                            </Box>
                          </Flex>
                        </FormControl>
                      </TabPanel>

                      <TabPanel>
                        {/* Image */}
                        <FormControl>
                          <Flex flexDirection="column" rowGap="10px">
                            <Box
                              maxWidth="210px"
                              width="100%"
                              height="120px"
                              maxHeight="120px"
                              position="relative"
                            >
                              <Box
                                as="span"
                                top="5px"
                                right="5px"
                                position="absolute"
                              >
                                <Input
                                  type="file"
                                  id={`imageInput_${index}`}
                                  name={`image_${index}`}
                                  height="100%"
                                  width="100%"
                                  position="absolute"
                                  top="0"
                                  left="0"
                                  opacity="0"
                                  aria-hidden="true"
                                  accept="image/*"
                                  zIndex={5}
                                  onChange={(e) => handleImageUpload(e, index)}
                                />
                                {pageType !== "view" && (
                                  <Core.IconicButton button="upload" />
                                )}
                              </Box>
                              {uploadedImages[index] && (
                                <Box
                                  maxWidth="210px"
                                  width="100%"
                                  height="120px"
                                  maxHeight="120px"
                                >
                                  <Image
                                    src={uploadedImages[index]}
                                    width="100%"
                                    maxHeight="100%"
                                    rounded="5px"
                                    className="chakra-image"
                                    alt="logo"
                                  />
                                </Box>
                              )}
                              {!uploadedImages[index] && (
                                <Box
                                  maxWidth="210px"
                                  width="100%"
                                  height="120px"
                                  maxHeight="120px"
                                >
                                  <Image
                                    src={slot?.image}
                                    fallbackSrc={imagePlaceholder.src}
                                    width="100%"
                                    rounded="5px"
                                    alt="logo"
                                    className="chakra-image"
                                  />
                                </Box>
                              )}
                            </Box>
                          </Flex>
                        </FormControl>
                      </TabPanel>
                    </TabPanels>
                    {pageType !== "view" && (
                      <TabList justifyContent={"center"}>
                        <Tab>Video</Tab>
                        <Tab>Image</Tab>
                      </TabList>
                    )}
                  </Tabs>
                </VStack>
                {/* Text */}
                <FormControl width="60%" flex={4}>
                  <Textarea
                    isDisabled={pageType === "view"}
                    placeholder="Write Something to help describe task."
                    backgroundColor="white.500"
                    value={slot.text}
                    onChange={(e) =>
                      handleSlotChange(index, "text", e.target.value)
                    }
                    rows={5}
                    minHeight={"128px"}
                  />
                </FormControl>
                {pageType !== "view" && (
                  <Box className="slot-cross-icon" flex={0.1}>
                    <Icons.RxCross2
                      color="red"
                      fontSize={"30px"}
                      className="relative z-10 cursor-pointer rounded-[50px] p-[2px] hover:bg-[#f5c3c3]"
                      onClick={() => handleDeleteSlot(index)}
                    />
                  </Box>
                )}
              </Flex>
            ))}
            {pageType !== "view" && (
              <HStack justifyContent="end" width="100%">
                <Button
                  leftIcon={<AddIcon />}
                  colorScheme="orange"
                  variant="outline"
                  onClick={handleAddSlot}
                  width={"100%"}
                >
                  Add Slot
                </Button>
              </HStack>
            )}

            {pageType !== "view" && (
              <Flex justifyContent={"center"} mt="15px" width="100%">
                <Core.Button
                  type="submit"
                  btnOutline
                  isLoading={isLoading}
                  isDisabled={isLoading}
                >
                  {pageType === "create" ? "Save Training" : "Update Training"}
                </Core.Button>
              </Flex>
            )}
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default TrainingActions;
