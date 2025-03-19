import React from "react";
import "../App.css";
import { APOD } from "./Apod";
import { Menu } from "./Menu";
import { Weather } from "./Noaa";
import BasicDatePicker from "./DatePicker";

const Content: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [date, setDate] = React.useState<Date>();

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
      <section className="right">
        {!!date && (
          <div className="vertical">
            <h1>Coming soon...</h1>
          </div>
        )}
        <BasicDatePicker setValue={(props) => setDate(props)} />
        <Menu
          setSelectedIndex={setSelectedIndex}
          selectedIndex={selectedIndex}
        />
      </section>
    </div>
  );
};
export default Content;
