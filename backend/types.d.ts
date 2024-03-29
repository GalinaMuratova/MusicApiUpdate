export interface IArtist {
  name: string;
  information: string;
  image: string | null;
}

export interface IAlbum {
  name: string;
  artist: string;
  year: number;
  image: string | null;
}

export interface ITrack {
  name: string;
  album: string;
  duration: string;
  number: number;
}

export interface IUser {
  username: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  googleId?: string;
  avatar: string | null;
}
