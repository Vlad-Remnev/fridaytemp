import {
  cardsPackType,
  InitStateType,
  packListAPI,
  PackType,
  SortPacksType, UpdateCardsPackType,
} from '../../app/appApi';
import { Dispatch } from 'redux';
import { setAppStatusAC, SetAppStatusType } from '../../app/appReducer';
import { AppThunkType } from '../../app/store';
import { handleServerAppError } from '../../common/utils/error-utils';
import { AxiosError } from 'axios';

const initialState = {
  cardPacks: [] as PackType[],
  page: 1,
  pageCount: 4,
  cardPacksTotalCount: 0,
  minCardsCount: 0,
  maxCardsCount: 110,
  user_id: '',
  token: '',
};

export const packsListReducer = (
  state: PackStateType = initialState,
  action: ActionPacksListType,
): PackStateType => {
  switch (action.type) {
    case 'packList/SET_PACKS':
      return {
        ...state,
        ...action.payload.cardsPack,
        cardPacks: action.payload.cardsPack.cardPacks.map((el) => ({ ...el })),
      };
    case 'packList/ADD_PACK':
      return { ...state, cardPacks: [action.payload.pack, ...state.cardPacks] };
    case 'packList/REMOVE_PACK':
      return {...state, cardPacks: state.cardPacks.filter(p => p._id !== action.payload.packId)}
    case 'packList/UPDATE_PACK':
      return {...state, cardPacks: state.cardPacks.map(p =>
          p._id === action.payload.updateData._id
            ? {...p, name: action.payload.updateData.name}
            : p )}
    default:
      return state;
  }
};

// Actions
export const setPacksAC = (cardsPack: InitStateType) => {
  return {
    type: 'packList/SET_PACKS',
    payload: { cardsPack },
  } as const;
};
export const addPackAC = (pack: PackType) => {
  return {
    type: 'packList/ADD_PACK',
    payload: { pack },
  } as const;
};
export const removePackAC = (packId: string) => {
  return {
    type: 'packList/REMOVE_PACK',
    payload: { packId },
  } as const;
};
export const updatePackAC = (updateData: PackType) => {
  return {
    type: 'packList/UPDATE_PACK',
    payload: { updateData },
  } as const;
};




// Thunks
export const fetchPacksTC = (domainModel: fetchDomainPacksModelType = {}) => async (
  dispatch: Dispatch<ActionPacksListType>) => {
  dispatch(setAppStatusAC('loading'));
  try {
    const res = await packListAPI.getPack(domainModel);

    dispatch(setPacksAC(res.data));
    dispatch(setAppStatusAC('succeeded'));
  } catch (e) {
    handleServerAppError(e as Error | AxiosError, dispatch)
  }
};
export const addPackTC = (cardsPack: cardsPackType):AppThunkType => async (dispatch) => {
  dispatch(setAppStatusAC('loading'));
  try {
    const res = await packListAPI.createPack(cardsPack)
    dispatch(addPackAC(res.data.newCardsPack))
    dispatch(fetchPacksTC())
    dispatch(setAppStatusAC('succeeded'))
  } catch (e) {
    handleServerAppError(e as Error | AxiosError, dispatch)
  }
};
export const removePackTC = (packId: string):AppThunkType => async(dispatch) => {
  dispatch(setAppStatusAC('loading'));
  try {
    await packListAPI.deletePack(packId)
    dispatch(removePackAC(packId))
    dispatch(fetchPacksTC())
    dispatch(setAppStatusAC('succeeded'))
  } catch (e) {
    handleServerAppError(e as Error | AxiosError, dispatch)
  }
}
export const updatePackTC = (updateData:UpdateCardsPackType):AppThunkType => async (dispatch) => {
  dispatch(setAppStatusAC('loading'));
  try {
    const res = await packListAPI.updatePack(updateData)
    dispatch(updatePackAC(res.data.updatedCardsPack))
    dispatch(setAppStatusAC('succeeded'))
  } catch (e) {
    handleServerAppError(e as Error | AxiosError, dispatch)
  }
}

// Types
type SetPacksType = ReturnType<typeof setPacksAC>;
type AddPackType = ReturnType<typeof addPackAC>;
type RemovePackType = ReturnType<typeof removePackAC>
type UpdatePackType = ReturnType<typeof updatePackAC>
type PackStateType = typeof initialState;

export type ActionPacksListType = SetPacksType
  | AddPackType
  | SetAppStatusType
  | RemovePackType
  | UpdatePackType;

export type fetchDomainPacksModelType = {
  packName?: string;
  min?: number;
  max?: number;
  sortPacks?: SortPacksType;
  page?: number;
  pageCount?: number;
  user_id?: string;
  block?: boolean;
};