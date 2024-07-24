import { useCallback, useEffect, useState } from "react";
import "../App.css";

type Props = {
  url: string
}

interface Album {
  id: string,
  owner: string, 
  username: string,
  primary: string,
  secret: string,
  server: string,
  farm: number,
  count_views: number,
  count_comments: number,
  count_photos: number,
  count_videos: number, 
  title: {
    _content: string
  },
  description: {
    _content: string
  }
}


const Album: React.FC<Props> = props => {
  const [albums, setAlbums] = useState<Album[]>([])
  useEffect(() => {
    fetch(props.url).then(response => response.json())
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
          <img alt={album.title._content} src={`https://live.staticflickr.com/${album.server}/${album.primary}_${album.secret}_q.jpg`}/>
          <div className="album-text-container">
            <h3>{album.title._content}</h3>
            <p>{album.description._content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Album;
