import { PieChart } from "@mui/x-charts/PieChart";
import { SKILL_MAP } from "../../constant";

export const MPieChart: React.FC = () => {
  return (
    <PieChart
      series={[
        {
          innerRadius: 0,
          outerRadius: 80,
          data: SKILL_MAP[0].items,
        },

        {
          innerRadius: 100,
          outerRadius: 130,
          data: SKILL_MAP[1].items,
        },
        {
          innerRadius: 150,
          outerRadius: 180,
          data: SKILL_MAP[2].items,
        },
      ]}
      width={460}
      slotProps={{
        legend: { hidden: true },
      }}
      colors={[
        "#C6C0B9",
        "#787569",
        "#C4C4C4",
        "#E0E0E0",
        "#666666",
        "#3D3D3D",
        "#353535",
        "#555555",
        "#b8b8b8",
        "#929292",
        "#6e6e6e",
      ]}
      className="skill-chart"
    />
  );
};
