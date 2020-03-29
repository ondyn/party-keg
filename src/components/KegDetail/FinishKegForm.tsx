import React, { useEffect, useState } from 'react';
import {
  Button, Col, Container, Modal, Row,
} from 'react-bootstrap';
import { IKeg } from '../../context/interface';

type FinishKegProps = {
  show: boolean,
  onFinishKeg: (closingBeerPrice: number) => void,
  onClose: () => void,
  keg: IKeg,
  drunkBeers: number,
};

const FinishKegForm = (
  {
    show, onClose, keg, onFinishKeg, drunkBeers,
  }: FinishKegProps,
) => {
  const { price, volume, name } = keg;
  const [showForm, setShowForm] = useState(false);
  const [billingVariant, setBillingVariant] = useState(1);
  const [customPrice, setCustomPrice] = useState(0);
  const [beerPrice, setBeerPrice] = useState(0);
  const [drunkenPrice, setDrunkenPrice] = useState(0);
  const [delta, setDelta] = useState(0);

  useEffect(() => {
    setShowForm(show);
  }, [show]);

  useEffect(() => {
    const drunkenP = price && drunkBeers && drunkBeers > 0
      ? Math.round((price / drunkBeers) * 100) / 100
      : 0;
    setBeerPrice(price && volume
      ? Math.round((price / (2 * volume)) * 100) / 100
      : 0);
    setDrunkenPrice(drunkenP);
    setCustomPrice(drunkenP);
  }, [price, volume, drunkBeers]);

  const onBeerPriceChange = (event: any) => {
    const { value, type } = event.target;
    const p = type === 'number' ? parseFloat(value) : 0;
    setCustomPrice(p);
    setDelta(price && customPrice
      ? Math.round((p * drunkBeers - price) * 100) / 100
      : 0);
    setBillingVariant(3);
  };

  return (
    <Modal show={showForm} onHide={onClose} animation={false} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Well done, you you&apos;ve finished &nbsp;
          <span style={{ color: '#f0ad4e' }}>{name}</span>
          &nbsp; keg!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              Choose billing method:
            </Col>
          </Row>
          <Row>
            <Col
              xs={1}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              <input
                type="radio"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
                value={1}
                checked={billingVariant === 1}
                onChange={() => setBillingVariant(1)}
              />
            </Col>
            <Col style={{
              fontWeight: billingVariant === 1 ? 'bolder' : 'normal',
              display: 'inline-flex',
              alignItems: 'center',
            }}
            >
              Keep the default price for beer, calculated as Keg Price / Keg Volume.
            </Col>
            <Col style={{
              display: 'inline-flex',
              alignItems: 'center',
            }}
            >
              {`${price} / ${volume && volume * 2} = ${beerPrice} Kč/beer`}
            </Col>
          </Row>
          <Row>
            <Col
              xs={1}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              <input
                type="radio"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
                value={2}
                checked={billingVariant === 2}
                onChange={() => setBillingVariant(2)}
              />
            </Col>
            <Col style={{
              fontWeight: billingVariant === 2 ? 'bolder' : 'normal',
              display: 'inline-flex',
              alignItems: 'center',
            }}
            >
              Recalculate the price for beer as Keg price / number of beers consumed.
            </Col>
            <Col style={{
              display: 'inline-flex',
              alignItems: 'center',
            }}
            >
              {`${price} / ${drunkBeers} = ${drunkenPrice} Kč/beer`}
            </Col>
          </Row>
          <Row>
            <Col
              xs={1}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              <input
                type="radio"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
                value={3}
                checked={billingVariant === 3}
                onChange={() => setBillingVariant(3)}
              />
            </Col>
            <Col
              xs={6}
              style={{
                fontWeight: billingVariant === 3 ? 'bolder' : 'normal',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              Set custom price per beer:
            </Col>
            <Col
              xs={2}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              <input
                style={{ minWidth: '75px' }}
                name="price"
                min="0"
                step="0.01"
                placeholder="custom beer price"
                type="number"
                id="formGroupPrice"
                className="form-control"
                value={customPrice || 0}
                onChange={onBeerPriceChange}
              />
            </Col>
            <Col
              xs={3}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0',
              }}
            >
              {`${drunkBeers} *  ${customPrice} - ${price} = `}
              &nbsp;
              <span style={{ color: delta < 0 ? '#e83e8c' : '#325B67' }}>{delta}</span>
              &nbsp;
              Kč
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            let finalBeerPrice = 0;
            switch (billingVariant) {
              case 1:
              default:
                finalBeerPrice = beerPrice || 0;
                break;
              case 2:
                finalBeerPrice = drunkenPrice || 0;
                break;
              case 3:
                finalBeerPrice = customPrice || 0;
                break;
            }
            onFinishKeg(finalBeerPrice);
          }}
        >
          Finish Keg
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FinishKegForm;
