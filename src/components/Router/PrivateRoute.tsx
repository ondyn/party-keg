// Page on this route will be accessible only for logged in users
import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import ApiContext from '../../context/context';
import { IContext } from '../../context/interface';
import { AuthStatus } from '../../context/state';


const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const apiContext = useContext<IContext>(ApiContext);
  const { loginState } = apiContext;
  return (
    <Route
      {...rest}
      render={props => (loginState === AuthStatus.LoginSuccess ? (<Component {...props} />)
        : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        ))}
    />
  );
};

export default PrivateRoute;
