import { PieChart } from "@mui/x-charts/PieChart";

const ExternalPrescriptionPieChart = ({
  PrescriptionData,
}: {
  PrescriptionData: any;
}) => {
  const { approved, rejected } = PrescriptionData;
  return (
    <>
      <PieChart
        colors={["#6f42c1", "#ffc107 "]}
        series={[
          {
            data: [
              { id: 0, value: approved, label: "Approved", color: "#6f42c1" },
              { id: 1, value: rejected, label: "Rejected", color: "#ffc107" },
            ],
          },
        ]}
        width={400}
        height={200}
      />
    </>
  );
};

export default ExternalPrescriptionPieChart;
