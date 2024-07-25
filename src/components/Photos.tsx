import { useNavigate, useParams } from "react-router-dom";
import { getPhotosUrl, getPhotoUrl } from "../constant";
import { Photo } from "../interfaces";
import { useEffect, useState } from "react";



const Photos: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const { albumId } = useParams();
  let history = useNavigate();

  function handleClick(photoId: string) {
  }

  useEffect(() => {
    if (albumId) {
      fetch(getPhotosUrl(albumId as string)).then(response => response.json())
      .then(json => setPhotos(json?.photoset.photo))
      .catch(error => console.error(error));
    }
  }, [albumId])

  function goBack() {
    history('/albums')
  }

  
  if (!albumId || photos.length === 0) return null;

    return (
    <div className="photos-container">
      <div className="photos-back-link-wrapper" onClick={goBack}>
        <p className="text-link">Back to Album</p>
      </div>
      {photos?.map((photo) => (
        <div key={photo.id} className="photo-container" onClick={() => handleClick(photo.id)}>
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
