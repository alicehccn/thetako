import React from "react";
import ReactModal from "react-modal";
import {
  getApodStartDate,
  fetchApodApi,
  APOD_HOMEPAGE,
  getDateString,
} from "../constant";

interface AssetResponse {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
  copyright?: string;
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

export const APOD: React.FC<ModalProps> = ({ modalIsOpen, closeModal }) => {
  const [assets, setAssets] = React.useState<AssetResponse[]>();
  const [asset, setAsset] = React.useState<AssetResponse>();
  let [assetIndex, setAssetIndex] = React.useState(1);
  const apodStartDate = getApodStartDate();

  React.useEffect(() => {
    if (!assets) {
      fetch(fetchApodApi(apodStartDate))
        .then((response) =>
          response?.json().then((json) => {
            setAssets(json);
            setAsset(json[json.length - assetIndex]);
            setAssetIndex(assetIndex);
          }),
        )
        .catch((error) => console.error(error));
    }
  });

  function goPrev() {
    if (assetIndex < (assets?.length ?? 0)) {
      assetIndex++;
      setAssetIndex(assetIndex);
      setAsset(assets?.[assets.length - assetIndex]);
    }
  }
  function goNext() {
    if (assetIndex > 1) {
      assetIndex--;
      setAssetIndex(assetIndex);
      setAsset(assets?.[assets.length - assetIndex]);
    }
  }

  if (!asset) {
    return;
  }

  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={MODAL_STYLES}
      contentLabel="APOD Modal"
      ariaHideApp={false}
    >
      <div className="apod">
        <h2>Astronomy Picture of the Day</h2>
        <div className="apod-nav">
          <div onClick={goPrev} className="prev">
            {"<<"}
          </div>
          <div onClick={goNext} className="next">
            {">>"}
          </div>
        </div>
        {asset?.date && <h3>{getDateString(asset.date)}</h3>}
        {asset?.media_type === "image" && <img src={asset?.url} />}
        {asset?.media_type === "video" && <iframe src={asset?.url} />}
        <h3>{asset?.title}</h3>
        <p>{asset?.explanation}</p>
        <small>
          Credits: &copy;{asset?.copyright}
          <a target="_blank" href={APOD_HOMEPAGE}>
            NASA
          </a>
        </small>
        <div className="close-btn">
          <button onClick={closeModal}>Close</button>
        </div>
      </div>
    </ReactModal>
  );
};
