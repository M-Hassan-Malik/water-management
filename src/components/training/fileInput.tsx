import { Input } from "@chakra-ui/react";
import type { ChangeEvent } from "react";
import React from "react";

interface FileInputProps {
  onFileChange: (file: File) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onFileChange }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileChange(file);
    }
  };

  return (
    <Input
      type="file"
      accept=".csv, .xlsx"
      style={{
        // width: "120px",
        // position: "relative",
        // left: "40px",
        // color: '#3f5e8c',
        // borderRadius: '5px',
        // cursor: 'pointer',
        border: "none",
        paddingTop: "10px",
        // outline: 'none',
      }}
      onChange={handleFileChange}
    />
  );
};

export default FileInput;
