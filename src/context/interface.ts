import { AuthStatus, IKeg } from './state';
import * as firebase from 'firebase/app';
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
  putKeg:(keg: IKeg) => void;
  removeKeg:(kegId: string) => void;
  editKeg:(kegId: string) => void;
  beers: any;
  putBeer:() => void;
  addMember:() => void;
  db:(app?: firebase.app.App) => firebase.firestore.Firestore;
}