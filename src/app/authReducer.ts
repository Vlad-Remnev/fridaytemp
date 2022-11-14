import {authAPI, RegisterDataType} from "./appApi";
import {Dispatch} from "redux";

const initialState = {
    isRegistered: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionAuthType):InitialStateType => {
    switch (action.type) {
        case "register/SET-IS-REGISTERED-IN":
            return {...state, isRegistered: action.payload.value}
        default:
            return state
    }
}


// Actions
export const setIsRegisteredInAC = (value: boolean) => {
    return {
        type: 'register/SET-IS-REGISTERED-IN',
        payload: {
            value
        }
    }as const
}

// Thunks
export const registerTC = (data:RegisterDataType) => async (dispatch: Dispatch<ActionAuthType>) => {
    try {
        await authAPI.register(data)
        dispatch(setIsRegisteredInAC(true))
    } catch (e) {
        console.log(e)
    }
}



// Types
type InitialStateType = typeof initialState

export type SetIsRegisteredInACType = ReturnType<typeof setIsRegisteredInAC>
type ActionAuthType = SetIsRegisteredInACType