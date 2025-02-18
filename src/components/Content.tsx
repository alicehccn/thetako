import React from "react";
import "../App.css";

const Content: React.FC = () => {
  return (
    <div className="App-content">
      <section className="left">
        <img src="./github.png" alt="social" />
        <img src="./linkedin.png" alt="social" />
        <img src="./email.png" alt="social" />
      </section>
      <section className="right">
        <div className="horizontal">
          <h2>Engineering</h2>
        </div>
        <div className="vertical">
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

        
        </section>
    </div>
  );
};
export default Content;
