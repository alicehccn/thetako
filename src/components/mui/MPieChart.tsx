import { PieChart } from "@mui/x-charts/PieChart";

const data1 = [
  { label: "Group A", value: 400 },
  { label: "Group B", value: 300 },
  { label: "Group C", value: 300 },
  { label: "Group D", value: 200 },
];
const data2 = [
  { label: "A1", value: 100 },
  { label: "A2", value: 300 },
  { label: "B1", value: 100 },
  { label: "B2", value: 80 },
  { label: "B3", value: 40 },
  { label: "B4", value: 30 },
  { label: "B5", value: 50 },
  { label: "C1", value: 100 },
  { label: "C2", value: 200 },
  { label: "D1", value: 150 },
  { label: "D2", value: 50 },
];

export const MPieChart: React.FC = () => {
  return (
    <PieChart
      series={[
        {
          innerRadius: 0,
          outerRadius: 80,
          data: data1,
        },
        {
          innerRadius: 100,
          outerRadius: 120,
          data: data2,
        },
      ]}
      // width={462}
      // height={300}
      slotProps={{
        legend: { hidden: true },
      }}
      colors={[
        "#C4C4C4",
        "#E0E0E0",
        "#666666",
        "#3D3D3D",
        "#555555",
        "#353535",
        "#e0e0e0",
        "#b8b8b8",
        "#929292",
        "#6e6e6e",
      ]}
      className="skill-chart"
    />
  );
};
