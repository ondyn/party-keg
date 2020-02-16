import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import { IContext } from '../../context/interface';
import ApiContext from '../../context/context';
import CreateUserForm from './CreateUserForm';
import * as firebase from 'firebase';

const KegMenu = ({ kegId, kegName }: { kegId: string, kegName: string }) => {
  const ctx: IContext = useContext(ApiContext);
  const { db } = ctx;

  const [showAddUser, setShowAddUser] = useState(false);
  const handleShowAddUser = () => setShowAddUser(true);
  const handleCloseAddUser = () => setShowAddUser(false);

  const addKegUser = ({ name }: { name: string }) => {
    db().collection(`kegs`).doc(kegId).collection('users').add({
      name,
      createTime: firebase.firestore.Timestamp.now(),
    })
      .then(function (docRef) {
        console.log("User successfully written", docRef.id);
      })
      .catch(function (error) {
        console.error("Error writing keg user: ", error);
      });
    handleCloseAddUser();
  };
  return (
    <>
      <Button onClick={handleShowAddUser} >Add user</Button>
      <Button>Timeline</Button>
      <Button variant="danger">Finish keg</Button>
      <CreateUserForm kegName={kegName} show={showAddUser} onCreateUser={addKegUser} onClose={handleCloseAddUser} />
    </>
  )
};

export default KegMenu;