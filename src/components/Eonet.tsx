import React from "react";
import ReactModal from "react-modal";
import { FETCH_EVENT_URL, getDateString } from "../constant";

interface EventResponse {
  id: string;
  title: string;
  description: string;
  link: string;
  categories: {
    id: string;
    url: string;
  }[];
  sources: {
    id: string;
    url: string;
  }[];
  geometries: {
    date: string;
    type: string;
    coordinates: number[];
  }[];
}

type ModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
};

const MODAL_STYLES = {
  content: {
    maxWidth: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const EONET: React.FC<ModalProps> = ({ modalIsOpen, closeModal }) => {
  const [events, setEvents] = React.useState<EventResponse[]>();
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
      contentLabel="EONET Modal"
      ariaHideApp={false}
    >
      <div className="apod">
        <h2>Earth Observatory Natural Event Tracker</h2>
        {events.map((event) => (
          <p>
            {getDateString(event.geometries[0].date)} {event.title}
          </p>
        ))}
      </div>
    </ReactModal>
  );
};
