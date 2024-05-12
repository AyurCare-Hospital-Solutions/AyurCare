import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

interface DataItem {
  label: string;
  value: number;
}

interface ReportProps {
  data: DataItem[];
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const ReportPDFDocument: React.FC<ReportProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Data Summary:</Text>
        {data.map((item, index) => (
          <Text key={index}>{`${item.label}: ${item.value}`}</Text>
        ))}
      </View>
    </Page>
  </Document>
);

export default ReportPDFDocument;
