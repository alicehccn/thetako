import React from "react";
import ReactModal from "react-modal";
import { FETCH_EVENT_URL, getDateString } from "../constant";
import { Autocomplete, Button, TextField } from "@mui/material";

interface EventResponse {
  title: string;
  description: string;
  link: string;
  categories: {
    id: string;
    title: string;
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
    width: "800px",
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
  const [events, setEvents] = React.useState<EventResponse[]>();
  const [event, setEvent] = React.useState<EventResponse>();
  React.useEffect(() => {
    if (!events) {
      fetch(FETCH_EVENT_URL)
        .then((response) => response?.json())
        .then((json) => setEvents(json.events))
        .catch((error) => console.error(error));
    }
  });

  if (!events) {
    return;
  }

  function renderSummary(event: EventResponse) {
    return (
      <div className="event">
        <div>
          Categories:{" "}
          {event.categories.map((c, i) => (
            <span key={i}>{c.title}</span>
          ))}
        </div>
        <div>
          Geometries:{" "}
          {event.geometries.map((c, i) => (
            <span key={i}>[{c.coordinates}], </span>
          ))}
        </div>
        <div>
          Source:{" "}
          {event.sources.map((c, i) => (
            <span key={i}>{c.url}</span>
          ))}
        </div>
        <div>Link: {event.link}</div>
        {event.description && <div>Desrciption: {event.description}</div>}
      </div>
    );
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
        <h2>Earth Observatory Natural Event Tracker</h2>
        <Autocomplete
          value={
            event
              ? {
                  label: `${getDateString(event?.geometries[0].date)} | ${event?.title}`,
                  option: event,
                }
              : null
          }
          options={events.map((event) => {
            return {
              label: `${getDateString(event.geometries[0].date)} | ${event.title}`,
              option: event,
            };
          })}
          onChange={(e, value) => {
            e.preventDefault();
            setEvent(value?.option);
          }}
          sx={{ width: "90%", margin: "auto" }}
          renderInput={(params) => <TextField {...params} label="Event" />}
        />
        {event && renderSummary(event)}
      </div>
    </ReactModal>
  );
};
