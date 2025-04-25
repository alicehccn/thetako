import { PieChart } from "@mui/x-charts/PieChart";
import { PIE_CHART, SKILL_MAP } from "../../constant";
import { styled } from "@mui/material/styles";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { Box } from "@mui/material";

export const MPieChart: React.FC = () => {
  const StyledText = styled("text")(({ theme }) => ({
    fill: theme.palette.text.secondary,
    stroke: "#aaa",
    textAnchor: "middle",
    dominantBaseline: "central",
    fontSize: 15,
    textTransform: "uppercase",
    cursor: "pointer",
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
    <div className="skill-chart-container">
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
        width={860}
        height={380}
        slotProps={{
          legend: { hidden: false },
        }}
        colors={PIE_CHART}
        className={`skill-chart legend`}
      >
        <PieCenterLabel>Skills</PieCenterLabel>
      </PieChart>
      <Box
        display="block"
        width="max-content"
        fontSize={14}
        className="legend2"
        padding="10px"
      >
        Frontend (Web, iOS, Android)
        <Box display="inline" marginLeft={1} bgcolor="#c6c0b9" color="#c6c0b9">
          {"----"}
        </Box>
        <br />
        Backend (Service, Database, DevOps)
        <Box
          display="inline"
          marginLeft={1}
          bgcolor="#666666"
          color="#666666"
          width="20px"
        >
          {"----"}
        </Box>
      </Box>
    </div>
  );
};
