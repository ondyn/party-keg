import React from 'react';
import {
  Button, Modal,
} from 'react-bootstrap';

type Props = {
  show: boolean,
  onDelete: () => void,
  onClose: () => void,
  kegName: string,
};

const DeleteKegConfirm = (
  {
    show, onClose, onDelete, kegName,
  }: Props,
) => (
  <Modal show={show} onHide={onClose} animation={false}>
    <Modal.Header closeButton>
      <Modal.Title>
        Are you sure you want to remove the&nbsp;
        <span style={{ color: '#f0ad4e' }}>{kegName}</span>
        &nbsp;keg?
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      If you delete the&nbsp;
      <span style={{ color: '#f0ad4e' }}>{kegName}</span>
      &nbsp;keg, all keg users, beers and keg information will be permanently deleted.
      <span style={{ color: '#e83e8c' }}>This action cannot be undone!</span>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onClose}>
        Cancel
      </Button>
      <Button
        variant="danger"
        onClick={() => {
          onDelete();
          onClose();
        }}
      >
        Delete
      </Button>
    </Modal.Footer>
  </Modal>
);

export default DeleteKegConfirm;
