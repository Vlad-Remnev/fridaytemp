const initialState = {}

export const someReducer = (state: any = initialState, action: ReturnDefaultType) => {
    switch (action.type) {
        case "SOME":
            return state
        default:
            return state
    }
}

export type ReturnDefaultType = ReturnType<typeof returnDefaultAC>
export const returnDefaultAC = (someThing: any) => {
    return {
        type: 'SOME',
        payload: {
            someThing
        }
    }as const
}