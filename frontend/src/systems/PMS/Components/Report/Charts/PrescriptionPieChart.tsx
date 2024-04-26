import { PieChart } from "@mui/x-charts/PieChart";

const PrescriptionPieChart = ({
  PrescriptionData,
}: {
  PrescriptionData: any;
}) => {
  const { approved, rejected } = PrescriptionData;
  return (
    <>
      <PieChart
        colors={["#28a745", "#dc3545"]}
        series={[
          {
            data: [
              { id: 0, value: approved, label: "Approved", color: "orange" },
              { id: 1, value: rejected, label: "Rejected" },
            ],
          },
        ]}
        width={400}
        height={200}
      />
    </>
  );
};

export default PrescriptionPieChart;
