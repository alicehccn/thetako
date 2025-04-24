import { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import "../App.css";
import {
  composeEpicImageUrl,
  EPIC_COLOR,
  EPIC_INTERVAL,
  fetchEpicApi,
  formatApiDate,
} from "../constant";
import ReactModal from "react-modal";
import { BasicTab } from "./mui/BasicTab";
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
  centroid_coordinates: { lat: number; lon: number };
};

const MODAL_STYLES = {
  content: {
    maxWidth: "800px",
    height: "auto",
    maxHeight: "100%",
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
      fetch(fetchEpicApi(formatApiDate(new Date()), color))
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
        <Box
          display="flex"
          justifyContent="space-evenly"
          width="100%"
          position="fixed"
          bottom="0"
          padding="10px 0"
          color="#808080"
          fontSize={14}
        >
          <div>Lat: {asset?.centroid_coordinates?.lat}</div>
          <div>Lng: {asset?.centroid_coordinates?.lon}</div>
          <div>{asset?.date}</div>
        </Box>
        <img src={composeEpicImageUrl(asset.image, asset.date, color)} />
      </div>
    </ReactModal>
  );
};
