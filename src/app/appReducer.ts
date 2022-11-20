import { authAPI } from './appApi';
import { setIsLoggedInAC, SetIsLoggedInACType } from './authReducer';
import { addUserDataAC, SetUserDataACType } from '../features/Profile/profileReducer';
import { Dispatch } from 'redux';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as null | string,
  isInitialized: false,
};

export const appReducer = (
  state: InitialStateType = initialState,
  action: ActionAppType,
): InitialStateType => {
  switch (action.type) {
    case 'app/SET_ERROR':
      return { ...state, error: action.payload.error };
    case 'app/SET_INITIALIZED':
      return { ...state, isInitialized: action.payload.isInitialized };
    case 'app/SET_STATUS':
      return { ...state, status: action.payload.status };
    default:
      return state;
  }
};

// Actions
export const setAppErrorAC = (error: null | string) =>
  ({ type: 'app/SET_ERROR', payload: { error } } as const);

export const setInitialisedAC = (isInitialized: boolean) =>
  ({
    type: 'app/SET_INITIALIZED',
    payload: { isInitialized },
  } as const);

export const setAppStatusAC = (status: RequestStatusType) => {
  return {
    type: 'app/SET_STATUS',
    payload: { status },
  } as const;
};

//thunk
export const isInitializedAppTC = () => async (dispatch: Dispatch<ActionAppType>) => {
  dispatch(setAppStatusAC('loading'));
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
    dispatch(setAppStatusAC('succeeded'));
  } catch (e) {
    dispatch(setAppStatusAC('failed'));
    // handleServerAppError(e as Error | AxiosError, dispatch);
  } finally {
    dispatch(setInitialisedAC(true));
  }
};

// type
export type ActionAppType =
  | SetAppErrorType
  | SetInitialisedType
  | SetIsLoggedInACType
  | SetUserDataACType
  | SetAppStatusType;
type InitialStateType = typeof initialState;
export type SetAppErrorType = ReturnType<typeof setAppErrorAC>;
export type SetInitialisedType = ReturnType<typeof setInitialisedAC>;
export type SetAppStatusType = ReturnType<typeof setAppStatusAC>;
