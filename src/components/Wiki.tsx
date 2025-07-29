import { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import "../App.css";
import { BASE_MODAL_STYLE, fetchWikiApi } from "../constant";
import ReactModal from "react-modal";
import { BasicTab } from "./mui/BasicTab";
import { Box } from "@mui/material";
type ModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
};

export const Wiki: React.FC<ModalProps> = ({ modalIsOpen, closeModal }) => {
  const [pages, setPages] = useState<[key: string][]>();

  useEffect(() => {
    if (!pages) {
      fetch(fetchWikiApi())
        .then((response) =>
          response?.json().then((json) => {
            setPages(json.onthisday);
          }),
        )
        .catch((error) => console.error(error));
    }
  }, [pages]);

  if (!pages) {
    return null;
  }

  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={{
        content: {
          ...BASE_MODAL_STYLE,
          maxWidth: "800px",
          height: "auto",
          maxHeight: "100%",
        },
      }}
      contentLabel="Wiki Modal"
      ariaHideApp={false}
    >
      <div className="wiki">
        <Box
          display="flex"
          justifyContent="space-evenly"
          width="100%"
          position="fixed"
          bottom="0"
          padding="10px 0"
          color="#808080"
          fontSize={14}
        ></Box>
      </div>
    </ReactModal>
  );
};
