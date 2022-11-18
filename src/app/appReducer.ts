import { Dispatch } from 'redux';
import { authAPI } from './appApi';
import { AxiosError } from 'axios';
import { setIsLoggedInAC, SetIsLoggedInACType } from './authReducer';
import { addUserDataAC, SetUserDataACType } from '../features/Profile/profileReducer';
import { handleServerAppError } from '../common/utils/error-utils';

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
export const setAppErrorAC = (error: null | string) => ({ type: 'app/SET-ERROR', payload: { error } } as const);
export const setInitialisedAC = (isInitialized: boolean) =>
  ({
    type: 'app/SET-INITIALIZED',
    payload: { isInitialized },
  } as const);

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
    handleServerAppError(e as Error | AxiosError, dispatch);
  } finally {
    dispatch(setInitialisedAC(true));
  }
};

// type
export type ActionAppType = SetAppErrorType | SetInitialisedType | SetIsLoggedInACType | SetUserDataACType;
type InitialStateType = typeof initialState;
export type SetAppErrorType = ReturnType<typeof setAppErrorAC>;
export type SetInitialisedType = ReturnType<typeof setInitialisedAC>;
