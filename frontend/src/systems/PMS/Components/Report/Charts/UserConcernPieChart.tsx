import { PieChart } from "@mui/x-charts/PieChart";

export default function UserConcernPieChart() {
  return (
    <>
      <PieChart
        colors={["#20c997 ", "#ff7f50"]}
        series={[
          {
            data: [
              { id: 0, value: 10, label: "series A", color: "#20c997" },
              { id: 1, value: 15, label: "series B", color: "#ff7f50" },
            ],
          },
        ]}
        width={400}
        height={200}
      />
      
    </>
  );
}

/*
  1. add the color: 
      1. colors={["red", "blue", "green"]}
      2. { id: 0, value: 10, label: "series A", color: "orange" },
*/
