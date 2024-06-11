import { Flex } from "@chakra-ui/react";
import { memo } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import DropItem from "./drag_and_drop";

interface ILoopItem {
  fields: IFormField[];
  setFields: React.Dispatch<React.SetStateAction<IFormField[]>>;
  onChangeHandle: (type: string, name: string, e: any) => void;
  editItem?: any;
  deleteItem?: any;
  pageType?: string;
}

const DndProviderComponent: React.FC<ILoopItem> = ({
  fields,
  setFields,
  onChangeHandle,
  deleteItem,
  editItem,
  pageType,
}) => {
  const moveItem = (dragIndex: number, hoverIndex: number) => {
    if (pageType === "create" || pageType === "edit") {
      const draggedItem = fields[dragIndex];
      if (draggedItem) {
        const newItems: any[] = fields.slice();
        newItems.splice(dragIndex, 1);
        newItems.splice(hoverIndex, 0, draggedItem);
        setFields(newItems);
      }
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Flex flexWrap={"wrap"}>
        {fields?.map((item: any, index: number) => (
          <DropItem
            key={item._id}
            item={item}
            onChangeHandle={onChangeHandle}
            editItem={editItem}
            deleteItem={deleteItem}
            index={index}
            moveItem={moveItem}
            pageType={pageType}
          />
        ))}
      </Flex>
    </DndProvider>
  );
};

export default memo(DndProviderComponent);
