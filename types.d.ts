export interface IArtist {
    name:string;
    information:string;
    image: string | null
}

export interface IAlbum {
    name:string;
    artist: string,
    year:string;
    image: string | null
}

export interface ITrack {
    name: string,
    album: string,
    duration: string
}

export interface IUser {
    username: string,
    password:string
}