export interface Photo {
  id: string,
  owner: string,
  secret: string,
  server: string,
  farm: number,
  title: string,
  ispublic: number,
  isfriend: number,
  isfamily: number
}

export interface Album {
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
