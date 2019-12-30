// Menu component with routing and login and user handling
// This is main entrance to TESSA application
import React, { useContext } from 'react';
import {
  Nav, Navbar, NavDropdown,
} from 'react-bootstrap';
import {
  BrowserRouter as Router, Route, Switch, NavLink,
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import ApiContext from '../../context/context';
import { IContext } from '../../context/interface';
import PrivateRoute from './PrivateRoute';
import SignInPage from '../SignIn';
// ################################################################################################
// Temp pages
// They will be replaced by developed components.

// Example page using some React Bootstrap components

function Page1() {
  return <div>page 1</div>;
}

function Page2() {
  return <div>page 2</div>;
}

function Page3() {
  return <div>page 3</div>;
}

function Home() {
  return <div>home</div>;
}

// end of Temp pages
// ################################################################################################

// render menu
const MainRouter = () => {
  const apiContext = useContext<IContext>(ApiContext);
  const { logout, isAuthenticated } = apiContext;
  return (
    <Router data-test="component-app-main">
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Navbar.Brand href="/">
          Party Keg
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {
            // Menu
          }
          <Nav className="mr-auto">
            <NavLink
              className="nav-link"
              exact
              to="/"
            >
              Home
            </NavLink>

            <NavLink className="nav-link" to="/page1">page 1</NavLink>
            <NavLink className="nav-link" to="/page2">page 2</NavLink>
            <NavLink className="nav-link" to="/page3">page 3</NavLink>

          </Nav>
          { isAuthenticated
            ? (
              <Nav>
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
                  <NavDropdown.Item className="disabled" href="#profile-page" onClick={logout}>My profile</NavDropdown.Item>
                  <NavDropdown.Item className="disabled" href="#reservations-page" onClick={logout}>My reservations</NavDropdown.Item>
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
        <Route path="/" exact component={Home} />
        <Route path="/page1" component={Page1} />
        <Route path="/page2" component={Page2} />

        <PrivateRoute path="/page3/" component={Page3} />
        <Route path="/login/" component={SignInPage} />
        <Route component={Home} />
      </Switch>
    </Router>
  );
};

export default MainRouter;
