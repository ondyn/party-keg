import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faGoogle, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import {
  Alert, Button, Card, Container, Form,
} from 'react-bootstrap';
import { AuthStatus, IContext } from '../../context/interface';
import Context from '../../context/context';

interface IProps {
  location: any;
}

const SignInPage = (props: IProps) => {
  const { location } = props;
  return (
    <div>
      <SignInForm location={location} />
      {/* <PasswordForgetLink /> */}
      {/* <SignUpLink /> */}
    </div>
  );
};

const SignInForm = (props: IProps) => {
  const context = useContext<IContext>(Context);
  const { login, loginState } = context;
  const [value, setValue] = useState({
    email: '',
    pwd: '',
  });

  const onSubmit = (event: any) => {
    login(value.email, value.pwd);
    event.preventDefault();
  };

  const onChange = (event: any) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  const isInvalid = value.pwd === '' || value.email === '';

  // redirect to the required page if authenticated
  const { location: { state: { from: { pathname } } = { from: { pathname: '/' } } } } = props;
  if (loginState === AuthStatus.LoginSuccess) return <Redirect to={pathname} />;

  return (
    <Container>
      <div className="d-flex justify-content-center h-100">
        <Card>
          <Card.Header>
            <h3>Sign In</h3>
            <div className="d-flex justify-content-end social_icon">
              <Button size="sm">
                <FontAwesomeIcon
                  className="align-middle"
                  icon={faFacebookSquare}
                  color="lightgrey"
                  transform="up-2 grow-3"
                />
              </Button>
              <Button size="sm">
                <FontAwesomeIcon
                  className="align-middle"
                  icon={faGoogle}
                  color="lightgrey"
                  transform="up-2 grow-3"
                />
              </Button>
              <Button size="sm">
                <FontAwesomeIcon
                  className="align-middle"
                  icon={faTwitterSquare}
                  color="lightgrey"
                  transform="up-2 grow-3"
                />
              </Button>
            </div>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label column={false}>Email address</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={value.email}
                  onChange={onChange}
                />
                <Form.Text className="text-muted">
                  We&apos;ll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label column={false}>Password</Form.Label>
                <Form.Control
                  name="pwd"
                  type="password"
                  placeholder="Password"
                  value={value.pwd}
                  onChange={onChange}
                />
              </Form.Group>
              <Button className="float-right" disabled={isInvalid} variant="primary" type="submit">
                Sign In
              </Button>
            </Form>
          </Card.Body>
          <Card.Footer>
            <div className="d-flex justify-content-center links">
              <span>Don&apos;t have an account?&nbsp;</span>
              <a href="/">Sign Up</a>
            </div>
            <div className="d-flex justify-content-center">
              <a href="/">Forgot your password?</a>
            </div>
            {loginState === AuthStatus.LoginFail
            && (
              <div
                className="justify-content-center"
                style={{ width: '233px', textAlign: 'center' }}
              >
                <Alert variant="primary">
                  Unable to sign in.
                </Alert>
              </div>
            )}
          </Card.Footer>
        </Card>
      </div>
    </Container>
  );
};

export default SignInPage;
