export interface Artist {
  _id: string;
  name: string;
  information: string;
  image: string | null
}

export interface Album {
  _id: string;
  name: string;
  artist: {
    _id: string,
    name: string
  }
  year: number;
  image: string | null
}