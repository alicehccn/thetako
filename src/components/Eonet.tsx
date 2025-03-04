import React from "react";
import ReactModal from "react-modal";
import { FETCH_EVENT_URL, getDateString } from "../constant";
import Mapbox from "./Map";
import { Event } from "./types";
import { DataGrid, GridRowSelectionModel } from "@mui/x-data-grid";
import _ from "lodash";

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
  const [events, setEvents] = React.useState<Event[]>();
  const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridRowSelectionModel>([]);
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
  const columns = [
    {
      field: "geometries",
      headerName: "Last Updated",
      valueGetter: (_: unknown, row: Event) =>
        getDateString(row.geometries[0].date),
      width: 150,
    },
    {
      field: "title",
      headerName: "Title",
      width: 500,
    },
  ];
  const data = {
    columns,
    rows: events,
    initialState: {
      pagination: {
        paginationModel: {
          pageSize: 5,
        },
      },
    },
  };

  const selectedRows = events.filter((event: Event) =>
    rowSelectionModel.includes(event.id),
  );
  const geometries = _.map(selectedRows, "geometries");

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
        <div style={{ width: "100%" }}>
          <div>
            <DataGrid
              {...data}
              checkboxSelection
              onRowSelectionModelChange={setRowSelectionModel}
              rowSelectionModel={rowSelectionModel}
            />
          </div>
        </div>
        <Mapbox data={geometries} />
      </div>
    </ReactModal>
  );
};
