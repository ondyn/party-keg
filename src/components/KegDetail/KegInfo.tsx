import React from 'react';
import { Col, Row } from 'react-bootstrap';
import KegMenu from './KegMenu';
import { IKeg } from '../../context/interface';

const KegInfo = (
  {
    keg, drunkVolume, volumePrice,
  }: {
    keg: IKeg,
    volumePrice: number,
    drunkVolume: number,
  },
) => {
  const {
    volume, name, startTime, price, uid,
  } = keg;
  const drunkBeers = drunkVolume ? Math.round(drunkVolume * 2 * 10) / 10 : 0;
  // const drunkBeersString = drunkBeers > 0 ? drunkBeers : '-unknown-';
  const danger = volume && drunkBeers > volume * 2;

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
        <span style={style}>{drunkBeers}</span>
        <span>/</span>
        <span>{volume ? volume * 2 : '-unknown-'}</span>
        <div style={{ fontSize: '0.8em', marginTop: '-5px' }}>beers</div>
      </Col>
      <Col style={{ textAlign: 'center' }}>
        <div>
          {startTime ? startTime.toDate().toLocaleString() : '-unknown-'}
        </div>
        <div style={{ fontSize: '0.8em', marginTop: '-5px' }}>created</div>
      </Col>
      <Col style={{ textAlign: 'center' }}>
        <div>
          {!keg.isFinished
            ? volumePrice !== -1 ? Math.round((volumePrice / 2) * 100) / 100 : '-unknown-'
            : keg.finalBeerPrice}
        </div>
        <div style={{ fontSize: '0.8em', marginTop: '-5px' }}>beer price</div>
      </Col>
      <Col className="d-flex justify-content-end" xs={4} style={{ padding: '0px 0px 0px 5px' }}>
        <KegMenu
          keg={keg}
          drunkBeers={drunkBeers}
        />
      </Col>
    </Row>
  );
};
export default KegInfo;
