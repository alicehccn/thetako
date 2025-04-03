import { PieChart } from "@mui/x-charts/PieChart";
import { PIE_CHART, SKILL_MAP } from "../../constant";
import { styled } from "@mui/material/styles";
import { useDrawingArea } from "@mui/x-charts/hooks";

export const MPieChart: React.FC = () => {
  const StyledText = styled("text")(({ theme }) => ({
    fill: theme.palette.text.secondary,
    textAnchor: "middle",
    dominantBaseline: "central",
    fontSize: 14,
    textTransform: "uppercase",
  }));

  function PieCenterLabel({ children }: { children: React.ReactNode }) {
    const { width, height, left, top } = useDrawingArea();
    return (
      <StyledText x={left + width / 2} y={top + height / 2}>
        {children}
      </StyledText>
    );
  }

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
      >
        <PieCenterLabel>Profile</PieCenterLabel>
      </PieChart>
    </>
  );
};
