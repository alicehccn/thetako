import React from "react";
import ReactModal from "react-modal";
import { subDays, format } from "date-fns";

interface ApodResponse {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
  copyright?: string;
}

type ApodProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
};

export const Apod: React.FC<ApodProps> = ({ modalIsOpen, closeModal }) => {
  const [images, setImages] = React.useState<ApodResponse[]>();
  const [image, setImage] = React.useState<ApodResponse>();
  let [imageIndex, setImageIndex] = React.useState(1);

  const apodEndDate = new Date();
  const apodStartDate = format(subDays(apodEndDate, 7), "yyyy-MM-dd");
  const customStyles = {
    content: {
      maxWidth: "800px",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  function goPrev() {
    if (imageIndex < (images?.length ?? 0)) {
      imageIndex++;
      setImageIndex(imageIndex);
      setImage(images?.[images.length - imageIndex]);
    }
  }
  function goNext() {
    if (imageIndex > 1) {
      imageIndex--;
      setImageIndex(imageIndex);
      setImage(images?.[images.length - imageIndex]);
    }
  }

  React.useEffect(() => {
    if (!images) {
      fetch(
        `https://api.nasa.gov/planetary/apod?api_key=ibUVEf1jTwiXdSMK0eTmaUCKi9LAIdsTAkLeiRO4&start_date=${apodStartDate}`
      )
        .then((response) =>
          response?.json().then((json) => {
            setImages(json);
            setImage(json[json.length - imageIndex]);
            setImageIndex(imageIndex);
          })
        )
        .catch((error) => console.error(error));
    }
  });

  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
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
        {image?.date && <h3>{format(image.date, "MMMM dd, yyyy")}</h3>}
        {image?.media_type === "image" && <img src={image?.url} />}
        {image?.media_type === "video" && <iframe src={image?.url} />}
        <h2>{image?.title}</h2>
        <p>{image?.explanation}</p>
        <p>&copy; {image?.copyright ? image?.copyright : "NASA"}</p>
        <div className="close-btn">
          <a target="_blank" href="https://apod.nasa.gov/apod/astropix.html">
            Source
          </a>
          <button onClick={closeModal}>Close</button>
        </div>
      </div>
    </ReactModal>
  );
};
