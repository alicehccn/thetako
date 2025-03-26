import { useEffect, useRef, useState } from "react";
import "../App.css";
import {
  composeEpicImageUrl,
  EPIC_INTERVAL,
  fetchEpicApi,
  getApodDate,
  MODAL_STYLES,
} from "../constant";
import ReactModal from "react-modal";
import { Box } from "@mui/material";

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
  }, EPIC_INTERVAL);

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
        <img src={composeEpicImageUrl(asset.image, asset.date)} />
        <div className="close-btn">
          <button onClick={closeModal}>Close</button>
        </div>
      </div>
    </ReactModal>
  );
};
