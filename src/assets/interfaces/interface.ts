export interface Album {
    userID: number,
    id: number,
    title: string,
    photos: Photo[],
}
  
export interface Photo {
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string,
}