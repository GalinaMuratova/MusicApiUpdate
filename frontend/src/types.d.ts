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

export interface  Track {
  _id: string;
  name: string,
  duration: string,
  number: number,
  album: {
    _id: string,
    name: string
  }
}

export interface TrackHistory {
  _id: string,
  user: string,
  track: {
    _id: string,
    name: string
  },
  datetime: string,
  artist: string
}


export interface RegisterMutation {
  username: string,
  password: string
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

