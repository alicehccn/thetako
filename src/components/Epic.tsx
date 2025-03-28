import { useEffect, useRef, useState } from "react";
import "../App.css";
import {
  composeEpicImageUrl,
  EPIC_COLOR,
  EPIC_HOMEPAGE,
  EPIC_INTERVAL,
  fetchEpicApi,
  formatApiDate,
  formatDate,
} from "../constant";
import ReactModal from "react-modal";
import { BasicTab } from "./mui/BasicTab";
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
    width: "700px",
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
  const [color, setColor] = useState<EPIC_COLOR>(EPIC_COLOR.NATURAL);

  useEffect(() => {
    fetch(fetchEpicApi(formatApiDate(0), color))
      .then((response) =>
        response?.json().then((json) => {
          setAssets(json);
          setAsset(json[0]);
          setAssetIndex(assetIndex);
        }),
      )
      .catch((error) => console.error(error));
  }, [color]);

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
        <BasicTab
          handleChange={(e) => {
            setColor(e.target.id);
          }}
          value={color}
        />
        <img src={composeEpicImageUrl(asset.image, asset.date, color)} />
        <small>
          Credits:{" "}
          <a target="_blank" href={EPIC_HOMEPAGE}>
            DSCOVR: EPIC &copy; NASA, {formatDate(asset.date)}
          </a>
        </small>
      </div>
    </ReactModal>
  );
};
