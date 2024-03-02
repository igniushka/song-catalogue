export interface Song {
    "id": string,
    "name": string,
    "artist":string,
    "album": string,
    "genre": string,
    "length": number,
    "year": number
}

export const emptySong: Song = {
    id: "", 
    name: "",
    artist: "",
    album: "",
    genre: "",
    length: 0,
    year: 0
}