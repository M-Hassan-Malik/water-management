import { useRouter } from "next/router";
import { useState } from "react";

import { Core } from "@/components";

const actions = { view: true };
const columns = [
  "customerName",
  "email",
  "phoneNo",
  "message",
  "datetime",
  "seen",
  "action",
];
const data = [
  {
    customerName: "John Doe",
    email: "abc@gmail.com",
    phoneNo: "000 000 000",
    datetime: "00-00-0000, 00:00pm",
    message:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    seen: true,
  },
  {
    customerName: "Jane Doe",
    email: "abc@gmail.com",
    phoneNo: "000 000 000",
    datetime: "00-00-0000, 00:00pm",
    message:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    seen: false,
  },
  {
    customerName: "Bob Smith",
    email: "abc@gmail.com",
    phoneNo: "000 000 000",
    datetime: "00-00-0000, 00:00pm",
    message:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    seen: true,
  },
  {
    customerName: "John Doe",
    email: "abc@gmail.com",
    phoneNo: "000 000 000",
    datetime: "00-00-0000, 00:00pm",
    message:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    seen: false,
  },
  {
    customerName: "Jane Doe",
    email: "abc@gmail.com",
    phoneNo: "000 000 000",
    datetime: "00-00-0000, 00:00pm",
    message:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    seen: false,
  },
  {
    customerName: "John Doe",
    email: "abc@gmail.com",
    phoneNo: "000 000 000",
    datetime: "00-00-0000, 00:00pm",
    message:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    seen: true,
  },
  {
    customerName: "Jane Doe",
    email: "abc@gmail.com",
    phoneNo: "000 000 000",
    datetime: "00-00-0000, 00:00pm",
    message:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    seen: true,
  },
  {
    customerName: "Bob Smith",
    email: "abc@gmail.com",
    phoneNo: "000 000 000",
    datetime: "00-00-0000, 00:00pm",
    message:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    seen: false,
  },
  {
    customerName: "John Doe",
    email: "abc@gmail.com",
    phoneNo: "000 000 000",
    datetime: "00-00-0000, 00:00pm",
    message:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    seen: false,
  },
  {
    customerName: "Jane Doe",
    email: "abc@gmail.com",
    phoneNo: "000 000 000",
    datetime: "00-00-0000, 00:00pm",
    message:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    seen: true,
  },
];

interface IWebsiteContactFormListingProps {}

const WebsiteContactFormListing: React.FC<
  IWebsiteContactFormListingProps
> = () => {
  const router = useRouter();
  // const selectOption = (selectedOption: any) => {
  //   console.log("selectedOption", selectedOption);
  // };
  const [, setTableFilters] = useState(null);

  const onViewClick = (id: any) => {
    router.push(
      {
        pathname: "/website-contact-form/details",
        query: { type: "view", id },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  return (
    <Core.Table
      id="website-contact-form-listing"
      tableData={data}
      columns={columns}
      shadow
      filterBy={["Dates", "Message"]}
      setTableFilters={setTableFilters}
      // selectOption={selectOption}
      actions={actions}
      onViewClick={onViewClick}
    />
  );
};

export default WebsiteContactFormListing;
