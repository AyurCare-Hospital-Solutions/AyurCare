import { PieChart } from "@mui/x-charts/PieChart";

export default function PieChartReport() {
  return (
    <>
      <PieChart
        colors={["yellow", "black"]}
        series={[
          {
            data: [
              { id: 0, value: 10, label: "Replied" },
              { id: 1, value: 15, label: "Not Replied" },
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
