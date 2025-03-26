import { useEffect, useRef, useState } from "react";
import "../App.css";
import {
  composeEpicImageUrl,
  fetchEpicApi,
  getApodDate,
  getDateString,
} from "../constant";
import ReactModal from "react-modal";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

type ModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
};

type EpicReponse = {
  caption: string;
  date: string;
  identifier: string;
  image: string;
};

const MODAL_STYLES = {
  content: {
    width: "46%",
    maxHeight: "96%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const Epic: React.FC<ModalProps> = ({ modalIsOpen, closeModal }) => {
  const [assets, setAssets] = useState<EpicReponse[]>([]);
  const [asset, setAsset] = useState<EpicReponse | null>();
  let [assetIndex, setAssetIndex] = useState(0);

  useEffect(() => {
    if (assets.length === 0) {
      fetch(fetchEpicApi(getApodDate(10)))
        .then((response) =>
          response?.json().then((json) => {
            setAssets(json);
            setAsset(json[0]);
            setAssetIndex(assetIndex);
          }),
        )
        .catch((error) => console.error(error));
    }
  }, [assets]);

  function useInterval(callback: () => void, delay: number) {
    const savedCallback = useRef(callback);

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useInterval(() => {
    if (assetIndex < assets.length - 1) {
      assetIndex++;
      setAssetIndex(assetIndex);
      setAsset(assets[assetIndex]);
    }
    if (assetIndex === assets.length - 1) {
      setAssetIndex(0);
      setAsset(assets[0]);
    }
  }, 2500);

  if (!asset) {
    return null;
  }

  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={MODAL_STYLES}
      contentLabel="EPIC Modal"
      ariaHideApp={false}
    >
      <div className="epic">
        <Accordion>
          <AccordionSummary
            aria-controls="panel1-content"
            id="panel1-header"
          ></AccordionSummary>
          <AccordionDetails>
            <br />
            {asset?.caption}
            <br />
            <br />
            <small>Credits: &copy;NASA</small>
            <small>{getDateString(asset.date)}</small>
          </AccordionDetails>
        </Accordion>
        <img src={composeEpicImageUrl(asset.image, asset.date)} />
        <div className="close-btn">
          <button onClick={closeModal}>Close</button>
        </div>
      </div>
    </ReactModal>
  );
};
