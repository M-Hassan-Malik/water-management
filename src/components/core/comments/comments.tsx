import {
  Avatar,
  Flex,
  // FormControl,
  HStack,
  Stack,
  Text,
  // FormLabel,
} from "@chakra-ui/react";

// import { Core } from "@/components";

// const reviewData = [
//   {
//     avatarSrc:
//       "https://s.gravatar.com/avatar/4f9135f54df98fe894a9f9979d600a87?s=80",
//     review: `What a wonderful little cottage! More spacious and adorable than the What a wonderful little cottage! More spacious and adorable than the pictures show. We never met our hosts and...`,
//     userName: "James",
//     dateTime: "2 months ago",
//   },
//   // {
//   //   avatarSrc: "",
//   //   review: `What a wonderful little cottage! More spacious and adorable than the pictures show. We never met our hosts, but we felt welcomed and...`,
//   //   userName: "John Doe",
//   //   dateTime: "1 months ago",
//   // },
//   // {
//   //   avatarSrc: "",
//   //   review: `What a wonderful little cottage! More spacious and adorable than the pictures show. We never met our hosts, but we felt welcomed and...`,
//   //   userName: "Jones",
//   //   dateTime: "4 months ago",
//   // },
// ];

interface ICommentsProps {
  comments: {
    avatarSrc: string;
    review: string;
    userName: string;
    dateTime: string;
  }[];
}

const Comments: React.FC<ICommentsProps> = ({ comments }) => {
  return (
    <Stack
      direction="column"
      spacing={5}
      my={4}
      rowGap={"10px"}
      // mt={"20px"}
      mt={"10px"}
    >
      {comments?.map((review, index) => {
        return (
          <Stack key={index} direction="column" maxWidth="1000px">
            <HStack spacing={3}>
              <Avatar
                size="md"
                name={review.userName}
                src={review?.avatarSrc}
              />
              <Flex direction="column">
                <Text fontWeight="bold" fontSize="md">
                  {review?.userName}
                </Text>
                <Text fontWeight="light" fontSize="xs">
                  {review?.dateTime}
                </Text>
              </Flex>
            </HStack>
            <Text fontSize={"14px"} textAlign="left" lineHeight="1.375">
              {review?.review}
            </Text>
            {/* <FormControl isRequired>
              <FormLabel>Message</FormLabel>
              <Core.Textarea 
                name="text"
                placeholder="Some Text"
                rows={4} 
                backgroundColor={"white.100"}
              />
            </FormControl> */}
          </Stack>
        );
      })}
    </Stack>
  );
};

export default Comments;
