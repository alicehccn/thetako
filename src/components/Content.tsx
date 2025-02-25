import React from "react";
import "../App.css";
import { Apod } from "./Apod";
import { FETCH_EVENT_URL } from "../constant";

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
          <div>
            <h2>Web / Mobile</h2>
            <p>Typescript</p>
            <p>React</p>
            <p>HTML / CSS</p>
            <p>Webpack</p>
            <p>Express</p>
            <p>Expo</p>
          </div>
          <div>
            <h2>e-Commerce</h2>
            <p>UI/UX</p>
            <p>Billing</p>
            <p>Payment</p>
            <p>Access Control</p>
            <p>Maps</p>
            <p>Analytics</p>
          </div>
          <div>
            <h2>Cloud</h2>
            <p>AWS</p>
            <p>Heroku</p>
            <p>Vercel</p>
            <p>Docker</p>
            <p>Database</p>
            <p>CI/CD</p>
          </div>
        </div>
        
        <div className="horizontal" onClick={openModal}>
          <h2>NASA</h2>
        </div>
      </section>
    </div>
  );
};
export default Content;
