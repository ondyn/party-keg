import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import * as firebase from 'firebase';
import { faChartLine, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IContext } from '../../context/interface';
import ApiContext from '../../context/context';
import CreateUserForm from './CreateUserForm';
import FinishKegForm from './FinishKegForm';

const KegMenu = (
  {
    kegId,
    kegName,
    kegPrice,
    kegVolume,
    drunkBeers,
  }: {
    kegId: string,
    kegName: string,
    kegPrice: number | null,
    kegVolume: number | null,
    drunkBeers: number,
  },
) => {
  const ctx: IContext = useContext(ApiContext);
  const { db } = ctx;

  const [showAddUser, setShowAddUser] = useState(false);
  const handleShowAddUser = () => setShowAddUser(true);
  const handleCloseAddUser = () => setShowAddUser(false);

  const [showFinishKegForm, setShowFinishKegForm] = useState(false);
  const handleShowFinishKegForm = () => setShowFinishKegForm(true);
  const handleCloseFinishKegForm = () => setShowFinishKegForm(false);

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
        kegName={kegName}
        show={showAddUser}
        onCreateUser={addKegUser}
        onClose={handleCloseAddUser}
      />
      <FinishKegForm
        show={showFinishKegForm}
        onFinishKeg={finishKeg}
        onClose={handleCloseFinishKegForm}
        kegName={kegName}
        kegPrice={kegPrice}
        kegVolume={kegVolume}
        drunkBeers={drunkBeers}
      />
    </>
  );
};

export default KegMenu;
