import ReactModal from "react-modal";
import { fetchApodApi, APOD_HOMEPAGE, formatDate } from "../constant";
import { Accordion, AccordionSummary, Box } from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useEffect, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
    width: "min-content",
    maxWidth: "100%",
    height: "fit-content",
    maxHeight: "100%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const APOD: React.FC<ModalProps> = ({ modalIsOpen, closeModal }) => {
  const today = new Date();
  const [asset, setAsset] = useState<AssetResponse>();
  const [value, setValue] = useState<Dayjs>(dayjs(asset?.date) ?? dayjs(today));

  let [assetIndex, setAssetIndex] = useState(1);

  useEffect(() => {
    fetch(fetchApodApi(value.toDate()))
      .then((response) =>
        response?.json().then((json) => {
          setAsset(json);
          setAssetIndex(assetIndex);
        }),
      )
      .catch((error) => console.error(error));
  }, [value]);

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
        <Accordion>
          <AccordionSummary aria-controls="panel1-content" id="panel1-header">
            <h2>{asset?.title}</h2>
            <ExpandMoreIcon width="30px" height="100%" className="expand" />
          </AccordionSummary>
          <AccordionDetails>
            <p>{asset?.explanation}</p>
          </AccordionDetails>
        </Accordion>

        {asset?.media_type === "image" && <img src={asset?.url} />}
        {asset?.media_type === "html" && (
          <embed type="text/html" src={asset?.url} />
        )}
        {asset?.media_type === "video" && (
          <iframe src={asset?.url + "?autoplay=1"} />
        )}
        <Box width="100%" display="flex" justifyContent="space-around">
          <small>
            <a target="_blank" href={APOD_HOMEPAGE}>
              Credits &copy; {asset?.copyright ?? "NASA"}
            </a>
          </small>
          {asset?.date && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Search date"
                value={value}
                onChange={(newValue) => setValue(dayjs(newValue))}
                className="date-picker"
                maxDate={dayjs(today)}
              />
            </LocalizationProvider>
          )}
        </Box>
      </div>
    </ReactModal>
  );
};
