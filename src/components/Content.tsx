import React from 'react';
import '../App.css';

const Content: React.FC = () => {
  
  return (
    <div className="App-content">
      <section className="left">
       <div className="profile-frame">
          <img src="./avatar.jpeg" width="100px" alt="avatar"/>
       </div>
      </section>
      <section className="right">
      </section>
    </div>
  );
}
export default Content;
