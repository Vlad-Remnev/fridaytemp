import {AxiosError} from 'axios';
import {
  cardsAPI,
  CardType,
  NewCardAddType,
  SetRatingCardPutType,
  SetRatingResponseType,
  UpdateCardPutType
} from "../../../app/appApi";
import {setAppStatusAC, SetAppStatusType} from "../../../app/appReducer";
import {handleServerAppError} from "../../../common/utils/error-utils";
import {Dispatch} from "redux";
import {AppThunkType} from "../../../app/store";
import {addPackAC} from "../packsListReducer";

const initialState = {
  cards: [
    {answer: "no answer",
    question: "no question",
    cardsPack_id: "5eb6a2f72f849402d46c6ac4adadwadwadwa",
    grade: 4.987525071790364,
    shots: 1,
    user_id: "142151531535151",
    created: "2020-05-13T11:05:44.867Z",
    updated: "2020-05-13T11:05:44.867Z",
    _id: "5ebbd48876810f1ad0e7ece3adwadawd"}
] as CardType[],
  packUserId: "607e82d176b4881da8c02a16dawdawdwadwa",
  packName: "Reactdawdawdwad",
  packPrivate: false,
  packDeckCover: "",
  packCreated: "2021-04-21T13:14:24.464Z",
  packUpdated: "2021-07-10T15:35:42.016Z",
  page: 1,
  pageCount: 5,
  cardsTotalCount: 30,
  minGrade: 0,
  maxGrade: 6,
  token: "1e9ca150-6b3a-11ed-9bc3-29dc263e16ab",
  tokenDeathTime: 1669224088421
};

export const cardsReducer = (
  state: CardsStateType = initialState,
  action: ActionCardsType,
): CardsStateType => {
  switch (action.type) {
    case 'cards/SET_CARDS':
      return {
        ...state,
        ...action.payload.cards,
        cards: action.payload.cards.cards.map((el) => ({...el})),
      };
    case 'cards/ADD_CARD':
      return {...state, cards: [action.payload.card, ...state.cards]};
    case 'cards/REMOVE_CARD':
      return {...state, cards: state.cards.filter(el => el._id !== action.payload.cardId)}
    case 'cards/UPDATE_CARD':
      return {...state, cards: state.cards.map(el =>
          el._id === action.payload.updateData._id
            ? {...action.payload.updateData}
            : el )}
    case 'cards/SET_RATING_CARD':
      return {...state,
        cards: state.cards.map(el => el._id === action.payload.updatedGrade.card_id
            ? {...el, grade: action.payload.updatedGrade.grade, shots: action.payload.updatedGrade.shots}
            : el )}
    default:
      return state;
  }
};

// Actions
export const setCardsAC = (cards: CardsStateType) => {
  return {
    type: 'cards/SET_CARDS',
    payload: {cards},
  } as const;
};

export const addCardAC = (card: CardType) => {
  return {
    type: 'cards/ADD_CARD',
    payload: {card},
  } as const;
};

export const removeCardAC = (cardId: string) => {
  return {
    type: 'cards/REMOVE_CARD',
    payload: { cardId },
  } as const;
};

export const updateCardAC = (updateData: CardType) => {
  return {
    type: 'cards/UPDATE_CARD',
    payload: { updateData },
  } as const;
};

export const setRatingCardAC = (updatedGrade:SetRatingResponseType) => {
  return {
    type: 'cards/SET_RATING_CARD',
    payload: {updatedGrade},
  } as const;
};
// Thunks
export const fetchCardsTC = (domainModel: fetchDomainCardsModelType) => async (
  dispatch: Dispatch<ActionCardsType>) => {
  dispatch(setAppStatusAC('loading'));
  try {
    const res = await cardsAPI.getCards(domainModel);
    dispatch(setCardsAC(res.data));
    dispatch(setAppStatusAC('succeeded'));
  } catch (e) {
    handleServerAppError(e as Error | AxiosError, dispatch)
  }
};

export const addCardTC = (card: NewCardAddType, domainModel: fetchDomainCardsModelType): AppThunkType => async (dispatch) => {
  dispatch(setAppStatusAC('loading'));
  try {
    const res = await cardsAPI.createCard(card)
    dispatch(addPackAC(res.data))
    dispatch(fetchCardsTC(domainModel))
    dispatch(setAppStatusAC('succeeded'))
  } catch (e) {
    handleServerAppError(e as Error | AxiosError, dispatch)
  }
};

export const removeCardTC = (cardId: string, domainModel: fetchDomainCardsModelType):AppThunkType => async(dispatch) => {
  dispatch(setAppStatusAC('loading'));
  try {
    await cardsAPI.deleteCard(cardId)
    dispatch(removeCardAC(cardId))
    dispatch(fetchCardsTC(domainModel))
    dispatch(setAppStatusAC('succeeded'))
  } catch (e) {
    handleServerAppError(e as Error | AxiosError, dispatch)
  }
}

export const updateCardTC = (updateData:UpdateCardPutType):AppThunkType => async (dispatch) => {
  dispatch(setAppStatusAC('loading'));
  try {
    const res = await cardsAPI.updateCard(updateData)
    dispatch(updateCardAC(res.data.updatedCard))
    dispatch(setAppStatusAC('succeeded'))
  } catch (e) {
    handleServerAppError(e as Error | AxiosError, dispatch)
  }
}

export const setCardTC = (updateData:SetRatingCardPutType):AppThunkType => async (dispatch) => {
  dispatch(setAppStatusAC('loading'));
  try {
    const res = await cardsAPI.setRatingCard(updateData)
    dispatch(setRatingCardAC(res.data.updatedGrade))
    dispatch(setAppStatusAC('succeeded'))
  } catch (e) {
    handleServerAppError(e as Error | AxiosError, dispatch)
  }
}

// Types
type SetCardsType = ReturnType<typeof setCardsAC>;
type AddCardType = ReturnType<typeof addCardAC>;
type RemoveCardType = ReturnType<typeof removeCardAC>
type UpdateCardType = ReturnType<typeof updateCardAC>
export type SetRatingCardType = ReturnType<typeof setRatingCardAC>
type CardsStateType = typeof initialState;

export type ActionCardsType = SetCardsType
  | AddCardType
  | SetAppStatusType
  | RemoveCardType
  | UpdateCardType
  | SetRatingCardType;

export type fetchDomainCardsModelType = {
  cardAnswer?: string
  cardQuestion?: string
  cardsPack_id: string
  min?: number
  max?: number
  sortCards?: '0grade' | '1grade'
  page?: number
  pageCount?: number
}