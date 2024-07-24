import { useEffect, useState } from "react";
import "../App.css";
import { Album } from "../interfaces";
import { ALBUM_URL, getAlbumCover } from "../constant";

const Albums: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([])

  useEffect(() => {
    fetch(ALBUM_URL).then(response => response.json())
    .then(json => setAlbums(json?.photosets?.photoset))
    .catch(error => console.error(error));
  }, [])

  const handleClick = (id: string) => {
    console.log(id)
  }

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
