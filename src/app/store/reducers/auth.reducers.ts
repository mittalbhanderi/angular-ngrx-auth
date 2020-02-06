import { User } from '../../models/user/user';
import { All, AuthActionTypes } from '../actions/user.actions';

export interface State {
  // is a user authenticated
  isAuthenticated: boolean;
  // if authenticated, then details of the user object
  user: User | null;
  // error/exception message
  errorMessage: string | null;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMessage: null
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          email: action.payload.email
        },
        errorMessage: null
      };

    case AuthActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        errorMessage: 'Login credentials invalid.'
      };

    case AuthActionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          email: action.payload.email
        },
        errorMessage: null
      };

    case AuthActionTypes.SIGNUP_FAILURE:
      return {
        ...state,
        errorMessage: 'Problem signing up. Email already in use.'
      };

    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        errorMessage: null
      };

    default:
      return state;
  }
}
