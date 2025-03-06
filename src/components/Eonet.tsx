import React from "react";
import ReactModal from "react-modal";
import { fetchEonetApi } from "../constant";
import Mapbox from "./Map";
import { Event } from "./types";
import _ from "lodash";

type ModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
};

const MODAL_STYLES = {
  content: {
    width: "900px",
    maxHeight: "95vh",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const EONET: React.FC<ModalProps> = ({ modalIsOpen, closeModal }) => {
  const [events, setEvents] = React.useState<Event[]>();
  React.useEffect(() => {
    if (!events) {
      fetch(fetchEonetApi(14))
        .then((response) => response?.json())
        .then((json) => setEvents(json.events))
        .catch((error) => console.error(error));
    }
  });
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
      <div className="eonet">
        <h2>Wildfires in the United States</h2>
        <small>
          Source:{" "}
          <a href="https://eonet.gsfc.nasa.gov/what-is-eonet">
            Earth Observatory, NASA
          </a>
        </small>
        <Mapbox data={events} />
      </div>
    </ReactModal>
  );
};
