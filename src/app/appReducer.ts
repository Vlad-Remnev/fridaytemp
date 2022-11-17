import { Dispatch } from 'redux';
import { authAPI } from './appApi';
import axios, { AxiosError } from 'axios';
import { setIsLoggedInAC, SetIsLoggedInACType } from './authReducer';
import { addUserDataAC, SetUserDataACType } from '../features/Profile/profileReducer';

const initialState = {
  error: null as null | string,
  isInitialized: false,
};

export const appReducer = (state: InitialStateType = initialState, action: ActionAppType) => {
  switch (action.type) {
    case 'app/SET-ERROR':
      return { ...state, error: action.payload.error };
    case 'app/SET-INITIALIZED':
      return { ...state, isInitialized: action.payload.isInitialized };
    default:
      return state;
  }
};

// Actions
export const setAppErrorAC = (error: null | string) => {
  return {
    type: 'app/SET-ERROR',
    payload: {
      error,
    },
  } as const;
};

export const setInitialisedAC = (isInitialized: boolean) => {
  return {
    type: 'app/SET-INITIALIZED',
    payload: {
      isInitialized,
    },
  } as const;
};

//thunk
export const isInitializedAppTC = () => async (dispatch: Dispatch<ActionAppType>) => {
  try {
    let response = await authAPI.me();
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
    const err = e as Error | AxiosError;
    if (axios.isAxiosError(err)) {
      const error = err.response?.data ? (err.response.data as { error: string }).error : err.message;
      dispatch(setAppErrorAC(error));
    }
  } finally {
    dispatch(setInitialisedAC(true));
  }
};
// type

export type ActionAppType = SetAppErrorType | SetInitialisedType | SetIsLoggedInACType | SetUserDataACType;
type InitialStateType = typeof initialState;
export type SetAppErrorType = ReturnType<typeof setAppErrorAC>;
export type SetInitialisedType = ReturnType<typeof setInitialisedAC>;
