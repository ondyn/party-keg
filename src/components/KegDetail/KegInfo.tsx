import React from 'react';
import { Col, Row } from 'react-bootstrap';
import * as firebase from 'firebase';
import KegMenu from './KegMenu';

const KegInfo = ({ uid, name, drunkVolume, volume, created, volumePrice }: { uid: string, volumePrice: number, name: string, drunkVolume: number, volume: number | null, created: firebase.firestore.Timestamp | null }) => {
  const drunkBeers = drunkVolume ? Math.round(drunkVolume * 2 * 10) / 10 : -1;
  const drunkBeersString = drunkBeers != -1 ? drunkBeers : '-unknown-';
  const danger = volume && drunkBeers > volume * 2 ? true : false;

  const style = {
    color: danger ? '#e83e8c' : 'white',
    fontWeight: danger ? 'bold' : 'normal',
  } as React.CSSProperties;

  return (
    <Row style={{ border: 'solid 1px #116466', backgroundColor: '#2C3531', color: 'white' }}>
      <Col style={{ fontSize: '1.5em' }}>
        <b>{name}</b>
      </Col>
      <Col style={{ textAlign: 'center' }}>
        <span style={style}>{drunkBeersString}</span>
        <span>/</span>
        <span>{volume ? volume * 2 : '-unknown-'}</span>
        <div style={{ fontSize: '0.8em', marginTop: '-5px' }}>beers</div>
      </Col>
      <Col style={{ textAlign: 'center' }}>
        <div>
          {created ? created.toDate().toLocaleString() : '-unknown-'}
        </div>
        <div style={{ fontSize: '0.8em', marginTop: '-5px' }}>created</div>
      </Col>
      <Col style={{ textAlign: 'center' }}>
        <div>
          {volumePrice != -1 ? Math.round(volumePrice * 100) / 100 : '-unknown-'}
        </div>
        <div style={{ fontSize: '0.8em', marginTop: '-5px' }}>beer price</div>
      </Col>
      <Col xs={4}>
        <KegMenu kegId={uid} kegName={name} />
      </Col>
    </Row>
  )
};
export default KegInfo;