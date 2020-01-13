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
  epm: number | null;
  volume: number | null;
  price: number | null;
  currency: string;
  alc: number | null;
  startTime: firebase.firestore.Timestamp | null;
  stopTime: firebase.firestore.Timestamp | null;
  isFinished: boolean;
  owner: string;
}

export interface IUser {
  email: string;
  kegs: string[];
  roles: any;
  username: string;
}

const ApiState: FunctionComponent = ({ children }) => {

  const [loginState, setLoginState] = useState(AuthStatus.LoggedOut);
  const [loadingData, setLoadingData] = useState(false);
  const [user, setUser] = useState<IUser>({
    email: '',
    kegs: [],
    roles: '',
    username: '',
  });
  const [userId, setUserId] = useState();
  const [kegs, setKegs] = useState<IKeg[]>([]);
  const [beers, setBeers] = useState();
  const [userCB, setUserCB] = useState();

  const registerUserCB = (id: string) => {
    if (userCB) {
      userCB();
    }
    console.log('registering CB for user ', id);
    firebase.firestore().collection("users").doc(id).onSnapshot(function (doc) {
      console.log('user data changed');
      // todo update user data

      // if (!doc.metadata.hasPendingWrites)
      //loadUsersKegs(doc.data()!.kegs.reverse());
    });
  };

  const registerUserKegsCB = (id: string) => {
    console.log('registering CB for user ', id);
    firebase.firestore().collection("users").doc(id).collection('kegs').onSnapshot(function (snapshot) {
      console.log('user kegs changed');
      // if (!doc.metadata.hasPendingWrites)
      const kegIds: string[] = [];
      snapshot.forEach(doc => kegIds.push(doc.id));

      loadUsersKegs(kegIds);
    });
  };

  useEffect(() => {
    if (userId && userId !== '') {
      registerUserCB(userId);
      registerUserKegsCB(userId);
    }

  }, [userId]);

  const loadUsersKegs = (ids: string[]) => {

    // const myArr = [...kegs];
    // //remove missing kegs
    // const tmpArr = kegs.filter(keg => { return ids.some(d => d === keg.uid) });
    console.log('Getting kegs for ids:', JSON.stringify(ids));
    // console.log('kegs:',JSON.stringify( myArr));
    // console.log(JSON.stringify(tmpArr));

    // setKegs([]);
    // db.collection('books').where(firebase.firestore.FieldPath.documentId(), '==', 'fK3ddutEpD2qQqRMXNW5').get()
    //.where(firebase.firestore.FieldPath.documentId(), "in", listOfReferences)

    if (ids.length > 0) {
      firebase.firestore().collection('kegs').where(firebase.firestore.FieldPath.documentId(), 'in', ids).get().then((snapshot) => {
        const tempKegs: IKeg[] = [];
        snapshot.forEach((doc) => {
          // console.log('Query: ',doc.data());
          const keg = doc.data();
          tempKegs.push({
            uid: doc.id,
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
          })
        });
        setKegs(tempKegs.sort((a, b) => {
          if (a.startTime && b.startTime) {
            return a.startTime > b.startTime ? -1 : a.startTime < b.startTime ? 1 : 0
          } else
            return 1
        }));
      });
    } else setKegs([]);


    // ids.forEach((kegUid: string) => {
    //   firebase.firestore().doc(`kegs/${kegUid}`)
    //     .get()
    //     .then((snapshot) => {
    //       console.log('loading keg ' + kegUid);
    //       const keg = snapshot.data();
    //       if (keg) {
    //         setKegs(prevState => [...prevState, {
    //           uid: kegUid,
    //           alc: keg!.alc,
    //           brewery: keg!.brewery,
    //           currency: keg!.currency,
    //           epm: keg!.epm,
    //           isFinished: keg!.IsFinished,
    //           name: keg!.name,
    //           owner: keg!.owner,
    //           price: keg!.price,
    //           startTime: keg!.startTime,
    //           stopTime: keg!.stopTime,
    //           volume: keg!.volume
    //         }])
    //       }
    //     });
    // });
  };

  useEffect(() => {
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged(
      (authUser) => {
        if ((authUser)) {
          console.log('onAuthStateChanged: logged in');
          firebase.firestore().doc(`users/${authUser.uid}`)
            .get()
            .then((snapshot) => {
              let dbUser = snapshot.data();
              if (!dbUser && !dbUser!.roles) {
                dbUser!.roles = {};
              }
              console.log('dbUser found: ' + JSON.stringify(dbUser));
              setUserId(authUser.uid);
              //loadUsersKegs(dbUser!.kegs);
              setLoginState(AuthStatus.LoginSuccess);
              setUser(dbUser as IUser);
              // registerUserCB(authUser.uid);
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

  const putKeg = (keg: IKeg) => {
    //if (!keg.startTime)
    keg.startTime = firebase.firestore.Timestamp.now();

    if (!keg.owner)
      keg.owner = userId;

    console.log('adding keg: ' + JSON.stringify(keg));

    // create new keg
    firebase.firestore().collection(`kegs`).add({
      alc: keg.alc,
      brewery: keg.brewery,
      currency: keg.currency,
      epm: keg.epm,
      isFinished: keg.isFinished,
      name: keg.name,
      owner: keg.owner,
      price: keg.price,
      startTime: keg.startTime,
      stopTime: keg.stopTime ? keg.stopTime : null,
      volume: keg.volume,
    })
      .then(function (docRef) {
        console.log("Keg successfully written", docRef.id);
        // add to users kegs

        firebase.firestore().collection('users').doc(userId).collection('kegs').doc(docRef.id).set({})
          .then(() => console.log('keg added under users keg collection'))
          .catch((error) => console.log(error));


        // let newUser = { ...user };
        // newUser.kegs = [...newUser.kegs, docRef.id];
        // firebase.firestore().collection("users").doc(userId).set(newUser)
        //   .then(function () {
        //     console.log("User updated:", JSON.stringify(newUser));
        //   })
        //   .catch(function (error) {
        //     console.error("Error writing user: ", error);
        //   });


      })
      .catch(function (error) {
        console.error("Error writing keg: ", error);
      });

  };

  const removeKeg = (kegId: string) => {

    firebase.firestore().collection("kegs").doc(kegId).delete().then(function () {
      console.log("Keg successfully deleted");
    }).catch(function (error) {
      console.error("Error removing keg: ", error);
    });

    firebase.firestore().collection('users').doc(userId).collection('kegs').doc(kegId).delete()
      .then(() => console.log('keg removed'))
      .catch((error) => console.log(error));

    // let newUser = { ...user };
    // newUser.kegs = newUser.kegs.filter((keg => {
    //   return keg !== kegId;
    // }));
    //
    // firebase.firestore().collection("users").doc(userId).set(newUser)
    //   .then(function () {
    //     console.log("User updated:", JSON.stringify(newUser));
    //   })
    //   .catch(function (error) {
    //     console.error("Error writing user: ", error);
    //   });
  };

  const editKeg = () => {

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
        removeKeg,
        editKeg,
        beers,
        putBeer,
        addMember,
        userId,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

const timestampToString = (timestamp: firebase.firestore.Timestamp): string => {
  return timestamp.toDate().toLocaleDateString();
};

export default ApiState;
export { timestampToString };
