// Page on this route will be accessible only for logged in users
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import ApiContext from '../../context/context';
import { AuthStatus, IContext } from '../../context/interface';

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const apiContext = useContext<IContext>(ApiContext);
  const { loginState } = apiContext;
  return (
    <Route
      {...rest}
      render={(props) => (loginState === AuthStatus.LoginSuccess ? (<Component {...props} />)
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
