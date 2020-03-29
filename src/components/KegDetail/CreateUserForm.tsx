import React, { FormEvent, useEffect, useState } from 'react';
import {
  Button, Col, Form, Modal,
} from 'react-bootstrap';
import { IKegUser } from './interface';

type CreateUserProps = {
  show: boolean,
  onCreateUser: (user: IKegUser) => void,
  onClose: () => void,
  kegName: string,
};

const initUser = {
  name: '',
  id: '',
  createTime: null,
  weight: 75,
  isMan: true,
};

const CreateUserForm = (
  {
    show, onCreateUser, onClose, kegName,
  }: CreateUserProps,
) => {
  const [showAddUser, setShowAddUser] = useState(false);

  const [user, setUser] = useState<IKegUser>(initUser);

  useEffect(() => {
    setShowAddUser(show);
  }, [show]);

  const onChange = (event: any) => {
    const { name, value, type } = event.target;
    setUser({ ...user, [name]: type === 'number' ? parseFloat(value) : value });
  };

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (user.name === '') setFormValid(false);
    else setFormValid(true);
  }, [user.name]);

  return (
    <Modal show={showAddUser} onHide={onClose} animation={false} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Add new &nbsp;
          <span style={{ color: '#f0ad4e' }}>{kegName}</span>
          &nbsp; keg user
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(event: FormEvent<HTMLFormElement>) => {
          onCreateUser(user);
          event.preventDefault();
        }}
        >
          <Form.Row>
            <Form.Group as={Col} controlId="formGroupName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                autoFocus
                name="name"
                placeholder="user name"
                value={user.name}
                onChange={onChange}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGroupName">
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type="number"
                name="weight"
                placeholder="weight [kg]"
                value={user.weight ? user.weight.toString() : '0'}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGroupName">
              <Form.Label>Sex</Form.Label>
              <div>
                <input
                  type="radio"
                  name="isMan"
                  checked={user.isMan}
                  onChange={onChange}
                />
                <span style={{ margin: '5px' }}>Man</span>
                <input
                  type="radio"
                  checked={!user.isMan}
                  onChange={() => onChange({
                    target: {
                      name: 'isMan',
                      value: false,
                      type: 'boolean',
                    },
                  })}
                />
                <span style={{ margin: '5px' }}>Other</span>
              </div>
            </Form.Group>
          </Form.Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            onCreateUser(user);
            setUser(initUser);
          }}
          disabled={!formValid}
        >
          Create user
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateUserForm;
