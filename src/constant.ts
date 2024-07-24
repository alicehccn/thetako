import { Photo } from "./interfaces"

export const ALBUM_URL = 'https://www.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=ed1e81b9df15bc0e50ff6efb7803d54f&user_id=10434793%40N00&format=json&nojsoncallback=1'

export const getPhotoUrl = (photo: Photo) => {
  return `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`
}