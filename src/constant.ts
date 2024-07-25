import { Album, Photo } from "./interfaces"

export const ALBUMS_URL = 'https://www.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=ed1e81b9df15bc0e50ff6efb7803d54f&user_id=10434793%40N00&format=json&nojsoncallback=1';

export const getPhotoUrl = (photo: Photo) =>
  `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`

export const getAlbumCover = (album: Album) =>
  `https://live.staticflickr.com/${album.server}/${album.primary}_${album.secret}_q.jpg`

export const getPhotosUrl = (albumId: string) => 
  `https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=ed1e81b9df15bc0e50ff6efb7803d54f&photoset_id=${albumId}&user_id=10434793%40N00&format=json&nojsoncallback=1`
