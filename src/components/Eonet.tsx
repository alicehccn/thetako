import React from "react";
import ReactModal from "react-modal";
import {
  MODAL_STYLES,
  FETCH_EVENT_URL,
} from "../constant";

interface EONETResponse {
  
}

type ModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
};

export const EONET: React.FC<ModalProps> = ({ modalIsOpen, closeModal }) => {
  const [events, setEvents] = React.useState();
  React.useEffect(() => {
    if (!events) {
      fetch(FETCH_EVENT_URL)
        .then((response) => response?.json())
        .then((json) => setEvents(json.events))
        .catch((error) => console.error(error));
    }
  }, [events]);

  if (!events) {
    return;
  }

  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={MODAL_STYLES}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <div className="apod">
        <h2>Astronomy Picture of the Day</h2>
      </div>
    </ReactModal>
  );
};
