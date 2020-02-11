import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IKeg } from '../../context/state';
import { Button, Col, Row } from 'react-bootstrap';
import KegForm from './KegForm';
import { Crud } from './Kegs';
import { IContext } from '../../context/interface';
import ApiContext from '../../context/context';

const KegItem = ({ userUid, keg }: {
  userUid: string,
  keg: IKeg,
}) => {
  const ctx: IContext = useContext(ApiContext);
  const { putKeg, removeKeg } = ctx;

  const history = useHistory();
  const [showEditKeg, setShowEditKeg] = useState(false);
  const handleShowEditKeg = () => setShowEditKeg(true);
  const handleCloseEditKeg = () => setShowEditKeg(false);

  const handleAction = (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement> | React.KeyboardEvent<HTMLDivElement>) => {
    event.stopPropagation();
    switch (event.currentTarget.id) {
      case 'keg':
        history.push(`/kegs/${keg.uid}`);
        break;
      case 'delete':
        removeKeg(keg.uid);
        break;
      case 'edit':
        handleShowEditKeg();
        break;
    }
    event.preventDefault();
  };

  const onKegEdit = (keg: IKeg, variant: Crud) => {
    putKeg(keg, variant);
    handleCloseEditKeg();
  };

  return (
    <>
      <Row style={{ border: '1px solid #116466', margin: '3px' }}>
        <Col style={{ padding: '0px' }}>
          <div
            id='keg'
            className="keg-item"
            style={{
              width: '100%',
              overflow: 'hidden',
              textAlign: 'left',
              margin: '0px',
              padding: '0px 0px 0px 15px'
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
            <span style={{ marginLeft: '20px' }}>
            {keg.startTime!.toDate().toLocaleString()}
          </span>
            {userUid === keg.owner && (
              <>
                <Button
                  id='delete'
                  style={{ float: 'right' }}
                  variant="danger"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleAction(event)}
                >
                  Delete
                </Button>
                <Button
                  id='edit'
                  style={{ float: 'right' }}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleAction(event)}
                >
                  Edit
                </Button>
              </>
            )}
          </div>
        </Col>
      </Row>
      <KegForm variant={Crud.Update} show={showEditKeg} onFromSubmit={onKegEdit}
               onClose={handleCloseEditKeg} keg={keg} />
    </>
  );
};

export default KegItem;
