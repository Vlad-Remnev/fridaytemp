import {
  InitStateType,
  packListAPI,
  PackType,
  SortPacksType,
} from "../../app/appApi";
import { Dispatch } from "redux";
import { setAppStatusAC, SetAppStatusType } from "../../app/appReducer";
import { AppRootStateType } from "../../app/store";

const initialState: InitStateType = {
  cardPacks: [] as PackType[],
  page: 1,
  pageCount: 4,
  cardPacksTotalCount: 0,
  minCardsCount: 0,
  maxCardsCount: 110,
  user_id: "",
  token: "",
};

export const packsListReducer = (
  state: InitStateType = initialState,
  action: ActionPacksListType
) => {
  switch (action.type) {
    case "packList/SET_PACKS":
      return {
        ...state,
        ...action.payload.cardsPack,
        cardPacks: action.payload.cardsPack.cardPacks.map((el) => ({ ...el })),
      };
    default:
      return state;
  }
};

// Actions
export const setPacksAC = (cardsPack: InitStateType) => {
  return {
    type: "packList/SET_PACKS",
    payload: { cardsPack },
  } as const;
};

// Thunks
export const fetchPacksTC =
  (domainModel: fetchDomainPacksModelType = {}) =>
  async (
    dispatch: Dispatch<ActionPacksListType>,
    getState: () => AppRootStateType
  ) => {
    dispatch(setAppStatusAC("loading"));
    try {
      const res = await packListAPI.getPack(domainModel);

      dispatch(setPacksAC(res.data));
      dispatch(setAppStatusAC("succeeded"));
    } catch (e) {
      dispatch(setAppStatusAC("failed"));
    }
  };

// Types
export type SetPacksType = ReturnType<typeof setPacksAC>;

export type ActionPacksListType = SetPacksType | SetAppStatusType;

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
