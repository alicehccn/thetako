import "../App.css";
import { APOD } from "./Apod";
import { SplitButton } from "./mui/SplitButton";
import { Weather } from "./Weather";
import { Epic } from "./Epic";
import { useState } from "react";
import { Box } from "@mui/material";

const Content: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="App-content">
      <APOD
        modalIsOpen={selectedIndex === 1}
        closeModal={() => setSelectedIndex(0)}
      />
      <Epic
        modalIsOpen={selectedIndex === 2}
        closeModal={() => setSelectedIndex(0)}
      />
      <Weather
        modalIsOpen={selectedIndex === 3}
        closeModal={() => setSelectedIndex(0)}
      />
      <section className="right">
        <Box></Box>
        <SplitButton
          setSelectedIndex={setSelectedIndex}
          selectedIndex={selectedIndex}
        />
      </section>
    </div>
  );
};
export default Content;
