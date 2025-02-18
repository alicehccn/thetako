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
        <div>Website</div>
        <div>e-Commerce</div>
        <div>Cloud</div>
        </section>
    </div>
  );
};
export default Content;
