import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import * as firebase from 'firebase';
import UserList from './UserList';
import { IContext, IKeg } from '../../context/interface';
import ApiContext from '../../context/context';
import { IBeer, IKegUser } from './interface';
import KegInfo from './KegInfo';

interface RouteInfo {
  id: string;
}

interface ComponentProps extends RouteComponentProps<RouteInfo> {
  kegName: string;
}

export const KegPage = ({ match }: ComponentProps) => {
  const ctx: IContext = useContext(ApiContext);
  const { kegs, db } = ctx;
  const [kegUsers, setKegUsers] = useState<IKegUser[]>([]);
  const [beers, setBeers] = useState<IBeer[]>([]);
  const [keg, setKeg] = useState<IKeg>();
  const [kegId, setKegId] = useState<string>();

  const [drunkVolume, setDrunkVolume] = useState<number>(0);

  const registerKegsUserCB = (id: string) => {
    console.log('registering CB for keg users', id);
    firebase.firestore().collection('kegs').doc(id).collection('users')
      .onSnapshot((snapshot) => {
        console.log('kegs users changed');
        const users: IKegUser[] = [];
        snapshot.forEach((doc) => users.push({
          name: doc.data().name,
          id: doc.id,
          createTime: doc.data().createTime,
        }));

        setKegUsers(users.sort((a, b) => {
          if (a.createTime && b.createTime) {
            if (a.createTime > b.createTime) return 1;
            if (a.createTime < b.createTime) return -1;
            return 0;
          }
          return 1;
        }));
      });
  };

  const registerKegsBeersCB = (id: string) => {
    console.log('registering CB for keg users', id);
    firebase.firestore().collection('kegs').doc(id).collection('beers')
      .onSnapshot((snapshot) => {
        console.log('kegs beers changed');
        const tmpBeers: IBeer[] = [];
        setDrunkVolume(0);
        snapshot.forEach((doc) => {
          const beer = doc.data();
          setDrunkVolume((prevState) => (
            prevState + beer.volume));
          tmpBeers.push({
            volume: beer.volume,
            userId: beer.userId,
            createTime: beer.createTime,
          });
        });
        setBeers(tmpBeers.sort((a, b) => {
          if (a.createTime && b.createTime) {
            if (a.createTime > b.createTime) return 1;
            if (a.createTime < b.createTime) return -1;
            return 0;
          }
          return 1;
        }));
      });
  };

  const addBeer = (userId: string, volume: number) => {
    db().collection('kegs').doc(keg!.uid).collection('beers')
      .add({
        userId,
        volume,
        createTime: firebase.firestore.Timestamp.now(),
      })
      .then((docRef) => {
        console.log('Beer written', docRef.id, ' volume', volume);
      })
      .catch((error) => {
        console.error('Error writing beer: ', error);
      });
  };

  // load kegs users when keg id is ready
  useEffect(() => {
    setKegId(match.params.id);
  }, [match.params.id]);

  useEffect(() => {
    if (kegId && kegs) {
      const newKeg = kegs.find((item) => kegId === item.uid);
      if (newKeg) {
        setKeg(newKeg);
        registerKegsUserCB(kegId);
        registerKegsBeersCB(kegId);
      }
    }
  }, [kegs, kegId]);

  const volumePrice = (keg && keg.price && keg.volume) ? keg.price / keg.volume : -1;
  return (
    <Container>
      {
        keg
          ? (
            <>
              <KegInfo
                uid={keg.uid}
                volumePrice={volumePrice}
                drunkVolume={drunkVolume}
                volume={keg.volume}
                name={keg.name}
                created={keg.startTime}
              />
              <UserList
                users={kegUsers}
                beers={beers}
                addBeer={addBeer}
                volumePrice={volumePrice}
              />
            </>
          )
          : <Row><h3>Keg not found...</h3></Row>
      }
    </Container>
  );
};

export default KegPage;
