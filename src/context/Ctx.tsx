import React, {Component, createContext} from "react";
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

interface IState {
  count: number
}

interface IActions {
  increase: () => void;
  decrease: () => void;
  fs: () => any;
  db: firebase.firestore.Firestore;
  serverTimeStamp: any;
}

export interface ICtx {
  state: IState;
  actions: IActions;
}

const ctx = createContext<any>(null);

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

console.log('Ctx started');

class AppProvider extends Component<{}, IState> {
  state: IState = {
    count: 0
  };
  increase = () => this.setState({count: this.state.count + 1});
  decrease = () => this.setState({count: this.state.count - 1});
  render() {
    return (
      <ctx.Provider
        value={{
          state: this.state,
          actions: {
            increase: this.increase,
            decrease: this.decrease,
            fs: firebase.firestore(),
            db: firebase.firestore(),
            auth: firebase.auth(),
            serverTimeStamp: firebase.firestore.FieldValue.serverTimestamp(),
          }
        }}>
        {this.props.children}
      </ctx.Provider>
    );
  }
}
export {AppProvider};
export const AppConsumer = ctx.Consumer;

export default ctx;