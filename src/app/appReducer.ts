const initialState = {};

export const appReducer = (state: InitialStateType = initialState, action: ActionAppType) => {
  switch (action.type) {
    case 'SOME':
      return state;
    default:
      return state;
  }
};

export const returnDefaultAC = (someThing: any) => {
  return {
    type: 'SOME',
    payload: {
      someThing,
    },
  } as const;
};

// type

export type ActionAppType = ReturnDefaultType;
type InitialStateType = typeof initialState;
export type ReturnDefaultType = ReturnType<typeof returnDefaultAC>;
