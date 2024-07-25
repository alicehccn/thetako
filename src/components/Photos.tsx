import { useParams } from "react-router-dom";
import { getPhotosUrl, getPhotoUrl } from "../constant";
import { Photo } from "../interfaces";
import { useEffect, useState } from "react";
import Lightbox from "./Lightbox";


const Photos: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const { albumId } = useParams();

  function handleClick() {
    setModalOpen(!isModalOpen);
  }

  useEffect(() => {
    if (albumId) {
      fetch(getPhotosUrl(albumId as string)).then(response => response.json())
      .then(json => setPhotos(json?.photoset.photo))
      .catch(error => console.error(error));
    }
  }, [albumId])

  if (!albumId || photos.length === 0) return null;

  return (
    <div className="photos-container">
      {photos?.map((photo) => (
        <div key={photo.id} className="photo-container" onClick={handleClick}>
          <img alt={photo.title} src={getPhotoUrl(photo)}/>
          <Lightbox
            photo={photo}
            isModalOpen={isModalOpen}
            closeModal={() => setModalOpen(false)}
          />
          <div className="photo-text-container">
            <p>{photo.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Photos;
