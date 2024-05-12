import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
// Register a font
Font.register({
  family: "Helvetica",
  src: "http://path.to/Helvetica.ttf", // Ensure you have the right to use and distribute the font
});
import {} from "../../../../../public/pmsassests/report/Header.png";
import { fontFamily } from "html2canvas/dist/types/css/property-descriptors/font-family";

// Define styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    position: "relative",
    alignItems: "center", // Centers the content horizontally
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
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
  logo: {
    width: 60, // Set as needed height: 60, // Set as needed
    height: 60,
    marginRight: 10,
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
    textAlign: "left",
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
  contentTitle: {
    fontSize: 7,
    fontWeight: 5,
    flexDirection: "column", // Items will be laid out in a column
    alignItems: "flex-start", // Align items to the left
    justifyContent: "flex-start",
    marginRight: 318,
    marginTop: 12,
    marginBottom: 12, // Space below this section
  },
  text: {
    fontSize: 10, // Example font size, adjust as needed
    marginBottom: 5, // Space between the rows
  },
  footer: {
    flexDirection: "column",
    justifyContent: "flex-end",
    marginLeft: 340,
    alignItems: "center",
    marginTop: 12,
  },
  footerText: {
    fontSize: 10, // Example font size, adjust as needed
    marginBottom: 8,
  },
  image: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    margin: 0,
  },
});

const getCurrentDateTime = () => {
  const now = new Date();
  return now.toLocaleString(); // Converts to local date and time string
};

const pharmacist = "Vinushan.V";

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

      <Image
        style={styles.image}
        src="../../../../../public/pmsassests/report/Header.png" // Change this to the path or URL of your logo
      />
      <View style={styles.contentTitle}>
        <Text style={styles.text}>Pharmacist: {pharmacist}</Text> br
        <Text style={styles.text}>Date and Time: {getCurrentDateTime()}</Text>
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
            {/* {medicineData.total} */}
            20
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.leftColumn]}>
            No of the medicines out of stock level:
          </Text>
          <Text style={[styles.tableCell, styles.rightColumn]}>
            {/* {medicineData.countZero} */}
            12
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.leftColumn]}>
            No of the medicines low stock level(less than 10):
          </Text>
          <Text style={[styles.tableCell, styles.rightColumn]}>
            {/* {medicineData.countLessThan10} */}8
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
            {/* {internalPrescriptionData.total} */}
            30
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.leftColumn]}>
            No of the prescriptions approved:
          </Text>
          <Text style={[styles.tableCell, styles.rightColumn]}>
            {/* {internalPrescriptionData.approved} */}
            12
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.leftColumn]}>
            No of the prescriptions rejected:
          </Text>
          <Text style={[styles.tableCell, styles.rightColumn]}>
            {/* {internalPrescriptionData.rejected} */}
            18
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
          <Text style={[styles.tableCell, styles.rightColumn]}>{22}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.leftColumn]}>
            No of the conerns need to reply:
          </Text>
          <Text style={[styles.tableCell, styles.rightColumn]}>{9}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Signature <br />
        </Text>
        <Text style={styles.footerText}>. . . . . . . . . . . . . . . . .</Text>
      </View>
    </Page>
  </Document>
);

export default GeneratePDF;
