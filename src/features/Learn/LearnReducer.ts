import { setAppStatusAC, SetAppStatusType } from '../../app/appReducer';
import { cardsAPI } from '../../app/appApi';
import { setRatingCardAC } from '../PackList/Cards/cardsPeducer';
import { handleServerAppError } from '../../common/utils/error-utils';
import { AxiosError } from 'axios';
import { AppThunkType } from '../../app/store';

const initialState = {
  packId: '',
  packName: '',
};

export const learnReducer = (state: InitialStateType = initialState, action: ActionLearnType): InitialStateType => {
  switch (action.type) {
    case 'learn/SET_USER_PACK':
      return { ...state, packId: action.payload.packId, packName: action.payload.packName };
    default:
      return state;
  }
};

// Actions
export const setUserPackAC = (packId: string, packName: string) => {
  return {
    type: 'learn/SET_USER_PACK',
    payload: { packId, packName },
  } as const;
};

// Thunks
export const setRatingCardTC = (cardId: string, cardRate: number): AppThunkType => async (
  dispatch) => {
  dispatch(setAppStatusAC('loading'));
  try {
    const res = await cardsAPI.setRatingCard({ card_id: cardId, grade: cardRate });

    dispatch(setRatingCardAC(res.data.updatedGrade));
    dispatch(setAppStatusAC('succeeded'));
  } catch (e) {
    handleServerAppError(e as Error | AxiosError, dispatch);
  }
};


// Types
type InitialStateType = typeof initialState

type SetUserPackType = ReturnType<typeof setUserPackAC>
export type ActionLearnType = SetUserPackType | SetAppStatusType