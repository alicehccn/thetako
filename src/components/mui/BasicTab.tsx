import { Box, Tab, Tabs } from "@mui/material";
import { EPIC_COLOR, EPIC_TAB, TAB_PROPS } from "../../constant";

type BasicTabProps = {
  value: EPIC_COLOR;
  handleChange: (e: any) => void;
};

export const BasicTab: React.FC<BasicTabProps> = ({ value, handleChange }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label={value}>
          {EPIC_TAB.map((tab, i) => (
            <Tab key={i} {...TAB_PROPS(i)} />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
};
