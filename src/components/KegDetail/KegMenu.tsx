import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { faChartLine, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IContext, IKeg } from '../../context/interface';
import ApiContext from '../../context/context';
import CreateUserForm from './CreateUserForm';
import FinishKegForm from './FinishKegForm';

const KegMenu = (
  {
    keg,
    drunkBeers,
  }: {
    keg: IKeg,
    drunkBeers: number,
  },
) => {
  const { uid, name } = keg;
  const ctx: IContext = useContext(ApiContext);
  const { db } = ctx;

  const [showAddUser, setShowAddUser] = useState(false);
  const handleShowAddUser = () => setShowAddUser(true);
  const handleCloseAddUser = () => setShowAddUser(false);

  const [showFinishKegForm, setShowFinishKegForm] = useState(false);
  const handleShowFinishKegForm = () => setShowFinishKegForm(true);
  const handleCloseFinishKegForm = () => setShowFinishKegForm(false);

  const addKegUser = (userName: string) => {
    db().collection('kegs').doc(uid).collection('users')
      .add({
        name: userName,
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

  const finishKeg = (variant: number) => {
    console.log(variant);
    handleCloseFinishKegForm();
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
      <Button variant="danger" onClick={handleShowFinishKegForm}>Finish keg</Button>
      <CreateUserForm
        kegName={name}
        show={showAddUser}
        onCreateUser={addKegUser}
        onClose={handleCloseAddUser}
      />
      <FinishKegForm
        show={showFinishKegForm}
        onFinishKeg={finishKeg}
        onClose={handleCloseFinishKegForm}
        keg={keg}
        drunkBeers={drunkBeers}
      />
    </>
  );
};

export default KegMenu;
