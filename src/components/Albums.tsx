import { useEffect, useState } from "react";
import "../App.css";
import { Album } from "../interfaces";
import { ALBUMS_URL, getAlbumCover } from "../constant";
import { useNavigate } from "react-router-dom";


const Albums: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([])
  let history = useNavigate();

  function handleClick(albumId: string) {
    history(`/albums/${albumId}`);
  }

  useEffect(() => {
    fetch(ALBUMS_URL).then(response => response.json())
    .then(json => setAlbums(json?.photosets?.photoset))
    .catch(error => console.error(error));
  }, [])
  
  if (albums.length === 0) return null;

  return (
    <div className="albums-container">
      {albums.map((album) => (
        <div key={album.id} className="album-container" onClick={() => handleClick(album.id)}>
          <img alt={album.title._content} src={getAlbumCover(album)}/>
          <div className="album-text-container">
            <h3>{album.title._content}</h3>
            <p>{album.description._content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Albums;
