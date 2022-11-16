import { UserDataType } from '../../app/appApi';

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
      return { ...state, userData: { ...action.payload.userData } };
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

//type
export type ActionProfileType = SetUserDataACType;
type InitialStateType = typeof initialState;
export type SetUserDataACType = ReturnType<typeof addUserDataAC>;
