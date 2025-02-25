import React from "react";
import "../App.css";
import { Apod } from "./Apod";
import { FETCH_EVENT_URL, SKILL_MAP } from "../constant";

const Content: React.FC = () => {
  const [ApodOpen, setApodOpen] = React.useState(false);
  const [events, setEvents] = React.useState();
  React.useEffect(() => {
    if (!events) {
      fetch(FETCH_EVENT_URL)
        .then((response) => response?.json())
        .then((json) => setEvents(json.events))
        .catch((error) => console.error(error));
    }
  }, [events]);

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
      <Apod modalIsOpen={ApodOpen} closeModal={closeApod} />
      <section className="right">
        <div className={`vertical`}>
          {SKILL_MAP.map((skill, i) => {
            return (
              <div key={i}>
                <h2>{skill.subject}</h2>
                {skill.items.map((item) => (
                  <p>{item}</p>
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
