import { authAPI, ForgotDataType, LoginRegisterDataType } from './appApi';
import { Dispatch } from 'redux';
import { AxiosError } from 'axios';
import { SetAppErrorType, setInitialisedAC, SetInitialisedType } from './appReducer';
import { addUserDataAC } from '../features/Profile/profileReducer';
import { handleServerAppError } from '../common/utils/error-utils';

const initialState = {
  isRegistered: false,
  isLoggedIn: false,
};

export const authReducer = (state: InitialStateType = initialState, action: ActionAuthType): InitialStateType => {
  switch (action.type) {
    case 'register/SET-IS-REGISTERED-IN':
      return { ...state, isRegistered: action.payload.value };
    case 'login/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.payload.value };
    default:
      return state;
  }
};

// Actions
export const setIsRegisteredInAC = (value: boolean) =>
  ({
    type: 'register/SET-IS-REGISTERED-IN',
    payload: { value },
  } as const);
export const setIsLoggedInAC = (value: boolean) => ({ type: 'login/SET-IS-LOGGED-IN', payload: { value } } as const);

// Thunks
export const registerTC = (data: LoginRegisterDataType) => async (dispatch: Dispatch<ActionAuthType>) => {
  try {
    await authAPI.register(data);
    dispatch(setIsRegisteredInAC(true));
  } catch (e) {
    handleServerAppError(e as Error | AxiosError, dispatch);
  }
};

export const loginTC = (data: LoginRegisterDataType) => async (dispatch: Dispatch<ActionAuthType>) => {
  try {
    let response = await authAPI.login(data);
    dispatch(setIsLoggedInAC(true));
    dispatch(
      addUserDataAC({
        _id: response.data._id,
        email: response.data.email,
        name: response.data.name,
        publicCardPacksCount: response.data.publicCardPacksCount,
        token: response.data.token,
        avatar: response.data.avatar,
      }),
    );
  } catch (e) {
    handleServerAppError(e as Error | AxiosError, dispatch);
  } finally {
    dispatch(setInitialisedAC(true));
  }
};

export const logoutTC = () => async (dispatch: Dispatch<ActionAuthType>) => {
  try {
    await authAPI.logout();
    dispatch(setIsLoggedInAC(false));
  } catch (e) {
    handleServerAppError(e as Error | AxiosError, dispatch);
  } finally {
    dispatch(setInitialisedAC(true));
  }
};

export const forgotTC = (data: ForgotDataType) => async (dispatch: Dispatch<ActionAuthType>) => {
  try {
    await authAPI.forgot(data);
  } catch (e) {
    handleServerAppError(e as Error | AxiosError, dispatch);
  }
};

// Types
type InitialStateType = typeof initialState;
export type ModelUpdateType = {
  name?: string;
  avatar?: string;
  token?: string;
};

export type SetIsRegisteredInACType = ReturnType<typeof setIsRegisteredInAC>;
export type SetIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>;
export type SetUserDataACType = ReturnType<typeof addUserDataAC>;

export type ActionAuthType = SetIsRegisteredInACType | SetIsLoggedInACType | SetUserDataACType | SetAppErrorType | SetInitialisedType;
