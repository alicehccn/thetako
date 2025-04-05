import ReactModal from "react-modal";
import { fetchApodApi, APOD_HOMEPAGE, formatDate } from "../constant";
import { Accordion, AccordionSummary } from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useEffect, useState } from "react";

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
    maxWidth: "800px",
    maxHeight: "96%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const APOD: React.FC<ModalProps> = ({ modalIsOpen, closeModal }) => {
  const [assets, setAssets] = useState<AssetResponse[]>();
  const [asset, setAsset] = useState<AssetResponse>();
  let [assetIndex, setAssetIndex] = useState(1);

  useEffect(() => {
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
            {asset?.date && <p>{formatDate(asset.date)}</p>}
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
        {asset?.media_type === "html" && (
          <embed type="text/html" src={asset?.url} />
        )}
        {asset?.media_type === "video" && (
          <iframe src={asset?.url + "?autoplay=1"} />
        )}
      </div>
    </ReactModal>
  );
};
