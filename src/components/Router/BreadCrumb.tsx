import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps, useHistory, useLocation, withRouter } from 'react-router-dom';
import { IContext } from '../../context/interface';
import ApiContext from '../../context/context';


interface ComponentProps {
  location: any;
}

const BreadCrumb = ({}: { location: any }) => {
  const history = useHistory();
  const ctx: IContext = useContext(ApiContext);
  const { kegs } = ctx;

  const handleAction = (event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>) => {
    history.push(`/kegs`);
  };

  let location = useLocation();

  const [kegsActive, setKegsActive] = useState(true);
  const [kegId, setKegId] = useState();
  const [kegName, setKegName] = useState<string>();

  useEffect(() => {
    const elems: string[] = location.pathname.split('/');
    console.log(elems.length);
    if (elems.length > 2) {
      setKegsActive(false);
      setKegId(elems[2]);
    } else {
      setKegsActive(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (kegs && kegId) {
      const keg = kegs.find(keg => keg.uid === kegId);
      if (keg) setKegName(keg.name);
    }
  }, [kegId, kegs]);

  return (
    <>
      <a className="nav-link" style={{
        cursor: 'pointer',
        color: 'white',
        boxSizing: 'border-box',
        borderBottom: kegsActive ? '1px solid white' : ''
      }}
         onClick={(event: React.MouseEvent<HTMLAnchorElement>) => handleAction(event)}
         onKeyPress={(event: React.KeyboardEvent<HTMLAnchorElement>) => handleAction(event)}
         role="button"
         tabIndex={0}>
        Kegs
      </a>
      {!kegsActive ? (
        <>
          <div style={{ padding: '8px', color: 'white' }}>></div>
          <a className="nav-link" style={{
            cursor: 'pointer',
            color: 'white',
            boxSizing: 'border-box',
            borderBottom: kegsActive ? '' : '1px solid white'
          }}
             tabIndex={0}>
            {kegName}
          </a>
        </>) : null
      }
    </>
  );
};

const BreadCrumbWrapper = () => {

};

export default withRouter(BreadCrumb);
