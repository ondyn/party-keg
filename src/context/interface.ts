import { AuthStatus, IKeg } from './state';

// context state
export interface IContext {
  loginState: AuthStatus;
  loadingData: boolean;
  user: any;
  userId: string;
  login: (username: string, password: string) => void;
  logout: () => void;
  kegs: IKeg[];
  putKeg:(keg: IKeg) => void;
  removeKeg:(kegId: string) => void;
  editKeg:(kegId: string) => void;
  beers: any;
  putBeer:() => void;
  addMember:() => void;
}