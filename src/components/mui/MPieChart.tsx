import { PieChart } from "@mui/x-charts/PieChart";
import { PIE_CHART, SKILL_MAP } from "../../constant";

export const MPieChart: React.FC = () => {
  return (
    <>
      <PieChart
        series={[
          {
            innerRadius: 50,
            outerRadius: 80,
            data: SKILL_MAP[0].items,
            valueFormatter: () => ``,
          },

          {
            innerRadius: 100,
            outerRadius: 130,
            data: SKILL_MAP[1].items,
            valueFormatter: () => ``,
          },
          {
            innerRadius: 150,
            outerRadius: 180,
            data: SKILL_MAP[2].items,
            valueFormatter: () => ``,
          },
        ]}
        width={460}
        slotProps={{
          legend: { hidden: true },
        }}
        colors={PIE_CHART}
        className="skill-chart"
      />
    </>
  );
};
