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

const CreateUserForm = (
  {
    show, onCreateUser, onClose, kegName,
  }: CreateUserProps,
) => {
  const [showAddUser, setShowAddUser] = useState(false);

  const [user, setUser] = useState<IKegUser>({
    name: '',
    id: '',
    createTime: null,
  });

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
    <Modal show={showAddUser} onHide={onClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          {`Add new  ${kegName}`}
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
                placeholder="keg name"
                value={user.name}
                onChange={onChange}
              />
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
            setUser({
              name: '',
              id: '',
              createTime: null,
            });
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
