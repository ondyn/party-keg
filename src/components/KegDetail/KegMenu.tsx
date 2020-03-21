import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import * as firebase from 'firebase';
import { faChartLine, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IContext } from '../../context/interface';
import ApiContext from '../../context/context';
import CreateUserForm from './CreateUserForm';

const KegMenu = ({ kegId, kegName }: { kegId: string, kegName: string }) => {
  const ctx: IContext = useContext(ApiContext);
  const { db } = ctx;

  const [showAddUser, setShowAddUser] = useState(false);
  const handleShowAddUser = () => setShowAddUser(true);
  const handleCloseAddUser = () => setShowAddUser(false);

  const addKegUser = ({ name }: { name: string }) => {
    db().collection('kegs').doc(kegId).collection('users')
      .add({
        name,
        createTime: firebase.firestore.Timestamp.now(),
      })
      .then((docRef) => {
        console.log('User successfully written', docRef.id);
      })
      .catch((error) => {
        console.error('Error writing keg user: ', error);
      });
    handleCloseAddUser();
  };
  return (
    <>
      <Button style={{ width: '57px' }} onClick={handleShowAddUser}>
        <FontAwesomeIcon
          className="align-middle"
          icon={faPlus}
          transform="up-1"
        />
        <FontAwesomeIcon
          className="align-middle"
          icon={faUser}
          transform="up-1"
        />
      </Button>
      <Button style={{ width: '57px' }}>
        <FontAwesomeIcon
          className="align-middle"
          icon={faChartLine}
          transform="up-1 grow-3"
        />
      </Button>
      <Button variant="danger">Finish keg</Button>
      <CreateUserForm
        kegName={kegName}
        show={showAddUser}
        onCreateUser={addKegUser}
        onClose={handleCloseAddUser}
      />
    </>
  );
};

export default KegMenu;
