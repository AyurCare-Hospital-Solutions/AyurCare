import { Approval } from "@mui/icons-material";
import { PieChart } from "@mui/x-charts/PieChart";

const PrescriptionPieChart = ({
  PrescriptionData,
}: {
  PrescriptionData: any;
}) => {
  // const { approved, rejected } = PrescriptionData;
  
  return (
    <>
      <PieChart
        colors={["#28a745", "#dc3545"]}
        series={[
          {
            data: [
              { id: 0, value: 2, label: "Approved", color: "orange" },
              { id: 1, value: 3, label: "Rejected" },
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
