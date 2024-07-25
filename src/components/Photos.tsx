import { useParams } from "react-router-dom";
import { getPhotosUrl, getPhotoUrl } from "../constant";
import { Photo } from "../interfaces";
import { useEffect, useState } from "react";
import Lightbox from "./Lightbox";
import '../App.css';


const Photos: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [photo, selectPhoto] = useState<Photo | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const { albumId } = useParams();

  function handleClick(photo: Photo) {
    selectPhoto(photo)
    setModalOpen(!isModalOpen);
  }

  useEffect(() => {
    if (albumId) {
      fetch(getPhotosUrl(albumId as string)).then(response => response.json())
      .then(json => setPhotos(json?.photoset.photo))
      .catch(error => console.error(error));
    }
  }, [albumId])

  function closeModal() {
    selectPhoto(null)
    setModalOpen(false);
  }

  if (!albumId || photos.length === 0) return null;

  return (
    <div className="photos-container">
      <Lightbox
        photo={photo}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      />
      {photos?.map((photo) => (
        <div key={photo.id} className="photo-container" onClick={() => handleClick(photo)}>
          <img alt={photo.title} src={getPhotoUrl(photo)}/>
          <div className="photo-text-container">
            <p>{photo.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Photos;
