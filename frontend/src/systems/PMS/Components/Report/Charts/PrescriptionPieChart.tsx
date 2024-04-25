import { PieChart } from "@mui/x-charts/PieChart";

const PrescriptionPieChart = () => {
  return (
    <>
      <PieChart
        colors={["#28a745", "#dc3545"]}
        series={[
          {
            data: [
              { id: 0, value: 10, label: "Approved", color: "orange" },
              { id: 1, value: 15, label: "Rejected" },
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
