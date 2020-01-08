import { AuthStatus, IKeg } from './state';

// context state
export interface IContext {
  loginState: AuthStatus;
  loadingData: boolean;
  user: any;
  login: (username: string, password: string) => void;
  logout: () => void;
  kegs: any;
  putKeg:(keg: IKeg) => void;
  beers: any;
  putBeer:() => void;
  addMember:() => void;
}