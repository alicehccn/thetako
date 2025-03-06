import React from "react";
import ReactModal from "react-modal";
import { fetchApodApi, APOD_HOMEPAGE, getDateString } from "../constant";
import { Accordion, AccordionSummary } from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";

type AssetResponse = {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
  copyright?: string;
};

type ModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
};

const MODAL_STYLES = {
  content: {
    width: "720px",
    maxHeight: "95vh",
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

  React.useEffect(() => {
    if (!assets) {
      fetch(fetchApodApi(14))
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
        <div className="apod-nav">
          <div onClick={goPrev} className="prev">
            {"<<"}
          </div>
          <div onClick={goNext} className="next">
            {">>"}
          </div>
        </div>
        <Accordion>
          <AccordionSummary aria-controls="panel1-content" id="panel1-header">
            <h2>{asset?.title}</h2>
          </AccordionSummary>
          <AccordionDetails>
            {asset?.date && <p>{getDateString(asset.date)}</p>}
            <br />
            {asset?.explanation}
            <br />
            <br />
            <p>
              <small>
                Credits: &copy;{asset?.copyright}
                <a target="_blank" href={APOD_HOMEPAGE}>
                  NASA
                </a>
              </small>
            </p>
          </AccordionDetails>
        </Accordion>
        {asset?.media_type === "image" && <img src={asset?.url} />}
        {asset?.media_type === "video" && <iframe src={asset?.url} />}
        <div className="close-btn">
          <button onClick={closeModal}>Close</button>
        </div>
      </div>
    </ReactModal>
  );
};
