import { authAPI, LoginParamsType, RegisterDataType, UserDataType } from './appApi';
import { Dispatch } from 'redux';
import axios, { AxiosError } from 'axios';
import { setAppErrorAC, SetAppErrorType, setInitialisedAC, SetInitialisedType } from './appReducer';
import { addUserDataAC, SetUserDataACType } from '../features/Profile/profileReducer';

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
            return {...state, isRegistered: action.payload.value};
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.payload.value};
        case "profile/UPDATE-USER-DATA":
            return {...state, userData: {...state.userData, name: action.newData.name, avatar: action.newData.avatar}}
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


export const updateUserDataAC = (newData: UserDataType) => {
    return {
        type: "profile/UPDATE-USER-DATA",
        newData
    } as const
}

// Thunks
export const registerTC = (data: RegisterDataType) => async (dispatch: Dispatch<ActionAuthType>) => {
    try {
        await authAPI.register(data);
        dispatch(setIsRegisteredInAC(true));
    } catch (e) {
        const err = e as Error | AxiosError;
        if (axios.isAxiosError(err)) {
            const error = err.response?.data
                ? (err.response.data as { error: string }).error
                : err.message;
            dispatch(setAppErrorAC(error))
        }
    }
};

export const loginTC = (data: LoginParamsType) => async (dispatch: Dispatch<ActionAuthType>) => {
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
      }),
    );
  } catch (e) {
    const err = e as Error | AxiosError;
    console.log(err);
    if (axios.isAxiosError(err)) {
      const error = err.response?.data ? (err.response.data as { error: string }).error : err.message;
      dispatch(setAppErrorAC(error));
    }
  } finally {
    dispatch(setInitialisedAC(true));
  }
};

export const initializeAppTC = () => async (dispatch: Dispatch<ActionAuthType>) => {
    try {
        let response = await authAPI.me()
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
        const err = e as Error | AxiosError;
        if (axios.isAxiosError(err)) {
            const error = err.response?.data
                ? (err.response.data as { error: string }).error
                : err.message;
            dispatch(setAppErrorAC(error))
        }
    }
}
export const logoutTC = () => async (dispatch: Dispatch<ActionAuthType>) => {
  try {
    await authAPI.logout();
    dispatch(setIsLoggedInAC(false));
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

export const updateUserTC = (data: ModelUpdateType) => async (dispatch: Dispatch<ActionAuthType>, getState: () => AppRootStateType) => {
    const updatedData = getState().auth.userData
    const apiModel = {...updatedData, ...data}

    try {
        const response = await authAPI.updateData(apiModel)
        dispatch(updateUserDataAC(response.data.updatedUser))
    } catch (e) {
        const err = e as Error | AxiosError;
        if (axios.isAxiosError(err)) {
            const error = err.response?.data
                ? (err.response.data as { error: string }).error
                : err.message;
            dispatch(setAppErrorAC(error))
        }
    }
}

// Types
type InitialStateType = typeof initialState;
export type ModelUpdateType = {
    name?: string
    avatar?: string
}

export type SetIsRegisteredInACType = ReturnType<typeof setIsRegisteredInAC>;
export type SetIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>;
export type SetUserDataACType = ReturnType<typeof addUserDataAC>;
export type UpdateUserDAtaType = ReturnType<typeof updateUserDataAC>

export type ActionAuthType =
  | SetIsRegisteredInACType
  | SetIsLoggedInACType
  | SetUserDataACType
  | SetAppErrorType
  | SetInitialisedType
  | UpdateUserDAtaType;
