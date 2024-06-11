export function updateFormField(
  formFields: IFormField[],
  droppedItem: string,
  formFieldData: RequiredFieldsType
) {
  const updatedFields = [...formFields];
  const { _id: id } = formFieldData;

  const index = updatedFields.findIndex((formField) => formField._id === id);

  if (index !== -1) {
    updatedFields[index] = { ...formFieldData };
  } else if (id) {
    if (droppedItem === "input") {
      updatedFields.push(formFieldData);
    } else if (droppedItem === "select") {
      updatedFields.push({ ...formFieldData, type: "select" });
    } else if (droppedItem === "date") {
      updatedFields.push({ ...formFieldData, type: "date" });
    } else if (droppedItem === "mcqs") {
      updatedFields.push({ ...formFieldData, type: "mcqs" });
    } else if (droppedItem === "image") {
      updatedFields.push({ ...formFieldData, type: "image" });
    } else if (droppedItem === "video") {
      updatedFields.push({ ...formFieldData, type: "video" });
    } else if (droppedItem === "heading") {
      updatedFields.push({ ...formFieldData, type: "heading" });
    } else if (droppedItem === "paragraph") {
      updatedFields.push({ ...formFieldData, type: "paragraph" });
    } else if (droppedItem === "attachment") {
      updatedFields.push({ ...formFieldData, type: "attachment" });
    }
    // Auto-generated
    else if (droppedItem === "organization") {
      updatedFields.push({ ...formFieldData, type: "organization" });
    } else if (droppedItem === "facility") {
      updatedFields.push({ ...formFieldData, type: "facility" });
    } else if (droppedItem === "user") {
      updatedFields.push({ ...formFieldData, type: "user" });
    } else if (droppedItem === "lifeguard") {
      updatedFields.push({ ...formFieldData, type: "lifeguard" });
    }
  }

  return updatedFields;
}
