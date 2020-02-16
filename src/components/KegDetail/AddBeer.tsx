import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Col, Form, Modal } from 'react-bootstrap';

type IProps = {
  show: boolean,
  userName: string,
  lastTime: string,
  userId: string,
  lastVolume: number,
  onAddBeer: (userId: string, volume: number) => void,
  onClose: () => void,
};

const AddBeer = ({ show, onAddBeer, onClose, lastVolume, userId, lastTime, userName }: IProps) => {
  const [showAddBeer, setShowAddBeer] = useState(false);
  const [volume, setVolume] = useState(lastVolume);

  useEffect(() => {
    setShowAddBeer(show);
  }, [show]);

  const onChange = (event: any) => {
    const { value} = event.target;
    setVolume(parseFloat(value));
  };

  return (
    <Modal show={showAddBeer} onHide={onClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title><strong>{userName}</strong> has another beer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Row>
            <Form.Label>Volume [litres]</Form.Label>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGroupEpm">
              <Form.Control as="input" type="number" name="epm" min="0" max="100" step="0.1"
                            placeholder="Glass volume"
                            value={volume ? volume.toString() : '0.5'}
                            onChange={onChange} />
            </Form.Group>
            <Form.Group as={Col} controlId="formGroup3">
              <ButtonGroup>
                {[0.3, 0.5, 1].map((vol)=> (
                    <Button
                      key={vol}
                        onClick={() => setVolume(vol)}>{vol.toLocaleString(navigator.languages[0])}&nbsp;l
                    </Button>
                ))}
              </ButtonGroup>

            </Form.Group>
          </Form.Row>
        </Form>
        <div>
          <span>You had the last beer on: {lastTime}</span>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => onAddBeer(userId, volume)}>
          Add beer
        </Button>
      </Modal.Footer>
    </Modal>
  )
};

export default AddBeer;