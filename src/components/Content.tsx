import React from "react";
import "../App.css";
import { APOD } from "./Apod";
import { SKILL_MAP } from "../constant";
import { EONET } from "./Eonet";
import { SplitButton } from "./SplitButton";

const Content: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  return (
    <div className="App-content">
      <APOD
        modalIsOpen={selectedIndex === 1}
        closeModal={() => setSelectedIndex(0)}
      />
      <EONET
        modalIsOpen={selectedIndex === 2}
        closeModal={() => setSelectedIndex(0)}
      />
      <section className="right">
        <div className={`vertical`}>
          {SKILL_MAP.map((skill, i) => {
            return (
              <div key={i}>
                <h2>{skill.subject}</h2>
                {skill.items.map((item, j) => (
                  <p key={j}>{item}</p>
                ))}
              </div>
            );
          })}
        </div>
        <SplitButton
          setSelectedIndex={setSelectedIndex}
          selectedIndex={selectedIndex}
        />
      </section>
    </div>
  );
};
export default Content;
