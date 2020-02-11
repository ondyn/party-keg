import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import User from './User';
import AddBeer from './AddBeer';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { IContext } from '../../context/interface';
import ApiContext from '../../context/context';
import { IKeg } from '../../context/state';
import { IKegUser } from './interface';

const UserList = ({ kegId }: { kegId: string }) => {
  const ctx: IContext = useContext(ApiContext);
  const [kegUsers, setKegUsers] = useState<IKegUser[]>([]);
  const { db } = ctx;

  const getKegUsers = () => {
    db().collection(`kegs`).doc(kegId).collection('users').get()
      .then((snapshot) => {
        const users: IKegUser[] = [];
        snapshot.forEach((doc) => {
          // console.log('Query: ',doc.data());
          const user = doc.data();
          users.push({
            id: doc.id,
            name: user.name,
            createTime: user.createTime,
          })
        });
        setKegUsers(users);
      })
  };

  const registerKegsUserCB = (id: string) => {
    console.log('registering CB for keg users', id);
    firebase.firestore().collection("kegs").doc(id).collection('users').onSnapshot(function (snapshot) {
      console.log('kegs users changed');
      const users: IKegUser[] = [];
      snapshot.forEach(doc => users.push({ name: doc.data().name, id: doc.id, createTime: doc.data().createTime }));

      setKegUsers(users.sort((a, b) => {
        if (a.createTime && b.createTime) {
          return a.createTime > b.createTime ? 1 : a.createTime < b.createTime ? -1 : 0
        } else
          return 1
      }));
    });
  };

  // load kegs users on mount
  useEffect(() => {
    // getKegUsers();
    registerKegsUserCB(kegId);
  }, []);

  return (
    <>
      {kegUsers.map(user =>
        <User
          key={user.id}
          actualVolume={0.5}
          alcInBlood={0.2}
          beerCount={6}
          beerPrice={89}
          lastTime={(new Date()).toLocaleString()}
          name={user.name}
          userId="abcd" />
      )
      }
    </>
  )
};

export default UserList;