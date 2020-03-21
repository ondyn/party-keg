import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, withRouter } from 'react-router-dom';
import { IContext } from '../../context/interface';
import ApiContext from '../../context/context';

const BreadCrumb = () => {
  const history = useHistory();
  const ctx: IContext = useContext(ApiContext);
  const { kegs } = ctx;

  // event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>
  const handleAction = () => {
    history.push('/kegs');
  };

  const location = useLocation();

  const [kegsActive, setKegsActive] = useState(true);
  const [kegId, setKegId] = useState('');
  const [kegName, setKegName] = useState<string>();

  useEffect(() => {
    const elems: string[] = location.pathname.split('/');
    if (elems.length > 2) {
      setKegsActive(false);
      setKegId(elems[2]);
    } else {
      setKegsActive(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (kegs && kegId) {
      const keg = kegs.find((k) => k.uid === kegId);
      if (keg) setKegName(keg.name);
    }
  }, [kegId, kegs]);

  return (
    <>
      <button
        className="nav-link"
        type="button"
        style={{
          cursor: 'pointer',
          color: 'white',
          background: 'none',
          boxSizing: 'border-box',
          border: 'none',
          borderBottom: kegsActive ? '1px solid white' : 'none',
        }}
        onClick={handleAction}
        onKeyPress={handleAction}
        tabIndex={0}
      >
        Kegs
      </button>
      {
        !kegsActive ? (
          <>
            <div style={{ padding: '8px', color: 'white' }}>
              &gt;
            </div>
            <button
              type="button"
              className="nav-link"
              style={{
                cursor: 'pointer',
                color: 'white',
                background: 'none',
                border: 'none',
                boxSizing: 'border-box',
                borderBottom: kegsActive ? 'none' : '1px solid white',
              }}
              tabIndex={0}
            >
              {kegName}
            </button>
          </>
        ) : null
      }
    </>
  );
};

export default withRouter(BreadCrumb);
