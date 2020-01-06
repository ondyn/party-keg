import * as firebase from 'firebase/app';
import 'firebase/firestore';

// context state
export interface IContext {
  isAuthenticated: boolean;
  loading: boolean;
  user: any;
  error: any;
  // getSims: () => ISim[];
  getDevices: () => any;
  login: (username: string, password: string) => void;
  logout: () => void;
  setLoading: () => void;
  fireDB: firebase.firestore.Firestore;
}