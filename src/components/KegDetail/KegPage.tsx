import React, { useContext, useState } from 'react';
import { match, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import KegMenu from './KegMenu';
import UserList from './UserList';
import AddBeer from './AddBeer';
import { IContext } from '../../context/interface';
import ApiContext from '../../context/context';

interface RouteInfo {
  id: string;
}

interface ComponentProps extends RouteComponentProps<RouteInfo> {
  kegName: string;
}

export const KegPage = ({ match }: ComponentProps) => {
  const ctx: IContext = useContext(ApiContext);
  const { kegs } = ctx;
  const keg = kegs.find(keg => keg.uid === match.params.id);

  return (
    <Container>
      {keg ?
        <>
          <Row>
            <Col>
              <div>{keg ? keg.name : 'Keg not found...'}</div>
            </Col>
            <Col>
              <KegMenu kegId={keg.uid} />
            </Col>
          </Row>
          <UserList kegId={keg.uid} />
        </> :
        <Row><h3>Keg not found...</h3></Row>
      }

    </Container>
  )
};

export default KegPage;