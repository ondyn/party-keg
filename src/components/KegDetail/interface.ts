import * as firebase from 'firebase';

export interface IKegUser {
  name: string,
  id: string,
  createTime: firebase.firestore.Timestamp | null;
}