import {authAPI, NewPasswordData, UserDataType} from '../../app/appApi';
import { Dispatch } from 'redux';
import { AppRootStateType } from '../../app/store';
import axios, { AxiosError } from 'axios';
import { setAppErrorAC, SetAppErrorType } from '../../app/appReducer';
import { ModelUpdateType } from '../../app/authReducer';

const initialState = {
  userData: {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0,
    token: '',
  } as UserDataType,
};

export const profileReducer = (state: InitialStateType = initialState, action: ActionProfileType) => {
  switch (action.type) {
    case 'login/ADD-USER-DATA':
      console.log({ ...state, userData: { ...action.payload.userData } })
      return { ...state, userData: { ...action.payload.userData } };
    case 'profile/UPDATE-USER-DATA':
      return { ...state, userData: { ...state.userData, name: action.newData.name, avatar: action.newData.avatar, token: action.newData.token } };
    default:
      return state;
  }
};

//action
export const addUserDataAC = (userData: UserDataType) => {
  return {
    type: 'login/ADD-USER-DATA',
    payload: {
      userData,
    },
  } as const;
};

export const updateUserDataAC = (newData: UserDataType) => {
  return {
    type: 'profile/UPDATE-USER-DATA',
    newData,
  } as const;
};
// thunk

export const updateUserTC =
  (data: ModelUpdateType) => async (dispatch: Dispatch<ActionProfileType>, getState: () => AppRootStateType) => {
    const updatedData = getState().profile.userData;
    const apiModel = { ...updatedData, ...data };
    try {
      const response = await authAPI.updateData(apiModel);
      dispatch(updateUserDataAC(response.data.updatedUser));
    } catch (e) {
      const err = e as Error | AxiosError;
      if (axios.isAxiosError(err)) {
        const error = err.response?.data ? (err.response.data as { error: string }).error : err.message;
        dispatch(setAppErrorAC(error));
      }
    }
  };

export const setNewPasswordTC = (data: NewPasswordData) => async (dispatch: Dispatch<ActionProfileType>)  => {
  try {
    await authAPI.setNewPassword(data)
  } catch (e) {
    const err = e as Error | AxiosError;
    if (axios.isAxiosError(err)) {
      const error = err.response?.data ? (err.response.data as { error: string }).error : err.message;
      dispatch(setAppErrorAC(error));
    }
  }
}

//type
export type ActionProfileType = SetUserDataACType | UpdateUserDAtaType | SetAppErrorType;
type InitialStateType = typeof initialState;
export type SetUserDataACType = ReturnType<typeof addUserDataAC>;
export type UpdateUserDAtaType = ReturnType<typeof updateUserDataAC>;
