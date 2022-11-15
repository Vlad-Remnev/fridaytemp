import { authAPI, LoginParamsType, RegisterDataType, UserDataType } from './appApi';
import { Dispatch } from 'redux';

const initialState = {
  isRegistered: false,
  isLoggedIn: false,
  userData: {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0,
  } as UserDataType,
};

export const authReducer = (state: InitialStateType = initialState, action: ActionAuthType): InitialStateType => {
  switch (action.type) {
    case 'register/SET-IS-REGISTERED-IN':
      return { ...state, isRegistered: action.payload.value };
    case 'login/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.payload.value };
    case 'login/ADD-USER-DATA':
      return { ...state, userData: { ...action.payload.userData } };
    default:
      return state;
  }
};

// Actions
export const setIsRegisteredInAC = (value: boolean) => {
  return {
    type: 'register/SET-IS-REGISTERED-IN',
    payload: {
      value,
    },
  } as const;
};

export const setIsLoggedInAC = (value: boolean) => {
  return {
    type: 'login/SET-IS-LOGGED-IN',
    payload: {
      value,
    },
  } as const;
};

export const addUserDataAC = (userData: UserDataType) => {
  debugger;
  return {
    type: 'login/ADD-USER-DATA',
    payload: {
      userData,
    },
  } as const;
};

// Thunks
export const registerTC = (data: RegisterDataType) => async (dispatch: Dispatch<ActionAuthType>) => {
  try {
    let response = await authAPI.register(data);
    console.log(response);
    dispatch(setIsRegisteredInAC(true));
  } catch (e) {
    console.log(e);
  }
};

export const loginTC = (data: LoginParamsType) => async (dispatch: Dispatch<ActionAuthType>) => {
  try {
    let response = await authAPI.login(data);
    debugger;
    dispatch(setIsLoggedInAC(true));
    dispatch(
      addUserDataAC({
        _id: response.data._id,
        email: response.data.email,
        name: response.data.name,
        publicCardPacksCount: response.data.publicCardPacksCount,
      }),
    );
  } catch (e) {
    console.log(e);
  }
};
// Types
type InitialStateType = typeof initialState;

export type SetIsRegisteredInACType = ReturnType<typeof setIsRegisteredInAC>;
export type SetIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>;
export type SetUserDataACType = ReturnType<typeof addUserDataAC>;

export type ActionAuthType = SetIsRegisteredInACType | SetIsLoggedInACType | SetUserDataACType;
