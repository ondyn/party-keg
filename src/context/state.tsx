import React, { useReducer, FunctionComponent, useEffect, useState } from 'react';
import ApiContext from './context';
import ApiReducer from './reducer';
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

firebase.initializeApp(config);
console.log('starting backend');

const ApiState: FunctionComponent  = ({ children }) => {
  const initState = {
    sims: [],
    devices: [],
    reservations: [],
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: false,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(ApiReducer, initState);

  const [listener, setListener] = useState(firebase.auth().onAuthStateChanged(
    (authUser) => {
      if ((authUser)) {
        console.log('onAuthStateChanged'+JSON.stringify(authUser));
        firebase.firestore().doc(`users/${authUser.uid}`)
          .get()
          .then((snapshot) => {
            let dbUser = snapshot.data();
            if (!dbUser && !dbUser!.roles) {
              dbUser!.roles = {};
            }
            console.log('dbUser: ' + JSON.stringify(dbUser));

            return ({
              ...state,
              user: { authUser , dbUser},
            });
          })
      }
      else {
        console.log('onAuthStateChanged: logged out')
      }
    }
  ));

  useEffect(() => {
    console.log('init');
    // firebase.initializeApp(config)
    // eslint-disable-next-line
  }, []);

  // Set Loading
  const setLoading = () => dispatch({ type: 'set_loading' });

  // Load User todo more data
  const loadUser = (username: string) => {
    console.log('Setting the user');
    return ({
      ...state,
      user: { username },
    });
  };

  // Login User
  const login = (email: string, password: string) => {
    try {
      firebase
        .auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          dispatch({type:'login_success', payload: 'OK'});
        })
        .catch((error: any) => {
          dispatch({type:'login_fail', payload: error});
        });
    } catch (err) {
      dispatch({
        type: 'login_fail',
        payload: err,
      });
    }
  };

  // logout
  const logout = () => {
    firebase.auth().signOut();
    dispatch({ type: 'logout', payload: 'logged out' });
  };

  // todo clear Errors
  // const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  // get SIM list
  const getSims = async () => {
    setLoading();

    try {

      dispatch({
        type: 'get_sims',
        payload: 'data',
      });
    } catch {
      dispatch({ type: 'auth_error', payload: 'error' });
    }
  };

  const getDevices = async () => {
    setLoading();

  };

  return (
    <ApiContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        login,
        logout,
        getDevices,
        setLoading,
        fireDB: firebase.firestore(),
      }}
    >
      {/* eslint-disable-next-line react/destructuring-assignment,react/prop-types */}
      { children }
    </ApiContext.Provider>
  );
};

export default ApiState;
