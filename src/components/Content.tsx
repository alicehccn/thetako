import React from "react";
import "../App.css";
import { APOD } from "./Apod";
import { SKILL_MAP } from "../constant";

const Content: React.FC = () => {
  const [ApodOpen, setApodOpen] = React.useState(false);

  function openApod() {
    setApodOpen(true);
  }

  function closeApod() {
    setApodOpen(false);
  }

  function openEONET() {}

  function closeEONET() {}

  return (
    <div className="App-content">
      <APOD modalIsOpen={ApodOpen} closeModal={closeApod} />
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
        <div className="horizontal" onClick={openApod}>
          <h2>APOD</h2>
        </div>
        <div className="horizontal" onClick={openEONET}>
          <h2>EONET</h2>
        </div>
      </section>
    </div>
  );
};
export default Content;
