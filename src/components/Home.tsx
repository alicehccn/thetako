import "../App.css";
import { APOD } from "./Apod";
import { SplitButton } from "./mui/SplitButton";
import { Weather } from "./Weather";
import { Epic } from "./Epic";
import { OnThisDay } from "./OnThisDay";
import { useState } from "react";

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
        <OnThisDay />
        <SplitButton
          setSelectedIndex={setSelectedIndex}
          selectedIndex={selectedIndex}
        />
      </section>
    </div>
  );
};
export default Content;
