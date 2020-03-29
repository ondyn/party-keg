import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Row } from 'react-bootstrap';
import KegForm from './KegForm';
import { Crud, IContext, IKeg } from '../../context/interface';
import ApiContext from '../../context/context';
import DeleteKegConfirm from './DeleteKegConfirm';

type MouseEvent = React.MouseEvent<HTMLDivElement | HTMLButtonElement>;
type KeyboardEvent = React.KeyboardEvent<HTMLDivElement>;

const KegItem = ({ keg }: {
  keg: IKeg,
}) => {
  const ctx: IContext = useContext(ApiContext);
  const { putKeg, removeKeg } = ctx;

  const history = useHistory();
  const [showEditKeg, setShowEditKeg] = useState(false);
  const handleShowEditKeg = () => setShowEditKeg(true);
  const handleCloseEditKeg = () => setShowEditKeg(false);

  const [showDeleteKeg, setShowDeleteKeg] = useState(false);

  const handleAction = (
    event: MouseEvent | KeyboardEvent,
  ) => {
    event.stopPropagation();
    switch (event.currentTarget.id) {
      case 'keg':
        history.push(`/kegs/${keg.uid}`);
        break;
      case 'delete':
        setShowDeleteKeg(true);
        break;
      case 'edit':
        handleShowEditKeg();
        break;
      default:
        break;
    }
    event.preventDefault();
  };

  const onKegEdit = (editedKeg: IKeg, variant: Crud) => {
    putKeg(editedKeg, variant);
    handleCloseEditKeg();
  };

  return (
    <>
      <Row
        style={{
          border: '1px solid #116466',
          margin: '3px',
          display: 'flex',
          alignContent: 'stretch',
        }}
      >
        <div
          id="keg"
          className="keg-item"
          style={{
            flex: '1 1 auto',
            alignSelf: 'stretch',
            overflow: 'hidden',
            textAlign: 'left',
            margin: '0px',
            padding: '0px 0px 0px 15px',
            display: 'flex',
            alignContent: 'stretch',
          }}
          onClick={(event: React.MouseEvent<HTMLDivElement>) => handleAction(event)}
          onKeyPress={(event: React.KeyboardEvent<HTMLDivElement>) => handleAction(event)}
          role="button"
          tabIndex={0}
        >
          <span style={{ fontSize: '1.5em' }}>
            {/* step text */}
            {keg.name}
          </span>
          <span style={{
            marginLeft: '20px',
            display: 'inline-flex',
            alignItems: 'center',
          }}
          >
            {
              keg.startTime!.toDate().toLocaleString()
            }
          </span>
          {keg.isFinished
            ? (
              <span style={{
                marginLeft: '20px',
                display: 'inline-flex',
                alignItems: 'center',
                color: '#f0ad4e',
              }}
              >
                FINISHED
              </span>
            )
            : null}
        </div>
        <div style={{ flex: '0 1 auto', alignSelf: 'stretch' }}>
          <Button
            id="delete"
            style={{ float: 'right' }}
            variant="danger"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleAction(event)}
          >
            Delete
          </Button>
          {keg.isFinished
            ? null
            : (
              <Button
                id="edit"
                style={{ float: 'right' }}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleAction(event)}
              >
                Edit
              </Button>
            )}
        </div>
      </Row>
      <KegForm
        variant={Crud.Update}
        show={showEditKeg}
        onFromSubmit={onKegEdit}
        onClose={handleCloseEditKeg}
        keg={keg}
      />
      <DeleteKegConfirm
        show={showDeleteKeg}
        onDelete={() => removeKeg(keg.uid)}
        onClose={() => setShowDeleteKeg(false)}
        kegName={keg.name}
      />
    </>
  );
};

export default KegItem;
