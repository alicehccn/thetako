import React from "react";
import "../App.css";
import { APOD } from "./Apod";
import { SKILL_MAP } from "../constant";
import { EONET } from "./Eonet";

const Content: React.FC = () => {
  const [APODOpen, setAPODOpen] = React.useState(false);
  const [EONETopen, setEONETopen] = React.useState(false);

  function openAPOD() {
    setAPODOpen(true);
  }

  function closeAPOD() {
    setAPODOpen(false);
  }

  function openEONET() {
    setEONETopen(true);
  }

  function closeEONET() {
    setEONETopen(false);
  }

  return (
    <div className="App-content">
      <APOD modalIsOpen={APODOpen} closeModal={closeAPOD} />
      <EONET modalIsOpen={EONETopen} closeModal={closeEONET} />
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
        <div className="horizontal" onClick={openAPOD}>
          <h2>Gallery</h2>
        </div>
        <div className="horizontal desktop-only" onClick={openEONET}>
          <h2>EONET</h2>
        </div>
      </section>
    </div>
  );
};
export default Content;
