import {authAPI, LoginParamsType, RegisterDataType, UserDataType} from './appApi';
import {Dispatch} from 'redux';
import axios, {AxiosError} from "axios";
import {setAppErrorAC, SetAppErrorType} from "./appReducer";
import {AppRootStateType} from "./store";

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
        case 'login/ADD-USER-DATA':
            return {...state, userData: {...action.payload.userData}};
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

export type ActionAuthType = SetIsRegisteredInACType
    | SetIsLoggedInACType
    | SetUserDataACType
    | SetAppErrorType
    | UpdateUserDAtaType
