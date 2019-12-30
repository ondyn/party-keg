export type Action =
  | { type: 'logout', payload: any }
  | { type: 'login_success', payload: any }
  | { type: 'set_loading' }
  | { type: 'auth_error', payload: any }
  | { type: 'login_fail' , payload: any}
  | { type: 'get_sims' , payload: any}
  ;