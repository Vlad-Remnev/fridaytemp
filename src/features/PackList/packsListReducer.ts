import {
    cardsPackType,
    InitStateType,
    packListAPI,
    PackType,
    SortPacksType,
    UpdateCardsPackType,
} from '../../app/appApi';
import {setAppStatusAC, SetAppStatusType} from '../../app/appReducer';
import {AppThunkType} from '../../app/store';
import {handleServerAppError} from '../../common/utils/error-utils';
import {AxiosError} from 'axios';

const initialState = {
    cardPacks: [] as PackType[],
    page: 1,
    pageCount: 5,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 110,
    user_id: '',
    token: '',
    entityStatus: "",
    isUserPacks: false
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
                page: action.payload.cardsPack.page,
                cardPacks: action.payload.cardsPack.cardPacks.map((el) => ({...el})),
            };
        case 'packList/ADD_PACK':
            return {...state, cardPacks: [action.payload.pack, ...state.cardPacks]};
        case 'packList/REMOVE_PACK':
            return {...state, cardPacks: state.cardPacks.filter(p => p._id !== action.payload.packId)}
        case 'packList/UPDATE_PACK':
            return {
                ...state, cardPacks: state.cardPacks.map(p =>
                    p._id === action.payload.updateData._id
                        ? {...p, name: action.payload.updateData.name}
                        : p)
            }
        case "packList/IS_USER_PACKS":
            return {
                ...state, isUserPacks: action.payload.isUserPacks
            }
        case "packList/ENTITY_STATUS_CHANGE":
            return {
                ...state, entityStatus: action.payload.entityStatus
            }
        default:
            return state;
    }
};

// Actions
export const setPacksAC = (cardsPack: InitStateType) => {
    return {
        type: 'packList/SET_PACKS',
        payload: {cardsPack},
    } as const;
};
export const addPackAC = (pack: PackType) => {
    return {
        type: 'packList/ADD_PACK',
        payload: {pack},
    } as const;
};
export const removePackAC = (packId: string) => {
    return {
        type: 'packList/REMOVE_PACK',
        payload: {packId},
    } as const;
};
export const updatePackAC = (updateData: PackType) => {
    return {
        type: 'packList/UPDATE_PACK',
        payload: {updateData},
    } as const;
};
export const isUserPacksAC = (isUserPacks: boolean) => {
    return {
        type: 'packList/IS_USER_PACKS',
        payload: {isUserPacks}
    } as const;
};
export const entityStatusAC = (entityStatus: string) => {
    return {
        type: 'packList/ENTITY_STATUS_CHANGE',
        payload: {entityStatus}
    } as const;
};


// Thunks
export const fetchPacksTC = (domainModel: fetchDomainPacksModelType = {}): AppThunkType => async (dispatch, getState) => {
    const userId = getState().profile.userData._id
    const isUserPacks = getState().packsList.isUserPacks
    dispatch(setAppStatusAC('loading'));
    try {
        let res
        if (isUserPacks) {
            res = await packListAPI.getPack({...domainModel, user_id: userId});
        } else {
            res = await packListAPI.getPack(domainModel);
        }
        if (res.data.cardPacks.length < 1) dispatch(entityStatusAC("Search field is incorrect, packs not found"))
        else dispatch(entityStatusAC(""))
        dispatch(setPacksAC(res.data));
        dispatch(setAppStatusAC('succeeded'));
    } catch (e) {
        handleServerAppError(e as Error | AxiosError, dispatch)
    }
};
export const addPackTC = (cardsPack: cardsPackType, page: number): AppThunkType => async (dispatch, getState) => {
    const userId = getState().profile.userData._id
    const isUserPacks = getState().packsList.isUserPacks
    const pageCount = getState().packsList.pageCount
    dispatch(setAppStatusAC('loading'));
    try {
        const res = await packListAPI.createPack(cardsPack)
        dispatch(addPackAC(res.data.newCardsPack))
        if (isUserPacks) {
            dispatch(fetchPacksTC({user_id: userId, pageCount}))
        } else {
            dispatch(fetchPacksTC({pageCount}))
        }
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        handleServerAppError(e as Error | AxiosError, dispatch)
    }
};
export const removePackTC = (packId: string): AppThunkType => async (dispatch, getState) => {
    const userId = getState().profile.userData._id
    const isUserPacks = getState().packsList.isUserPacks
    const page = getState().packsList.page
    const pageCount = getState().packsList.pageCount
    dispatch(setAppStatusAC('loading'));
    try {
        await packListAPI.deletePack(packId)
        dispatch(removePackAC(packId))
        if (isUserPacks) {
            dispatch(fetchPacksTC({user_id: userId, page, pageCount}))
        } else {
            dispatch(fetchPacksTC({page, pageCount}))
        }
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        handleServerAppError(e as Error | AxiosError, dispatch)
    }
}
export const updatePackTC = (updateData: UpdateCardsPackType): AppThunkType => async (dispatch, getState) => {
    const userId = getState().profile.userData._id
    const isUserPacks = getState().packsList.isUserPacks
    const page = getState().packsList.page
    const pageCount = getState().packsList.pageCount
    dispatch(setAppStatusAC('loading'));
    try {
        const res = await packListAPI.updatePack(updateData)
        dispatch(updatePackAC(res.data.updatedCardsPack))
        if (isUserPacks) {
            dispatch(fetchPacksTC({user_id: userId, page, pageCount}))
        } else {
            dispatch(fetchPacksTC({page, pageCount}))
        }
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
type IsUserPackType = ReturnType<typeof isUserPacksAC>
type EntityStatusType = ReturnType<typeof entityStatusAC>
type PackStateType = typeof initialState;

export type ActionPacksListType = SetPacksType
    | AddPackType
    | SetAppStatusType
    | RemovePackType
    | UpdatePackType
    | IsUserPackType
    | EntityStatusType

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
