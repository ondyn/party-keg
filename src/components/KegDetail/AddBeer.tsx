import React, { useEffect, useState } from 'react';
import {
  Button, ButtonGroup, Col, Form, Modal,
} from 'react-bootstrap';
import TimeSpan from './TimeSpan';

type IProps = {
  show: boolean,
  userName: string,
  lastTime: number,
  userId: string,
  lastVolume: number,
  onAddBeer: (userId: string, volume: number) => void,
  onClose: () => void,
};

const AddBeer = (
  {
    show, onAddBeer, onClose, lastVolume, userId, lastTime, userName,
  }: IProps,
) => {
  const [showAddBeer, setShowAddBeer] = useState(false);
  const [volume, setVolume] = useState(lastVolume);
  useEffect(() => {
    setShowAddBeer(show);
  }, [show]);

  const onChange = (event: any) => {
    const { value } = event.target;
    setVolume(parseFloat(value));
  };

  const lastBeerInfo = () => {
    if (lastTime === 0) return '';
    return (
      <div>
        <span style={{ fontWeight: 'bold', color: '#f0ad4e' }}>{userName}</span>
        &nbsp;had the last beer&nbsp;
        <TimeSpan
          startTime={lastTime}
          endTime={Date.now()}
          before
          prefix="before"
        />
      </div>
    );
  };

  return (
    <Modal show={showAddBeer} onHide={onClose} animation={false} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <span style={{ fontWeight: 'bold', color: '#f0ad4e' }}>{userName}</span>
          &nbsp;has another beer
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={() => onAddBeer(userId, volume)}>
          <Form.Row>
            <Form.Label>Volume [litres]</Form.Label>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGroupEpm">
              <Form.Control
                as="input"
                type="number"
                name="epm"
                min="0"
                max="100"
                step="0.1"
                placeholder="Glass volume"
                value={volume ? volume.toString() : '0'}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGroup3">
              <ButtonGroup>
                {[0.3, 0.5, 1].map((vol) => (
                  <Button
                    key={vol}
                    onClick={() => setVolume(vol)}
                  >
                    {vol.toLocaleString(navigator.languages[0])}
                    &nbsp;l
                  </Button>
                ))}
              </ButtonGroup>
            </Form.Group>
          </Form.Row>
        </Form>
        <div>
          {lastBeerInfo()}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} tabIndex={-1}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => onAddBeer(userId, volume)} tabIndex={0}>
          Add beer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddBeer;
