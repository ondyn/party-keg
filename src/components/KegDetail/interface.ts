import firebase from 'firebase/app';
import 'firebase/firestore';

export interface IKegUser {
  name: string,
  id: string,
  createTime: firebase.firestore.Timestamp | null;
}

export interface IBeer {
  volume: number,
  userId: string,
  createTime: firebase.firestore.Timestamp | null;
}
