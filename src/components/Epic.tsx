import { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
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
    maxWidth: "700px",
    maxHeight: "96vh",
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
  const [albums, setAlbum] = useState<{ [key: string]: EpicReponse[] }>({});

  useEffect(() => {
    if (albums?.[color]) {
      setAssets(albums[color]);
      setAsset(albums[color][0]);
      setAssetIndex(0);
      return;
    } else {
      fetch(fetchEpicApi(formatApiDate(7), color))
        .then((response) =>
          response?.json().then((json) => {
            setAssets(json);
            setAsset(json[0]);
            setAssetIndex(0);
          }),
        )
        .catch((error) => console.error(error));
    }
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

  function onTabChange(e: BaseSyntheticEvent) {
    albums[color] = assets;
    setAlbum(albums);
    setColor(e.target.id);
    setAssetIndex(0);
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
        <BasicTab handleChange={onTabChange} value={color} />
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
