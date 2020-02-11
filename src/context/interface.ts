import { AuthStatus, IKeg } from './state';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Crud } from '../components/Kegs/Kegs';

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