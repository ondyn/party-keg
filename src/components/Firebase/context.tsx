import React from 'react';
import Firebase from './firebase';

const FirebaseContext = React.createContext(Firebase);

interface WithFirebaseProps {
  firebase: any;
}

export const withFirebase = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & WithFirebaseProps> => ({
                                         firebase,
                                         ...props
                                       }: WithFirebaseProps) =>
  <Component {...props as P} />;

export default FirebaseContext;