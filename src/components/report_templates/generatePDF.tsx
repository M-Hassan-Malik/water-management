import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";

interface Field {
  _id: string;
  type: string;
  label: string;
  placeholder?: string | null;
  options?: string[] | null | undefined;
  value?: string;
  src?: string;
}
interface GeneratePdfProps {
  templateData: Field[];
  templateName: string;
  reportType: string;
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  row: {
    width: "50%",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
  },
  fullWidthRow: {
    width: "100%",
    marginBottom: 8,
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
  },
  equalWidth: {
    flexBasis: "45%",
    marginBottom: 8,
    marginRight: 8,
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
  },
  labelContainer: {
    paddingBottom: 5,
  },
  valueContainer: {
    paddingTop: 5,
    marginLeft: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
  },
  value: {
    fontSize: 12,
    width: "100%",
    marginLeft: 10,
    color: "#526D82",
  },
});

const GeneratePdf: React.FC<GeneratePdfProps> = ({
  templateData,
  templateName,
  reportType,
}) => {
  const renderField = (field: Field) => {
    switch (field.type) {
      case "heading":
      case "paragraph":
      case "textarea":
        return (
          <View style={styles.fullWidthRow}>
            <Text style={styles.label}>{field.label}</Text>
          </View>
        );
      case "select":
      case "organization":
      case "facility":
      case "user":
      case "lifeguard":
      case "text":
      case "email":
      case "password":
      case "number":
      case "date":
        return (
          <View style={styles.equalWidth}>
            <Text style={styles.label}>{field.label}</Text>
            <Text style={styles.value}>{field?.value ? field?.value : ""}</Text>
          </View>
        );
      case "mcqs":
        return (
          <>
            <View style={styles.fullWidthRow}>
              <Text style={styles.label}>{`Q. ${field.label}`}</Text>
              {field.options &&
                field.options.map((option: any, index: number) => (
                  <Text style={styles.value} key={index}>
                    {option}
                  </Text>
                ))}
            </View>
          </>
        );
      case "attachment":
      case "video":
      case "image":
        return (
          <View style={[styles.row, styles.equalWidth]}>
            <Text style={styles.label}>{field.label}</Text>
            <Text style={styles.value}>{field.value}</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View>
            <Text style={styles.label}>Type : {reportType}</Text>
            {templateName && (
              <Text style={styles.label}>Name : {templateName}</Text>
            )}
          </View>
          <View style={styles.container}>
            {templateData?.map((data) => (
              <>{renderField(data)}</>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default GeneratePdf;
