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
     
    </div>
  );
}
export default Content;
