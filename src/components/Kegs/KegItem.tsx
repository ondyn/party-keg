import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { IKeg } from '../../context/state';
import { Button, Col, Row } from 'react-bootstrap';
import * as firebase from 'firebase';

interface IProps {
  userUid: string,
  onEditKeg: (message: any, editText: any) => void,
  keg: IKeg,
  onRemoveKeg: (uid: string) => void

}

const KegItem = (props: IProps) => {

  const [redirect, setRedirect] = useState(false);
  const history = useHistory();

  return (
    redirect ? <Redirect to={`/kegs/${props.keg.uid}`} /> :
      <Row style={{ border: '1px solid #116466', margin: '3px' }}>
        <Col style={{ padding: '0px' }}>
          <div className="keg-item"
               style={{
                 width: '100%',
                 overflow: 'hidden',
                 textAlign: 'left',
                 margin: '0px',
                 padding: '0px 0px 0px 15px'
               }}
               onClick={() => {
                 //setRedirect(true)
                 history.push(`/kegs/${props.keg.uid}`)
               }}
               onKeyPress={() => {
                 //setRedirect(true)
                 history.push(`/kegs/${props.keg.uid}`)
               }}
               role="button"
               tabIndex={0}
          >
      <span
        style={{ fontSize: '1.5em' }}
      >
        {/* step text */}
        {props.keg.name}
      </span>
            <span style={{ marginLeft: '20px' }}>
            {props.keg.startTime!.toDate().toLocaleString()}
          </span>
            {props.userUid === props.keg.owner && (
              <Button
                style={{ float: 'right' }}
                variant="danger"
                onClick={() => props.onRemoveKeg(props.keg.uid)}
              >
                Delete
              </Button>
            )}
          </div>
        </Col>
      </Row>
  );
};

export default KegItem;
