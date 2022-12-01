import axios, { AxiosResponse } from "axios";
import { ModelUpdateType } from "./authReducer";
import {fetchDomainCardsModelType} from "../features/PackList/Cards/cardsPeducer";

export const instance = axios.create({
  // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
  // baseURL:
  //   process.env.NODE_ENV === 'development'
  //     ? 'http://localhost:7542/2.0/'
  //     : 'https://neko-back.herokuapp.com/2.0/',
  baseURL: "https://neko-back.herokuapp.com/2.0/",
  withCredentials: true,
});

// api
export const packListAPI = {
  getPack(params: getPacksModelType) {
    return instance.get(`/cards/pack`, { params });
  },

  createPack(cardsPack: cardsPackType) {
    return instance.post<{newCardsPack: PackType}>(`/cards/pack`, {cardsPack} );
  },

  deletePack(packId: string) {
    return instance.delete(`/cards/pack/?id=${packId}`)
  },

  updatePack(data: UpdateCardsPackType) {
    return instance.put<{updatedCardsPack: PackType}>(`/cards/pack`, {cardsPack: data})
  }
};

export const cardsAPI = {
  getCards(params: fetchDomainCardsModelType) {
    return instance.get(`cards/card`, { params });
  },

  createCard(card: NewCardAddType) {
    return instance.post(`cards/card`,  card );
  },

  deleteCard(cardId: string) {
    return instance.delete(`cards/card/?id=${cardId}`)
  },

  updateCard(data: UpdateCardPutType) {
    return instance.put(`/cards/card`, {card: data})
  },

  setRatingCard(data: SetRatingCardPutType) {
    return instance.put(`/cards/grade`, data)
  },
};

export const authAPI = {
  register(data: LoginRegisterDataType) {
    return instance.post<LoginRegisterDataType, AxiosResponse<ResponseType>>(
      "/auth/register",
      data
    );
  },
  login(data: LoginRegisterDataType) {
    return instance.post<LoginRegisterDataType, AxiosResponse<ResponseType>>(
      `/auth/login`,
      data
    );
  },
  forgot(data: ForgotDataType) {
    return instance.post<ResponseForgotType>(`/auth/forgot`, data);
  },
  setNewPassword(data: NewPasswordData) {
    return instance.post<ResponseForgotType>("/auth/set-new-password", data);
  },
  me() {
    return instance.post<ResponseType>("/auth/me", {});
  },
  logout() {
    return instance.delete<AxiosResponse<{ error: string }>>(`/auth/me`, {});
  },
  updateData(data: ModelUpdateType) {
    return instance.put<
      ModelUpdateType,
      AxiosResponse<UpdateChangedUserDataType>
    >("/auth/me", data);
  },
};

// types
export type PackType = {
  _id: string;
  user_id: string;
  user_name: string;
  private: boolean;
  name: string;
  path: string;
  grade: number;
  shots: number;
  cardsCount: number;
  type: string;
  rating: number;
  created: string;
  updated: string;
  more_id: string;
  __v: number;
};
export type CardType = {
  _id: string,
  cardsPack_id: string
  user_id: string
  answer: string
  question: string
  grade: number
  shots: number
  questionImg?: string
  answerImg?: string
  answerVideo?: string
  questionVideo?: string
  comments?: string
  type?: string
  rating?: number
  more_id?: string
  created?: string
  updated?: string
  __v?: number
}
export type SetRatingResponseType = {
  card_id: string
  cardsPack_id: string
  created: string
  grade: number
  more_id: string
  shots: number
  updated: string
  user_id: string
  __v: number
  _id: string

}
export type UpdateCardsPackType = {
  _id: string;
} & Partial<Omit<PackType, '_id'>>

export type UpdateCardPutType = {
  _id: string
} & Partial<Omit<CardType, '_id'>>

export type SetRatingCardPutType = {
  card_id: string
  grade: number | null
}

export type ResponsePacksType = {
  cardPacks: PackType[];
  page: number;
  pageCount: number;
  cardPacksTotalCount: number;
  minCardsCount: number;
  maxCardsCount: number;
  token: string;
  tokenDeathTime: number;
};
export type getPacksModelType = {
  packName?: string;
  min?: number;
  max?: number;
  sortPacks?: SortPacksType;
  page?: number;
  pageCount?: number;
  user_id?: string;
  block?: boolean;
};

export type InitStateType = {
  cardPacks: PackType[];
  page: number;
  pageCount: number;
  cardPacksTotalCount: number;
  minCardsCount: number;
  maxCardsCount: number;
  user_id: string;
  token: string;
};

export type SortPacksType = "0updated" | "1updated";

export type cardsPackType = {
    name?: string;
    deckCover?: string;
    private?: boolean;
};

export type NewCardAddType = {
  card: {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
  }
}

export type UserDataType = {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number;
  token?: string;
};

export type LoginRegisterDataType = {
  email: string;
  password: string;
  rememberMe?: boolean;
  confirmPassword?: string;
};

export type ResponseType = {
  _id: string;
  email: string;
  name: string;
  publicCardPacksCount: number;
  verified?: boolean;
  rememberMe?: boolean;
  isAdmin?: boolean;
  created?: Date;
  updated?: Date;
  avatar?: string;
  __v?: number;
  token?: string;
  tokenDeathTime?: number;
  error?: string;
};

export type UpdateChangedUserDataType = {
  updatedUser: UserDataType;
  error?: string;
};

export type ForgotDataType = {
  email: string;
  from: string;
  message: string;
};

export type ResponseForgotType = {
  info: string;
  error: string;
};

export type NewPasswordData = {
  password: string;
  resetPasswordToken: string;
};
