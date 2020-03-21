// Menu component with routing and login and user handling
// This is main entrance to TESSA application
import React, { useContext } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import {
  BrowserRouter as Router, NavLink, Route, Switch,
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import ApiContext from '../../context/context';
import { AuthStatus, IContext } from '../../context/interface';
import PrivateRoute from './PrivateRoute';
import SignInPage from '../SignIn';
import Kegs from '../Kegs';
import { KegPage } from '../KegDetail/KegPage';
import BreadCrumb from './BreadCrumb';

// render menu
const MainRouter = () => {
  const apiContext = useContext<IContext>(ApiContext);
  const { logout, loginState } = apiContext;
  const handleSelect = () => {
    console.log('select');
  };

  return (
    <Router data-test="component-app-main">
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <BreadCrumb />
          </Nav>
          {
            loginState === AuthStatus.LoginSuccess
              ? (
                <Nav onSelect={handleSelect}>
                  {
                    // todo: remove style from FontAwesomeIcon, move to SCSS or add another layout
                  }
                  <FontAwesomeIcon
                    style={{ marginLeft: '10px', marginTop: '10px', paddingBottom: '0px' }}
                    className="align-middle"
                    icon={faUser}
                    color="gray"
                  />
                  <NavDropdown alignRight title="" id="basic-nav-dropdown">
                    <NavLink className="dropdown-item" to="/page1">My profile</NavLink>
                    <NavLink className="dropdown-item" to="/page2">Change password</NavLink>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/" onClick={logout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              )
              : null
          }
        </Navbar.Collapse>
      </Navbar>
      {
        //  Routes definition
      }
      <Switch>
        <Route path="/login" component={SignInPage} />
        <PrivateRoute path="/kegs/:id" component={KegPage} />
        <PrivateRoute component={Kegs} />
      </Switch>
    </Router>
  );
};

export default MainRouter;
