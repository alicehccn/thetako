import React from "react";
import "../App.css";
import Modal from "react-modal";
import { subDays, format } from "date-fns";

interface APOD {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
  copyright?: string;
}

const Content: React.FC = () => {
  const [showContent, setShowContent] = React.useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [events, setEvents] = React.useState();
  const [images, setImages] = React.useState<APOD[]>();
  const [image, setImage] = React.useState<APOD>();
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

  React.useEffect(() => {
    if (!events) {
      fetch("https://eonet.gsfc.nasa.gov/api/v2.1/events?limit=10&status=open")
        .then((response) => response?.json())
        .then((json) => setEvents(json.events))
        .catch((error) => console.error(error));
    }
  }, [events]);

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

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

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

  return (
    <div className="App-content">
      <Modal
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
          {image?.date && <h2>{format(image.date, "MMMM dd, yyyy")}</h2>}
          {image?.media_type === "image" && <img src={image?.url} />}
          {image?.media_type === "video" && <iframe src={image?.url} />}
          <h3>{image?.title}</h3>
          <p>{image?.explanation}</p>
          <p>&copy; {image?.copyright ? image?.copyright : "NASA"}</p>
          <div className="close-btn">
            <a target="_blank" href="https://apod.nasa.gov/apod/astropix.html">
              Source
            </a>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      </Modal>
      <section className="right">
        <div className={`vertical ${showContent ? "" : "hidden"}`}>
          <div>
            <h3>Web / Mobile</h3>
            <p>Typescript</p>
            <p>React</p>
            <p>HTML / CSS</p>
            <p>Webpack</p>
            <p>Express</p>
            <p>Expo</p>
          </div>
          <div>
            <h3>e-Commerce</h3>
            <p>UI/UX</p>
            <p>Billing</p>
            <p>Payment</p>
            <p>Access Control</p>
            <p>Maps</p>
            <p>Analytics</p>
          </div>
          <div>
            <h3>Cloud</h3>
            <p>AWS</p>
            <p>Heroku</p>
            <p>Vercel</p>
            <p>Docker</p>
            <p>Database</p>
            <p>CI/CD</p>
          </div>
        </div>
        <div
          className="horizontal"
          onClick={() => setShowContent(!showContent)}
        >
          <h2>Engineering</h2>
        </div>
        <div className="horizontal" onClick={openModal}>
          <h2>NASA</h2>
        </div>
      </section>
    </div>
  );
};
export default Content;
