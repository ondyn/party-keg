
import { IContext } from './interface';
import { Action } from './actionTypes';

export default (state: IContext, action: Action) => {
  switch (action.type) {
    case 'login_success':
      console.log('setting isAuth=true');
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case 'login_fail':
    case 'logout':
    case 'auth_error':
      console.log('log out');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    case 'set_loading':
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
