import React, { FunctionComponent, useEffect, useState } from 'react';
import * as firebase from 'firebase/app';
import ApiContext from './context';
import 'firebase/auth';
import 'firebase/firestore';
import {
  AuthStatus, Crud, IKeg, IUser,
} from './interface';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

interface Props {
}

const ApiState: FunctionComponent<Props> = (
  {
    children,
  }: React.PropsWithChildren<Props>,
) => {
  const [loginState, setLoginState] = useState(AuthStatus.LoggedOut);
  const [loadingData] = useState(false);
  const [user, setUser] = useState<IUser>({
    email: '',
    kegs: [],
    roles: '',
    username: '',
  });
  const [userId, setUserId] = useState('');
  const [kegs, setKegs] = useState<IKeg[]>([]);

  // const [userCB, setUserCB] = useState();
  //
  // const registerUserCB = (id: string) => {
  //   if (userCB) userCB();
  //   console.log('registering CB for user ', id);
  //   firebase.firestore().collection('users').doc(id)
  //     .onSnapshot((doc) => {
  //       console.log('user data changed', doc.data());
  //       // todo update user data
  //
  //       // if (!doc.metadata.hasPendingWrites)
  //       // loadUsersKegs(doc.data()!.kegs.reverse());
  //     });
  // };


  // const loadUsersKegs = (ids: string[]) => {
  //   console.log('Getting kegs for ids:', JSON.stringify(ids));
  //
  //   if (ids.length > 0) {
  //     firebase.firestore().collection('kegs')
  //       .where(firebase.firestore.FieldPath.documentId(), 'in', ids)
  //       .onSnapshot((snapshot) => {
  //         console.log('kegs updated: ', snapshot.size);
  //       });
  //
  //     firebase.firestore().collection('kegs')
  //       .where(firebase.firestore.FieldPath.documentId(), 'in', ids).get()
  //       .then((snapshot) => {
  //         const tempKegs: IKeg[] = [];
  //         snapshot.forEach((doc) => {
  //           // console.log('Query: ',doc.data());
  //           const keg = doc.data();
  //           tempKegs.push({
  //             uid: doc.id,
  //             alc: keg!.alc,
  //             brewery: keg!.brewery,
  //             currency: keg!.currency,
  //             epm: keg!.epm,
  //             isFinished: keg!.IsFinished || false,
  //             name: keg!.name,
  //             owner: keg!.owner,
  //             price: keg!.price,
  //             startTime: keg!.startTime,
  //             stopTime: keg!.stopTime,
  //             volume: keg!.volume,
  //           });
  //         });
  //         setKegs(tempKegs.sort((a, b) => {
  //           if (a.startTime && b.startTime) {
  //             if (a.startTime > b.startTime) return -1;
  //             if (a.startTime < b.startTime) return 1;
  //             return 0;
  //           }
  //           return 1;
  //         }));
  //       });
  //   } else setKegs([]);
  // };

  useEffect(() => {
    const registerKegsCB = (ids: string[]) => {
      console.log('Listening for kegs ids:', JSON.stringify(ids));
      if (ids.length > 0) {
        firebase.firestore().collection('kegs')
          .where(firebase.firestore.FieldPath.documentId(), 'in', ids)
          .onSnapshot((snapshot) => {
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
                isFinished: keg!.IsFinished || false,
                name: keg!.name,
                owner: keg!.owner,
                price: keg!.price,
                startTime: keg!.startTime,
                stopTime: keg!.stopTime,
                volume: keg!.volume,
              });
            });
            setKegs(tempKegs.sort((a, b) => {
              if (a.startTime && b.startTime) {
                if (a.startTime > b.startTime) return -1;
                if (a.startTime < b.startTime) return 1;
                return 0;
              }
              return 1;
            }));
          });
      } else setKegs([]);
    };

    const registerUserKegsCB = (id: string) => {
      console.log('registering CB for user ', id);
      firebase.firestore().collection('users').doc(id).collection('kegs')
        .onSnapshot((snapshot) => {
          console.log('user kegs changed');
          // if (!doc.metadata.hasPendingWrites)
          const kegIds: string[] = [];
          snapshot.forEach((doc) => kegIds.push(doc.id));

          // loadUsersKegs(kegIds);
          registerKegsCB(kegIds);
        });
    };

    if (userId && userId !== '') {
      // registerUserCB(userId);
      registerUserKegsCB(userId);
    }
  }, [userId]);

  // on component mount
  useEffect(() => {
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(
      (authUser) => {
        if ((authUser)) {
          console.log('onAuthStateChanged: logged in');
          firebase.firestore().doc(`users/${authUser.uid}`)
            .get()
            .then((snapshot) => {
              const dbUser = snapshot.data();
              if (!dbUser && !dbUser!.roles) {
                dbUser!.roles = {};
              }
              console.log(`dbUser found: ${JSON.stringify(dbUser)}`);
              setUserId(authUser.uid);
              // loadUsersKegs(dbUser!.kegs);
              setLoginState(AuthStatus.LoginSuccess);
              setUser(dbUser as IUser);
              // registerUserCB(authUser.uid);
            });
        } else {
          console.log('onAuthStateChanged: logged out');
          setLoginState(AuthStatus.LoggedOut);
        }
      },
    );
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
        .catch(() => {
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

  const putKeg = (keg: IKeg, variant: Crud) => {
    const tmpKeg = keg;
    if (!tmpKeg.startTime) tmpKeg.startTime = firebase.firestore.Timestamp.now();

    if (!tmpKeg.owner) tmpKeg.owner = userId;

    switch (variant) {
      case Crud.Create:
        console.log(`adding keg: ${JSON.stringify(tmpKeg)}`);
        // create new keg
        firebase.firestore().collection('kegs').add({
          alc: keg.alc,
          brewery: tmpKeg.brewery,
          currency: tmpKeg.currency,
          epm: tmpKeg.epm,
          isFinished: tmpKeg.isFinished,
          name: tmpKeg.name,
          owner: tmpKeg.owner,
          price: tmpKeg.price,
          startTime: tmpKeg.startTime,
          stopTime: tmpKeg.stopTime ? tmpKeg.stopTime : null,
          volume: tmpKeg.volume,
        })
          .then((docRef) => {
            console.log('Keg successfully written', docRef.id);
            // add to users kegs

            firebase.firestore().collection('users').doc(userId)
              .collection('kegs')
              .doc(docRef.id)
              .set({})
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
          .catch((error) => {
            console.error('Error writing keg: ', error);
          });
        break;
      case Crud.Update:
        console.log(`updating keg: ${JSON.stringify(tmpKeg)}`);
        // create new keg
        firebase.firestore().collection('kegs').doc(tmpKeg.uid).set({
          alc: tmpKeg.alc,
          brewery: tmpKeg.brewery,
          currency: tmpKeg.currency,
          epm: tmpKeg.epm,
          isFinished: tmpKeg.isFinished,
          name: tmpKeg.name,
          owner: tmpKeg.owner,
          price: tmpKeg.price,
          startTime: tmpKeg.startTime,
          stopTime: tmpKeg.stopTime ? tmpKeg.stopTime : null,
          volume: tmpKeg.volume,
        })
          .then(() => {
            console.log('Keg successfully updated');
          })
          .catch((error) => {
            console.error('Error updating keg: ', error);
          });
        break;
      default:
        break;
    }
  };

  const removeKeg = (kegId: string) => {
    firebase.firestore().collection('kegs').doc(kegId).delete()
      .then(() => {
        console.log('Keg successfully deleted');
      })
      .catch((error) => {
        console.error('Error removing keg: ', error);
      });

    firebase.firestore().collection('users').doc(userId).collection('kegs')
      .doc(kegId)
      .delete()
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
        loadingData,
        user,
        login,
        logout,
        kegs,
        putKeg,
        removeKeg,
        editKeg,
        putBeer,
        addMember,
        userId,
        db: firebase.firestore,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

const timestampToString = (timestamp: firebase.firestore.Timestamp): string => (
  timestamp.toDate().toLocaleDateString()
);

export default ApiState;
export { timestampToString };
