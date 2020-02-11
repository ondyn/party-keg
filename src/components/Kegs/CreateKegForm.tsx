import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal } from 'react-bootstrap';
import { IKeg } from '../../context/state';

type CreateKegProps = {
  show: boolean,
  onCreateKeg: (keg: IKeg) => void,
  onClose: () => void,
};

const CreateKegForm = ({ show, onCreateKeg, onClose }: CreateKegProps) => {
  const [showAddKeg, setShowAddKeg] = useState(false);

  const [keg, setKeg] = useState<IKeg>({
    name: '',
    volume: null,
    stopTime: null,
    startTime: null,
    price: null,
    epm: null,
    currency: '',
    owner: '',
    isFinished: false,
    brewery: '',
    alc: null,
    uid: ''
  });

  useEffect(() => {
    setShowAddKeg(show);
  }, [show]);

  const onChange = (event: any) => {
    const { name, value, type } = event.target;
    setKeg({ ...keg, [name]: type === 'number' ? parseFloat(value) : value });
  };

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    keg.name === '' ? setFormValid(false) : setFormValid(true);
  }, [keg.name]);

  return (
    <Modal show={showAddKeg} onHide={onClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add new keg</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formGroupName">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" placeholder="keg name" value={keg.name}
                            onChange={onChange} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGroupBrewery">
              <Form.Label>Brewery</Form.Label>
              <Form.Control name="brewery" placeholder="brewery name" value={keg.brewery}
                            onChange={onChange} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGroupEpm">
              <Form.Label>Epm [%]</Form.Label>
              <Form.Control as="input" type="number" name="epm" min="0" max="100"
                            placeholder="beer EPM (10, 11,12)"
                            value={keg.epm ? keg.epm.toString() : ''}
                            onChange={onChange} />
            </Form.Group>
            <Form.Group as={Col} controlId="formGroupAlc">
              <Form.Label>Alc [%]</Form.Label>
              <Form.Control as="input" type="number" name="alc" min="0" max="100" step="0.1"
                            placeholder="alcohol by volume"
                            value={keg.alc ? keg.alc.toString() : ''} onChange={onChange} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGroupVolume">
              <Form.Label>Volume [litres]</Form.Label>
              <Form.Control as="input" type="number" name="volume" min="0" max="500"
                            placeholder="keg volume" value={keg.volume ? keg.volume.toString() : ''}
                            onChange={onChange} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGroupPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control as="input" type="number" name="price" min="0" placeholder="keg price"
                            value={keg.price ? keg.price.toString() : ''} onChange={onChange} />
            </Form.Group>
            <Form.Group as={Col} controlId="formGroupCurrency">
              <Form.Label>Currency</Form.Label>
              <Form.Control name="currency" placeholder="currency" value={keg.currency}
                            onChange={onChange} />
            </Form.Group>
          </Form.Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => onCreateKeg(keg)} disabled={!formValid}>
          Create keg
        </Button>
      </Modal.Footer>
    </Modal>
  )
};

export default CreateKegForm;
