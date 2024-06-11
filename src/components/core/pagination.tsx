import type { FlexProps } from "@chakra-ui/react";
import { Container, Flex, useColorModeValue } from "@chakra-ui/react";
import type { ReactNode, SetStateAction } from "react";

const PaginationButton = ({
  children,
  isDisabled,
  isActive,
  ...props
}: PaginationButtonProps) => {
  const activeStyle = {
    bg: useColorModeValue("gray.300", "gray.700"),
  };

  return (
    <Flex
      p={3}
      px={4}
      fontSize="md"
      fontWeight="500"
      lineHeight={0.8}
      //   opacity={isDisabled && 0.7}
      //   _hover={!isDisabled && activeStyle}
      cursor={isDisabled ? "not-allowed" : "pointer"}
      border="1px solid"
      mr="-1px"
      borderColor={useColorModeValue("gray.300", "gray.700")}
      {...(isActive && activeStyle)}
      {...props}
    >
      {children}
    </Flex>
  );
};

// Ideally, only the Pagination component should be used. The PaginationContainer component is used to style the preview.
const Pagination = ({
  numberOfPages,
  activePage,
  setPageNumber,
}: {
  numberOfPages: number;
  activePage: number;
  setPageNumber: (value: SetStateAction<number>) => void;
}) => {
  // const buttons = () => {
  //   const numbers = [];
  //   for (let i = 1; i <= numberOfPages; i++) {
  //     numbers.push(
  //       <PaginationButton
  //         isActive={i === activePage}
  //         key={i}
  //         onClick={() => setPageNumber(i)}
  //       >
  //         {i}
  //       </PaginationButton>
  //     );
  //   }
  //   return numbers;
  // };

  const buttons = () => {
    // const numberOfPages = 50; // Total number of pages
    const pagesToShow = 2; // Number of pages to show around the active page
    // const activePage = 3; // Current active page (yahaan aap apni active page ko set karen)
    const numbers = [];

    for (
      let i = Math.max(1, activePage - pagesToShow);
      i <= Math.min(numberOfPages, activePage + pagesToShow);
      i++
    ) {
      numbers.push(
        <PaginationButton
          isActive={i === activePage}
          key={i}
          onClick={() => setPageNumber(i)}
        >
          {i}
        </PaginationButton>
      );
    }

    return numbers;
  };

  // const buttons = () => {
  //   const maxVisibleButtons = 5; // Adjust this value as needed
  //   const pages = [];

  //   if (numberOfPages <= maxVisibleButtons) {
  //     for (let i = 1; i <= numberOfPages; i++) {
  //       pages.push(
  //         <PaginationButton
  //           isActive={i === activePage}
  //           key={i}
  //           onClick={() => setPageNumber(i)}
  //         >
  //           {i}
  //         </PaginationButton>
  //       );
  //     }
  //   } else if (activePage <= maxVisibleButtons - 2) {
  //     for (let i = 1; i <= maxVisibleButtons - 2; i++) {
  //       pages.push(
  //         <PaginationButton
  //           isActive={i === activePage}
  //           key={i}
  //           onClick={() => setPageNumber(i)}
  //         >
  //           {i}
  //         </PaginationButton>
  //       );
  //     }
  //     pages.push(
  //       <PaginationButton key="ellipsis" isDisabled>
  //         ...
  //       </PaginationButton>
  //     );
  //     pages.push(
  //       <PaginationButton
  //         isActive={activePage === numberOfPages}
  //         key={numberOfPages}
  //         onClick={() => setPageNumber(numberOfPages)}
  //       >
  //         {numberOfPages}
  //       </PaginationButton>
  //     );
  //   } else if (activePage >= numberOfPages - maxVisibleButtons + 3) {
  //     pages.push(
  //       <PaginationButton
  //         isActive={activePage === 1}
  //         key={1}
  //         onClick={() => setPageNumber(1)}
  //       >
  //         1
  //       </PaginationButton>
  //     );
  //     pages.push(
  //       <PaginationButton key="ellipsis" isDisabled>
  //         ...
  //       </PaginationButton>
  //     );
  //     for (
  //       let i = numberOfPages - maxVisibleButtons + 3;
  //       i <= numberOfPages;
  //       i++
  //     ) {
  //       pages.push(
  //         <PaginationButton
  //           isActive={i === activePage}
  //           key={i}
  //           onClick={() => setPageNumber(i)}
  //         >
  //           {i}
  //         </PaginationButton>
  //       );
  //     }
  //   } else {
  //     pages.push(
  //       <PaginationButton
  //         isActive={activePage === 1}
  //         key={1}
  //         onClick={() => setPageNumber(1)}
  //       >
  //         1
  //       </PaginationButton>
  //     );
  //     pages.push(
  //       <PaginationButton key="ellipsis" isDisabled>
  //         ...
  //       </PaginationButton>
  //     );
  //     for (let i = activePage - 1; i <= activePage + 1; i++) {
  //       pages.push(
  //         <PaginationButton
  //           isActive={i === activePage}
  //           key={i}
  //           onClick={() => setPageNumber(i)}
  //         >
  //           {i}
  //         </PaginationButton>
  //       );
  //     }
  //     pages.push(
  //       <PaginationButton key="ellipsis" isDisabled>
  //         ...
  //       </PaginationButton>
  //     );
  //     pages.push(
  //       <PaginationButton
  //         isActive={numberOfPages === activePage}
  //         key={numberOfPages}
  //         onClick={() => setPageNumber(numberOfPages)}
  //       >
  //         {numberOfPages}
  //       </PaginationButton>
  //     );
  //   }

  //   return pages;
  // };

  return (
    <Flex
      as="nav"
      aria-label="Pagination"
      w="full"
      justify="end"
      alignItems="center"
      mt={{ base: 3, md: 0 }}
    >
      {activePage !== 1 && (
        <PaginationButton
          borderTopLeftRadius="md"
          borderBottomLeftRadius="md"
          onClick={() => setPageNumber(activePage - 1)}
        >
          Previous
        </PaginationButton>
      )}

      {buttons()}

      {activePage !== numberOfPages && (
        <PaginationButton
          borderTopRightRadius="md"
          borderBottomRightRadius="md"
          onClick={() => setPageNumber(activePage + 1)}
        >
          Next
        </PaginationButton>
      )}
    </Flex>
  );
};

interface PaginationButtonProps extends FlexProps {
  children: ReactNode;
  isActive?: boolean;
  isDisabled?: boolean;
}

interface PaginationProps {
  setPageNumber: (value: SetStateAction<number>) => void;
  numberOfPages: number;
  activePage: number;
}

const PaginationContainer = ({
  activePage,
  numberOfPages,
  setPageNumber,
}: PaginationProps) => {
  return (
    <Container
      display="flex"
      maxWidth="800px"
      width="full"
      my="10px"
      alignItems="center"
    >
      <Pagination
        numberOfPages={numberOfPages}
        activePage={activePage}
        setPageNumber={setPageNumber}
      />
    </Container>
  );
};

export default PaginationContainer;
