import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useHistory, useLocation, withRouter } from 'react-router-dom';


interface ComponentProps {
  location: any;
}

const BreadCrumb = ({}: { location: any }) => {
  const history = useHistory();
  const handleAction = (event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>) => {
    history.push(`/kegs`);
  };

  let location = useLocation();

  const [kegsActive, setKegsActive] = useState(true);
  const [kegId, setKegId] = useState();

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

  return (
    <>
      <a className="nav-link active" style={{
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
          <span style={{ color: 'white' }}>></span>
          <a className="nav-link active" style={{
            cursor: 'pointer',
            color: 'white',
            boxSizing: 'border-box',
            borderBottom: kegsActive ? '1px solid white' : ''
          }}
             onClick={(event: React.MouseEvent<HTMLAnchorElement>) => handleAction(event)}
             onKeyPress={(event: React.KeyboardEvent<HTMLAnchorElement>) => handleAction(event)}
             role="button"
             tabIndex={0}>
            {kegId}
          </a>
        </>) : null
      }
    </>
  );
};


export default withRouter(BreadCrumb);
