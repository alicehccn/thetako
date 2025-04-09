import "../App.css";
import { APOD } from "./Apod";
import { SplitButton } from "./mui/SplitButton";
import { Weather } from "./Weather";
import { Epic } from "./Epic";
import { useState } from "react";
import { MPieChart } from "./mui/MPieChart";

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
      <MPieChart />
      <SplitButton
        setSelectedIndex={setSelectedIndex}
        selectedIndex={selectedIndex}
      />
    </div>
  );
};
export default Content;
