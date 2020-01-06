import React, { FunctionComponent, useEffect, useState } from 'react';
import ApiContext from './context';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

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
  epm: number;
  volume: number;
  price: number;
  currency: string;
  alc: number;
  startTime: number;
  stopTime: number;
  isFinished: boolean;
  owner: string;
}

export interface IUser {
  email: string;
  kegs: string[];
  roles: any;
  username: string;
}

firebase.initializeApp(config);
console.log('starting backend');

const ApiState: FunctionComponent = ({ children }) => {

  const [loginState, setLoginState] = useState(AuthStatus.LoggedOut);
  const [loadingData, setLoadingData] = useState(false);
  const [user, setUser] = useState();
  const [kegs, setKegs] = useState<IKeg[]>([]);
  const [beers, setBeers] = useState();

  useEffect(() => {
    console.log('ApiState started');
    firebase.auth().onAuthStateChanged(
      (authUser) => {
        if ((authUser)) {
          console.log('onAuthStateChanged: ' + JSON.stringify(authUser));
          firebase.firestore().doc(`users/${authUser.uid}`)
            .get()
            .then((snapshot) => {
              let dbUser = snapshot.data();
              if (!dbUser && !dbUser!.roles) {
                dbUser!.roles = {};
              }
              console.log('dbUser found: ' + JSON.stringify(dbUser));
              dbUser!.kegs.map((kegUid: string) => {
                firebase.firestore().doc(`kegs/${kegUid}`)
                  .get()
                  .then((snapshot) => {
                    console.log('loading keg ' + kegUid);
                    const keg = snapshot.data();
                    if (keg) {
                      setKegs(prevState => [...prevState, {
                        uid: kegUid,
                        alc: keg!.alc,
                        brewery: keg!.brewery,
                        currency: keg!.currency,
                        epm: keg!.epm,
                        isFinished: keg!.IsFinished,
                        name: keg!.name,
                        owner: keg!.owner,
                        price: keg!.price,
                        startTime: keg!.startTime,
                        stopTime: keg!.stopTime,
                        volume: keg!.volume
                      }])
                    }
                  });
              });
              setLoginState(AuthStatus.LoginSuccess);
              setUser(dbUser);
            })
        } else {
          console.log('onAuthStateChanged: logged out');
          setLoginState(AuthStatus.LoggedOut);
        }
      }
    )
  }, []);

  // Login User
  const login = (email: string, password: string) => {
    try {
      setLoginState(AuthStatus.LoggingIn);
      firebase
        .auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('login success');
          // setLoginState(AuthStatus.LoginSuccess);
        })
        .catch((error: any) => {
          setLoginState(AuthStatus.LoginFail);
        });
    } catch (err) {
      setLoginState(AuthStatus.LoginFail);
    }
  };

  // logout
  const logout = () => {
    firebase.auth().signOut();
    setLoginState(AuthStatus.LoggedOut);
  };

  const putKeg = () => {

  };

  const putBeer = () => {

  };

  const addMember = () => {

  };

  return (
    <ApiContext.Provider
      value={{
        loginState,
        loadingData: loadingData,
        user: user,
        login,
        logout,
        kegs,
        putKeg,
        beers,
        putBeer,
        addMember,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiState;
