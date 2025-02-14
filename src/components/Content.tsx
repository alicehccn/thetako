import React from 'react';
import '../App.css';
import Modal from 'react-modal';

const Content: React.FC = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="App-content">
      <section className="row">
          With a decade of experience in commercial software development from startups to mature enterprises, Alice spent the last few years building HIPAA-compliant systems for health care programs. 
      </section>
      <section className="columns">
            <div className="column">
              Backend: NodeJS, Typescript, Python, Golang, Rust, Postgres, MongoDB, Postgres, BullMQ, Redis, Protobuf, gRPC, REST, Kubernetes, AWS, Heroku
            </div>
            <div className="column">
              Frontend: Javascript, Typescript, React, Redux, NextJS, Webpack, HTML, CSS/SASS
            </div>
            <div className="column">
              Distributed systems, cloud technologies, web technologies, API design principles, microservices, Access Control, OOP, Agile, CD/CI, APM and TDD
            </div>
      </section>
      <section className="row">
      </section>
          {/* <a className='collapse' onClick={openModal}>Show more</a> */}
    </div>
  );
}
export default Content;
