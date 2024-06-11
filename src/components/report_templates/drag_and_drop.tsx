import { Flex } from "@chakra-ui/react";
import React from "react";
import { useDrag, useDrop } from "react-dnd";

import { ReportTemplate } from "..";
import { Icons } from "../icons";

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

//

const ItemType = "ITEM";

const DragItem: React.FC<{
  item: any;
  onChangeHandle: (type: string, name: string, e: any) => void;
  editItem?: any;
  deleteItem?: any;
  pageType?: string;
}> = ({ item: field, onChangeHandle, deleteItem, editItem, pageType }) => {
  const [, ref] = useDrag({
    type: ItemType,
  });

  return (
    <div ref={ref} style={{ border: "1px solid red", margin: "1%" }}>
      {field.type === "text" ||
      field.type === "password" ||
      field.type === "number" ||
      field.type === "email" ? (
        <Flex
          background={pageType && pageType === "view" ? "" : "#f7f7f7"}
          borderRadius={"10px"}
          padding={pageType && pageType === "view" ? "" : "5px"}
          key={field._id}
          justifyContent={"space-between"}
          alignItems={"center"}
          columnGap={"2px"}
          width={"49%"}
        >
          <ReportTemplate.InputText field={field} onChange={onChangeHandle} />
          <Flex justifyContent={"end"} columnGap={"2px"}>
            <UdOperations
              field={field}
              editItem={editItem}
              deleteItem={deleteItem}
            />
          </Flex>
        </Flex>
      ) : field.type === "textarea" ? (
        <Flex
          background={pageType && pageType === "view" ? "" : "#f7f7f7"}
          borderRadius={"10px"}
          padding={pageType && pageType === "view" ? "" : "5px"}
          key={field._id}
          justifyContent={"space-between"}
          alignItems={"center"}
          columnGap={"2px"}
          width={"100%"}
        >
          <ReportTemplate.TextArea field={field} />
          <Flex justifyContent={"end"} columnGap={"2px"}>
            <UdOperations
              field={field}
              editItem={editItem}
              deleteItem={deleteItem}
            />
          </Flex>
        </Flex>
      ) : field.type === "select" ? (
        <Flex
          background={pageType && pageType === "view" ? "" : "#f7f7f7"}
          borderRadius={"10px"}
          padding={pageType && pageType === "view" ? "" : "5px"}
          key={field._id}
          justifyContent={"space-between"}
          alignItems={"center"}
          columnGap={"2px"}
          width={"49%"}
        >
          <ReportTemplate.SelectField field={field} onChange={onChangeHandle} />
          <Flex justifyContent={"end"} columnGap={"2px"}>
            <UdOperations
              field={field}
              editItem={editItem}
              deleteItem={deleteItem}
            />
          </Flex>
        </Flex>
      ) : field.type === "date" ? (
        <Flex
          background={pageType && pageType === "view" ? "" : "#f7f7f7"}
          borderRadius={"10px"}
          padding={pageType && pageType === "view" ? "" : "5px"}
          key={field._id}
          justifyContent={"space-between"}
          alignItems={"center"}
          columnGap={"2px"}
          width={"49%"}
        >
          <ReportTemplate.DatePicker field={field} onChange={onChangeHandle} />
          <Flex justifyContent={"end"} columnGap={"2px"}>
            <UdOperations
              field={field}
              editItem={editItem}
              deleteItem={deleteItem}
            />
          </Flex>
        </Flex>
      ) : field.type === "mcqs" ? (
        <Flex
          background={pageType && pageType === "view" ? "" : "#f7f7f7"}
          borderRadius={"10px"}
          padding={pageType && pageType === "view" ? "" : "5px"}
          key={field._id}
          justifyContent={"space-between"}
          alignItems={"center"}
          columnGap={"2px"}
          width={"100%"}
        >
          <ReportTemplate.Mcqs field={field} onChange={onChangeHandle} />
          <Flex justifyContent={"end"} columnGap={"2px"}>
            <UdOperations
              field={field}
              editItem={editItem}
              deleteItem={deleteItem}
            />
          </Flex>
        </Flex>
      ) : field.type === "image" ? (
        <Flex
          background={pageType && pageType === "view" ? "" : "#f7f7f7"}
          borderRadius={"10px"}
          padding={pageType && pageType === "view" ? "" : "5px"}
          key={field._id}
          justifyContent={"space-between"}
          alignItems={"center"}
          columnGap={"2px"}
          width={"49%"}
        >
          <ReportTemplate.File accept="image/*" field={field} />
          <Flex justifyContent={"end"} columnGap={"2px"}>
            <UdOperations field={field} deleteItem={deleteItem} />
          </Flex>
        </Flex>
      ) : (
        field.type === "video" && (
          <Flex
            background={pageType && pageType === "view" ? "" : "#f7f7f7"}
            borderRadius={"10px"}
            padding={pageType && pageType === "view" ? "" : "5px"}
            key={field._id}
            justifyContent={"space-between"}
            alignItems={"center"}
            columnGap={"2px"}
            width={"49%"}
          >
            <ReportTemplate.File accept="videp/*" field={field} />
            <Flex justifyContent={"end"} columnGap={"2px"}>
              <UdOperations field={field} deleteItem={deleteItem} />
            </Flex>
          </Flex>
        )
      )}
    </div>

    // <div ref={ref} style={{ border: '1px solid red', margin: '1%' }}>
    //   {JSON.stringify(item, null, 2)}
    // </div>
  );
};

const DropItem: React.FC<{
  item: any;
  index: number;
  onChangeHandle: (type: string, name: string, e: any) => void;
  editItem?: any;
  deleteItem?: any;
  pageType?: string;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}> = ({
  item,
  index,
  moveItem,
  onChangeHandle,
  deleteItem,
  editItem,
  pageType,
}) => {
  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem: { id: number }, monitor) => {
      if (!monitor.isOver()) {
        return;
      }
      if (draggedItem.id !== index) {
        // Compare with index, not _id
        moveItem(draggedItem.id, index);
        draggedItem.id = index; // Update the draggedItem.id
      }
    },
  });

  return (
    <div ref={(node) => drop(node)} style={{ width: "50%" }}>
      <DragItem
        item={item}
        onChangeHandle={onChangeHandle}
        editItem={editItem}
        deleteItem={deleteItem}
        pageType={pageType}
      />
    </div>
  );
};

export default DropItem;
