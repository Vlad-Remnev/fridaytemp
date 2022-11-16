const initialState = {
  error: null as null | string,
};

export const appReducer = (state: InitialStateType = initialState, action: ActionAppType) => {
  switch (action.type) {
    case 'app/SET-ERROR':
      return {...state, error: action.payload.error};
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

// type

export type ActionAppType = SetAppErrorType;
type InitialStateType = typeof initialState;
export type SetAppErrorType = ReturnType<typeof setAppErrorAC>;
