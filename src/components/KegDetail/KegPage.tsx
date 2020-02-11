import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import KegMenu from './KegMenu';
import UserList from './UserList';
import { IContext } from '../../context/interface';
import ApiContext from '../../context/context';
import { IBeer, IKegUser } from './interface';
import * as firebase from 'firebase';
import { IKeg } from '../../context/state';

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
    firebase.firestore().collection("kegs").doc(id).collection('users').onSnapshot(function (snapshot) {
      console.log('kegs users changed');
      const users: IKegUser[] = [];
      snapshot.forEach(doc => users.push({
        name: doc.data().name,
        id: doc.id,
        createTime: doc.data().createTime
      }));

      setKegUsers(users.sort((a, b) => {
        if (a.createTime && b.createTime) {
          return a.createTime > b.createTime ? 1 : a.createTime < b.createTime ? -1 : 0
        } else
          return 1
      }));
    });
  };

  const registerKegsBeersCB = (id: string) => {
    console.log('registering CB for keg users', id);
    firebase.firestore().collection("kegs").doc(id).collection('beers').onSnapshot(function (snapshot) {
      console.log('kegs beers changed');
      const beers: IBeer[] = [];
      setDrunkVolume(0);
      snapshot.forEach(doc => {
        const beer = doc.data();
        setDrunkVolume(prevState => {
          return prevState + beer.volume
        });
        beers.push({
          volume: beer.volume,
          userId: beer.userId,
          createTime: beer.createTime
        })
      });
      setBeers(beers.sort((a, b) => {
        if (a.createTime && b.createTime) {
          return a.createTime > b.createTime ? 1 : a.createTime < b.createTime ? -1 : 0
        } else
          return 1
      }));
    });
  };


  const addBeer = (userId: string, volume: number) => {
    db().collection(`kegs`).doc(keg!.uid).collection('beers').add({
      userId,
      volume,
      createTime: firebase.firestore.Timestamp.now(),
    })
      .then(function (docRef) {
        console.log("Beer written", docRef.id, ' volume', volume);
      })
      .catch(function (error) {
        console.error("Error writing beer: ", error);
      });
  };


// load kegs users when keg id is ready
  useEffect(() => {
    setKegId(match.params.id);
  }, []);

  useEffect(() => {
    if (kegId && kegs) {
      const newKeg = kegs.find(keg => kegId === keg.uid);
      if (newKeg) {
        setKeg(newKeg);
        registerKegsUserCB(kegId);
        registerKegsBeersCB(kegId);
      }
    }
  }, [kegs, kegId]);

  return (
    <Container>
      {keg ?
        <>
          <Row>
            <Col>
              <div>{`${keg.name} ${drunkVolume ? Math.round(drunkVolume * 2 * 10) / 10 : 0}/${keg.volume ? keg.volume * 2 : 'unknown'}`}</div>
            </Col>
            <Col>
              <KegMenu kegId={keg.uid} kegName={keg.name} />
            </Col>
          </Row>
          <UserList users={kegUsers} beers={beers} addBeer={addBeer}
                    volumePrice={(keg && keg.price && keg.volume) ? keg.price / keg.volume : 0} />
        </> :
        <Row><h3>Keg not found...</h3></Row>
      }

    </Container>
  )
};

export default KegPage;