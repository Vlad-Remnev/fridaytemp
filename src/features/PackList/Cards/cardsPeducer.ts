import {AxiosError} from 'axios';
import {cardsAPI, CardType} from "../../../app/appApi";
import {setAppStatusAC, SetAppStatusType} from "../../../app/appReducer";
import {handleServerAppError} from "../../../common/utils/error-utils";
import {Dispatch} from "redux";

const initialState = {
  cards: [] as CardType[],
  packUserId: "607e82d176b4881da8c02a16",
  packName: "React",
  packPrivate: false,
  packDeckCover: "",
  packCreated: "2021-04-21T13:14:24.464Z",
  packUpdated: "2021-07-10T15:35:42.016Z",
  page: 1,
  pageCount: 4,
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
        cards: action.payload.cards.cards.map((el) => ({ ...el })),
      };
    // case 'packList/ADD_PACK':
    //   return { ...state, cardPacks: [action.payload.pack, ...state.cardPacks] };
    // case 'packList/REMOVE_PACK':
    //   return {...state, cardPacks: state.cardPacks.filter(p => p._id !== action.payload.packId)}
    // case 'packList/UPDATE_PACK':
    //   return {...state, cardPacks: state.cardPacks.map(p =>
    //       p._id === action.payload.updateData._id
    //         ? {...p, name: action.payload.updateData.name}
    //         : p )}
    default:
      return state;
  }
};

// Actions
export const setCardsAC = (cards: CardsStateType) => {
  return {
    type: 'cards/SET_CARDS',
    payload: { cards },
  } as const;
};

// export const addPackAC = (pack: PackType) => {
//   return {
//     type: 'packList/ADD_PACK',
//     payload: { pack },
//   } as const;
// };
// export const removePackAC = (packId: string) => {
//   return {
//     type: 'packList/REMOVE_PACK',
//     payload: { packId },
//   } as const;
// };
// export const updatePackAC = (updateData: PackType) => {
//   return {
//     type: 'packList/UPDATE_PACK',
//     payload: { updateData },
//   } as const;
// };

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
// export const addPackTC = (cardsPack: cardsPackType):AppThunkType => async (dispatch) => {
//   dispatch(setAppStatusAC('loading'));
//   try {
//     const res = await packListAPI.createPack(cardsPack)
//     dispatch(addPackAC(res.data.newCardsPack))
//     dispatch(fetchPacksTC())
//     dispatch(setAppStatusAC('succeeded'))
//   } catch (e) {
//     handleServerAppError(e as Error | AxiosError, dispatch)
//   }
// };
// export const removePackTC = (packId: string):AppThunkType => async(dispatch) => {
//   dispatch(setAppStatusAC('loading'));
//   try {
//     await packListAPI.deletePack(packId)
//     dispatch(removePackAC(packId))
//     dispatch(fetchPacksTC())
//     dispatch(setAppStatusAC('succeeded'))
//   } catch (e) {
//     handleServerAppError(e as Error | AxiosError, dispatch)
//   }
// }
// export const updatePackTC = (updateData:UpdateCardsPackType):AppThunkType => async (dispatch) => {
//   dispatch(setAppStatusAC('loading'));
//   try {
//     const res = await packListAPI.updatePack(updateData)
//     dispatch(updatePackAC(res.data.updatedCardsPack))
//     dispatch(setAppStatusAC('succeeded'))
//   } catch (e) {
//     handleServerAppError(e as Error | AxiosError, dispatch)
//   }
// }

// Types
type SetCardsType = ReturnType<typeof setCardsAC>;
// type AddPackType = ReturnType<typeof addPackAC>;
// type RemovePackType = ReturnType<typeof removePackAC>
// type UpdatePackType = ReturnType<typeof updatePackAC>
type CardsStateType = typeof initialState;

export type ActionCardsType = SetCardsType
  // | AddPackType
  | SetAppStatusType
// | RemovePackType
// | UpdatePackType;

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