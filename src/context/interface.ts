import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// context state
export interface IContext {
  loginState: AuthStatus;
  loadingData: boolean;
  user: any;
  userId: string;
  login: (username: string, password: string) => void;
  logout: () => void;
  kegs: IKeg[];
  putKeg:(keg: IKeg, variant: Crud) => void;
  removeKeg:(kegId: string) => void;
  editKeg:(kegId: string) => void;
  putBeer:() => void;
  addMember:() => void;
  db:(app?: firebase.app.App) => firebase.firestore.Firestore;
}

export enum Crud {
  Create,
  Read,
  Update,
  Delete
}

export enum AuthStatus {
  LoggedOut,
  LoginFail,
  LoginSuccess,
  LoggingIn
}

export interface IKeg {
  uid: string;
  name: string;
  brewery: string;
  epm: number | null;
  volume: number | null;
  price: number | null;
  currency: string;
  alc: number | null;
  startTime: firebase.firestore.Timestamp | null;
  stopTime: firebase.firestore.Timestamp | null;
  isFinished: boolean;
  owner: string;

  drunkVolume?: number;
}

export interface IUser {
  email: string;
  kegs: string[];
  roles: any;
  username: string;
}
