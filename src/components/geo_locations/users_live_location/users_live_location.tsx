// import { StarIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  //   chakra,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  // Stack,
  Text,
  useMediaQuery,
  //  HStack
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

import { Core } from "@/components";
import { BtnSpinner } from "@/components/core";
// import { useQuery } from "react-query";
// import { useSelector } from "react-redux";
// import { GetMyTrainings } from "@/services/api";
// import { formatDateAndTime } from "@/utils/helpers/functions";
// import TrainingSelected from "./training_selected";
// import { Alert } from "@/components/core";
import { Icons } from "@/components/icons";
import { FindMyUsers } from "@/services/api";
import { evaluateLoggedInUserType } from "@/utils/helpers/functions";

interface ITrainingProps {}

const Map = dynamic(() => import("@/components/core/map"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const UsersLiveLocation: React.FC<ITrainingProps> = () => {
  const [selectedUser, setSelectedUser] = useState<IUser>();
  const user: IUser = useSelector((state: any) => state.user.user);
  const [users, setUsers] = useState<IUser[] | any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[] | any[]>([]);
  const [allFilteredUsers, setAllFilteredUsers] = useState<any>([]);
  const [fail, setFail] = useState<IAlertSuccessData>();

  const { isLoading } = useQuery(
    "findLiveLocationOfUsers",
    () => FindMyUsers({ ownerId: user?._id || "" }),
    {
      onSuccess({ findMyUsers }) {
        setUsers(findMyUsers);
        setFilteredUsers(findMyUsers);
      },
      onError: (_: any) => {
        const errorMsg =
          _?.response?.errors[0]?.message || "Unable to fetch users.";
        setFail({
          status: true,
          title: "Failed",
          description: errorMsg,
        });
      },
      enabled: Boolean(user?._id),
      refetchOnMount: true,
    }
  );
  const handleActivitySelect = (_: any) => {
    setSelectedUser(_);
  };
  useEffect(() => {
    if (filteredUsers) {
      const modifiedfilterUsers = filteredUsers.map(
        (filterUser: any, index: number) => ({
          ...filterUser,
          active: index === 0, // Set to true for the first submission, false for others
        })
      );
      setAllFilteredUsers(modifiedfilterUsers);
      handleActivitySelect(filteredUsers[0]);
    }
  }, [filteredUsers]);

  const handleItemClick = (clickedItem: any) => {
    const updatedSubmissions = allFilteredUsers.map((_filteredUsers: any) => ({
      ..._filteredUsers,
      active: _filteredUsers === clickedItem,
    }));

    setAllFilteredUsers(updatedSubmissions);
    handleActivitySelect(clickedItem);
  };

  const filterName = (_: any) => {
    const tempUsers = _.target.value.length
      ? users.filter(
          (item) =>
            item.first_name
              .toLowerCase()
              .startsWith(_.target.value.toLowerCase()) ||
            item.last_name
              .toLowerCase()
              .startsWith(_.target.value.toLowerCase())
        )
      : users;

    setFilteredUsers(tempUsers);
  };
  const [isMediumScreen] = useMediaQuery("(max-width: 768px)");

  return (
    <Flex
      borderRadius="10px"
      padding="20px"
      backgroundColor={"red.50"}
      gap={"20px"}
      flexDirection={isMediumScreen ? "column" : "row"}
    >
      <Core.Alert show={fail} theme="error" />
      <Box
        width={isMediumScreen ? "100%" : "35%"}
        maxWidth={"500px"}
        pr={"10px"}
      >
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={"5px"}
          mb="10px"
        >
          <InputGroup width={"100%"}>
            <InputLeftElement pointerEvents="none">
              <Icons.ImSearch />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search User"
              backgroundColor={"white.100"}
              onChange={filterName}
            />
          </InputGroup>
          <Core.IconicButton button="Search" size="md" />
        </Flex>
        <>
          {isLoading ? (
            <BtnSpinner />
          ) : (
            <Box
              maxHeight={"80vh"}
              width={"320px"}
              overflowY={"scroll"}
              pr="25px"
              className="red-scrollbar"
            >
              {allFilteredUsers?.map((_user: any) => (
                <Flex
                  key={_user._id}
                  onClick={() => handleItemClick(_user)}
                  position={"relative"}
                  rounded="lg"
                  opacity={_user.active === true ? 1 : 0.6}
                  cursor="pointer"
                  backgroundColor={"white.500"}
                  shadow={_user.active === true ? "lg" : "xs"}
                  mb="15px"
                  transition={"all .3s ease"}
                >
                  {/* {_user._id === selectedUser?._id && ( */}
                  {_user.active === true && (
                    <>
                      <Flex
                        position="absolute"
                        right="-20px"
                        top="0"
                        bottom="0"
                        alignItems="center"
                        justify="center"
                      >
                        <Box
                          width="0px"
                          height="0px"
                          borderTop={"20px solid transparent"}
                          borderLeft={"20px solid red"}
                          borderBottom={"20px solid transparent"}
                        ></Box>
                      </Flex>
                      <Flex
                        w={1 / 4}
                        justifyContent={"center"}
                        alignItems={"center"}
                        backgroundColor={"red.500"}
                        borderRadius={"10px"}
                      >
                        <Icons.MdOutlineMyLocation
                          color="#fff"
                          fontSize={"40px"}
                        />
                      </Flex>
                    </>
                  )}
                  <Flex p="10px" direction={"row"} align={"center"}>
                    <Avatar
                      src={
                        "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                      }
                    />
                    <Flex
                      width={"70%"}
                      direction={"column"}
                      fontSize={"sm"}
                      pl={"5px"}
                    >
                      <Text
                        fontWeight={600}
                        textOverflow={"ellipsis"}
                        overflow={"hidden"}
                        whiteSpace={"nowrap"}
                      >
                        {_user.first_name}&nbsp;
                        {_user.last_name}
                      </Text>
                      <Text color={"gray.500"}>
                        {evaluateLoggedInUserType(_user.admin, _user?.company)}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              ))}
            </Box>
          )}
        </>
      </Box>
      {selectedUser ? (
        <Box
          width={"100%"}
          minHeight={"400px"}
          height={"100%"}
          className="map-wrapper"
          zIndex={0}
        >
          <Map
            selectedPosition={{
              lat: selectedUser?.liveLocation?.lat,
              lng: selectedUser?.liveLocation?.lng,
            }}
          />
        </Box>
      ) : (
        <Flex
          width={"100%"}
          height={"300px"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Heading color="#aaa" userSelect={"none"}>
            Please select a User!
          </Heading>
        </Flex>
      )}
      {/* </Box> */}
    </Flex>
  );
};

export default UsersLiveLocation;
