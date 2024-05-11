import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ChartComponent from "./ChartComponent";
import ReportPDFDocument from "./ReportPDFDocument";

const ReportGenerator: React.FC = () => {
  const data = {
    labels: ["Red", "Blue", "Yellow", "Grey", "Green"],
    values: [12, 19, 3, 5, 2],
    summary: [
      { label: "Red", value: 12 },
      { label: "Blue", value: 19 },
      { label: "Yellow", value: 3 },
      { label: "Grey", value: 5 },
      { label: "Green", value: 2 },
    ],
  };

  return (
    <div>
      <ChartComponent data={data} />
      <PDFDownloadLink
        document={<ReportPDFDocument data={data.summary} />}
        fileName="report.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download PDF"
        }
      </PDFDownloadLink>
    </div>
  );
};

export default ReportGenerator;
