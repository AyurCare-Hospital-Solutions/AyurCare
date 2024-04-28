import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
// Register a font
Font.register({
  family: "Helvetica",
  src: "http://path.to/Helvetica.ttf", // Ensure you have the right to use and distribute the font
});

// Define styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    position: "relative",
    paddingTop: 50,
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: "center", // Centers the content horizontally
  },
  watermark: {
    position: "absolute",
    top: 350, // Centers vertically, adjust as needed
    left: 100, // Centers horizontally, adjust as needed
    fontSize: 30,
    color: "#aaaaaa", // Light gray color for the watermark
    opacity: 0.5, // Semi-transparent
    transform: "rotate(-45deg)", // Rotates the watermark text
  },
  table: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    border: "1pt solid #000",
    marginBottom: 25,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  tableCellHeader: {
    flex: 1,
    padding: 5,
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    borderBottom: "1pt solid #000",
  },
  tableCell: {
    padding: 5,
    fontSize: 9,
    textAlign: "left",
    borderBottom: "1pt solid #000",
  },
  rowColorChange: {
    backgroundColor: "#acf08a",
  },
  leftColumn: {
    flex: 4, // Takes up 80% of the row
    borderRight: "1pt solid #000", // Right border for the left column
  },
  rightColumn: {
    textAlign: "left",
    flex: 1, // Takes up 20% of the row
  },
  mergedHeader: {
    padding: 5,
    fontSize: 10,
    fontWeight: 5,
    textAlign: "center",
    borderBottom: "1pt solid #000",
    flex: 5, // Spans across the full width of the row
  },
  reportTitle: {
    fontSize: 15,
    fontFamily: "Helvetica",
    textAlign: "center",
    fontWeight: 5,
    marginBottom: "30px",
  },
  reportTime: {
    fontSize: "10px",
    color: "#000",
    textAlign: "right",
    fontWeight: 9,
    fontStyle: "italic",
    marginBottom: "10px",
    marginTop: "270px",
    fontFamily: "Helvetica",
  },
});

const getCurrentDateTime = () => {
  const now = new Date();
  return now.toLocaleString(); // Converts to local date and time string
};

// Document Component
const GeneratePDF = ({
  medicineData,
  internalPrescriptionData,
  externalPrescriptionData,
  userConcern,
}: {
  medicineData: any;
  internalPrescriptionData: any;
  externalPrescriptionData: any;
  userConcern: any;
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Watermark */}
      <Text style={styles.watermark}>
        AyurCare's <br /> Pharmacy Report
      </Text>
      {/* title */}
      <View style={styles.reportTitle}>
        <Text>Pharmacy Performance Report</Text>
      </View>

      {/* medicine summary */}
      <View style={styles.table}>
        {/* Table Header */}
        <View
          style={[
            styles.tableRow,
            { borderBottom: "1pt solid #000" },
            styles.rowColorChange,
          ]}
        >
          <Text style={styles.mergedHeader}>Medicine Summary</Text>
        </View>
        {/* Data Rows with 80%-20% column width distribution */}

        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.leftColumn]}>
            Total no of medicines:
          </Text>
          <Text style={[styles.tableCell, styles.rightColumn]}>
            {medicineData.total}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.leftColumn]}>
            No of the medicines out of stock level:
          </Text>
          <Text style={[styles.tableCell, styles.rightColumn]}>
            {medicineData.countZero}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.leftColumn]}>
            No of the medicines low stock level(less than 10):
          </Text>
          <Text style={[styles.tableCell, styles.rightColumn]}>
            {medicineData.countLessThan10}
          </Text>
        </View>
      </View>

      {/* Internal Prescription summary */}
      <View style={styles.table}>
        {/* Table Header */}
        <View
          style={[
            styles.tableRow,
            styles.rowColorChange,
            { borderBottom: "1pt solid #000" },
          ]}
        >
          <Text style={styles.mergedHeader}>Internal Prescription Summary</Text>
        </View>
        {/* Data Rows with 80%-20% column width distribution */}

        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.leftColumn]}>
            Total no of the prescriptions:
          </Text>
          <Text style={[styles.tableCell, styles.rightColumn]}>
            {internalPrescriptionData.total}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.leftColumn]}>
            No of the prescriptions approved:
          </Text>
          <Text style={[styles.tableCell, styles.rightColumn]}>
            {internalPrescriptionData.approved}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.leftColumn]}>
            No of the prescriptions rejected:
          </Text>
          <Text style={[styles.tableCell, styles.rightColumn]}>
            {internalPrescriptionData.rejected}
          </Text>
        </View>
      </View>

      {/* Exernal Prescription summary */}
      <View style={styles.table}>
        {/* Table Header */}
        <View
          style={[
            styles.tableRow,
            styles.rowColorChange,
            { borderBottom: "1pt solid #000" },
          ]}
        >
          <Text style={styles.mergedHeader}>Exernal Prescription Summary</Text>
        </View>
        {/* Data Rows with 80%-20% column width distribution */}

        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.leftColumn]}>
            Total no of the prescriptions:
          </Text>
          <Text style={[styles.tableCell, styles.rightColumn]}>
            {externalPrescriptionData.total}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.leftColumn]}>
            No of the prescriptions approved:
          </Text>
          <Text style={[styles.tableCell, styles.rightColumn]}>
            {externalPrescriptionData.approved}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.leftColumn]}>
            No of the prescriptions rejected:
          </Text>
          <Text style={[styles.tableCell, styles.rightColumn]}>
            {externalPrescriptionData.rejected}
          </Text>
        </View>
      </View>

      {/* User concenrs summary */}
      <View style={styles.table}>
        {/* Table Header */}
        <View
          style={[
            styles.tableRow,
            styles.rowColorChange,
            { borderBottom: "1pt solid #000" },
          ]}
        >
          <Text style={styles.mergedHeader}>User concern Summary</Text>
        </View>
        {/* Data Rows with 80%-20% column width distribution */}

        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.leftColumn]}>
            Total no of the concerns:
          </Text>
          <Text style={[styles.tableCell, styles.rightColumn]}>
            {userConcern.total}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.leftColumn]}>
            No of the concers replied:
          </Text>
          <Text style={[styles.tableCell, styles.rightColumn]}>{21}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.leftColumn]}>
            No of the conerns need to reply:
          </Text>
          <Text style={[styles.tableCell, styles.rightColumn]}>{19}</Text>
        </View>
      </View>

      <Text style={styles.reportTime}>
        Report generated on: {getCurrentDateTime()}
      </Text>
    </Page>
  </Document>
);

export default GeneratePDF;
