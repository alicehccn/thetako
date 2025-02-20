import React from "react";
import "../App.css";

const Content: React.FC = () => {
  const [showContent, setShowContent] = React.useState(false);
  const [events, setEvents] = React.useState();
  React.useEffect(() => {
    if(!events) {
      fetch('https://eonet.gsfc.nasa.gov/api/v2.1/events?limit=10&status=open')
      .then(response => response?.json())
      .then(json => setEvents(json.events))
      .catch(error => console.error(error));
    }
  }, [events]);
  return (
    <div className="App-content">
      {/* <div className="apod"><img src={imageUrl}/></div> */}
      <section className="right">
        <div className={`vertical ${showContent ? "" : "hidden"}`}>
          <div>
            <h3>Web / Mobile</h3>
            <p>Typescript</p>
            <p>React</p>
            <p>HTML / CSS</p>
            <p>Webpack</p>
            <p>Express</p>
            <p>Expo</p>
          </div>
          <div>
            <h3>e-Commerce</h3>
            <p>UI/UX</p>
            <p>Billing</p>
            <p>Payment</p>
            <p>Access Control</p>
            <p>Maps</p>
            <p>Analytics</p>
          </div>
          <div>
            <h3>Cloud</h3>
            <p>AWS</p>
            <p>Heroku</p>
            <p>Vercel</p>
            <p>Docker</p>
            <p>Database</p>
            <p>CI/CD</p>
          </div>
        </div>
        <div
          className="horizontal"
          onClick={() => setShowContent(!showContent)}
        >
          <h2>Engineering</h2>
        </div>
      </section>
    </div>
  );
};
export default Content;
