import React from "react";
import { Page, Text, Document, StyleSheet, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#dddad1",
  },
  logo: {
    marginTop: 20,
    marginLeft: 80,
    padding: 5,
    position: "absolute",
    fontSize: 21,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  report: {
    paddingTop: 30,
    paddingLeft: 590,
    position: "absolute",
    fontSize: 14,
  },
  period: {
    paddingTop: 50,
    paddingLeft: 550,
    position: "absolute",
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    paddingTop: 73,
    marginBottom: 10,
  },
  table: {
    tableLayout: "fixed",
    marginHorizontal: "auto",
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center", // This makes the row act like a grid container
  },
  tableHeader: {
    marginLeft: "2px",
    marginBottom: "2px",
    borderStyle: "solid",
    borderColor: "#000000",
    padding: 5,
    fontSize: 12,
    width: "170px",
    height: "32px",
    backgroundColor: "#F6F193",
    color: "#000",
    textAlign: "center",
  },
  cell: {
    marginLeft: "2px",
    marginBottom: "2px",
    borderStyle: "solid",
    borderColor: "#000000",
    padding: 5,
    fontSize: 12,
    width: "170px",
    height: "100px",
    backgroundColor: "#FBF3D5",
  },
  image: {
    marginLeft: "2px",
    marginBottom: "2px",
    borderStyle: "solid",
    borderColor: "#000000",
    backgroundColor: "#FBF3D5",
    padding: 5,
    fontSize: 12,
    width: "170px",
    height: "100px",
    paddingHorizontal: "55px",
    paddingVertical: "10px",
  },
});

const PDFFile: React.FC = () => {
  // Function to split items into chunks of 4
  const chunk = (arr: any[], size: number) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );

  return (
    <Document>
      <Page size="A3" orientation="portrait" style={styles.page}>
        <Text style={styles.logo}>CeylonVibes</Text>
        <Text style={styles.report}>Monthly Report</Text>
        <Text style={styles.period}>
          For the period ended {new Date().toLocaleDateString()}
        </Text>
        <Text style={styles.title}>Catagories Table</Text>
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.tableHeader}>ID</Text>
            <Text style={styles.tableHeader}>Name of the Category</Text>
            <Text style={styles.tableHeader}>Image</Text>
            <Text style={styles.tableHeader}>Name of the image</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>123</Text>
            <Text style={styles.cell}>hgvvhn</Text>
            <Text>this</Text>
            <Text style={styles.cell}>ghgv</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFFile;
