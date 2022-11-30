
const initialState = {
  packId: '',
  packName: '',
}

export const learnReducer = (state: InitialStateType = initialState, action: ActionLearnType):InitialStateType => {
  switch (action.type){
    case 'learn/SET_USER_PACK':
      return { ...state, packId: action.payload.packId, packName: action.payload.packName };
    default:
      return state
  }
}

// Actions
export const setUserPackAC = (packId: string, packName: string) => {
  return{
    type: 'learn/SET_USER_PACK',
    payload: {packId, packName}
  }as const
}

// Thunks





// Types
type InitialStateType = typeof initialState

type SetUserPackType = ReturnType<typeof setUserPackAC>
export type ActionLearnType = SetUserPackType