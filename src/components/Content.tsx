import React from "react";
import "../App.css";
import { Apod } from "./Apod";
import { FETCH_EVENT_URL, SKILL_MAP } from "../constant";

const Content: React.FC = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [events, setEvents] = React.useState();
  React.useEffect(() => {
    if (!events) {
      fetch(FETCH_EVENT_URL)
        .then((response) => response?.json())
        .then((json) => setEvents(json.events))
        .catch((error) => console.error(error));
    }
  }, [events]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="App-content">
      <Apod modalIsOpen={modalIsOpen} closeModal={closeModal} />
      <section className="right">
        <div className={`vertical`}>
          {SKILL_MAP.map((skill) => {
            return (
              <div>
                <h2>{skill.subject}</h2>
                {skill.items.map((item) => (
                  <p>{item}</p>
                ))}
              </div>
            );
          })}
        </div>
        <div className="horizontal" onClick={openModal}>
          <h2>NASA</h2>
        </div>
      </section>
    </div>
  );
};
export default Content;
