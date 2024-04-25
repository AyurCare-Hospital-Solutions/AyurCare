import { PieChart } from "@mui/x-charts/PieChart";

const ExternalPrescriptionPieChart = () => {
  return (
    <>
      <PieChart
        colors={["#6f42c1", "#ffc107 "]}
        series={[
          {
            data: [
              { id: 0, value: 10, label: "Approved", color: "#6f42c1" },
              { id: 1, value: 15, label: "Rejected", color: "#ffc107" },
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
