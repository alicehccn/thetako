import React from "react";
import "../App.css";
import { APOD } from "./Apod";
import { Menu } from "./Menu";
import { Weather } from "./Noaa";
import { Epic } from "./Epic";

const Content: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [selectedDate, selectDate] = React.useState<Date | string>();

  return (
    <div className="App-content">
      <APOD
        modalIsOpen={selectedIndex === 1}
        closeModal={() => setSelectedIndex(0)}
      />
      <Weather
        modalIsOpen={selectedIndex === 2}
        closeModal={() => setSelectedIndex(0)}
      />
      <Epic
        modalIsOpen={selectedIndex === 3}
        closeModal={() => setSelectedIndex(0)}
      />

      <section className="right">
        <Menu
          setSelectedIndex={setSelectedIndex}
          selectedIndex={selectedIndex}
        />
      </section>
    </div>
  );
};
export default Content;
