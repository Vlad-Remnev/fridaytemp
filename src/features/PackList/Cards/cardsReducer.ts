import { setAppStatusAC } from '../../../app/appReducer';
import { Dispatch } from 'redux';
import { cardsApi } from '../../../app/appApi';
import { handleServerAppError } from '../../../common/utils/error-utils';
import { AxiosError } from 'axios';

const initialState: CardsStateType = {};
//   "cardsId1": {
//     cards: [
//       { _id: "3", cardsPack_id: "5", user_id: '2', answer: "?", question: '!',
//         grade: 4, shots: '3', created: '', updated: '' },
//       { _id: "3", cardsPack_id: "5", user_id: '2', answer: "?", question: '!',
//         grade: 4, shots: '3', created: '', updated: '' },
//       { _id: "3", cardsPack_id: "5", user_id: '2', answer: "?", question: '!',
//         grade: 4, shots: '3', created: '', updated: '' },
//     ],
//     cardsTotalCount: 3,
//     maxGrade: 4.987525071790364,
//     minGrade: 2.0100984354076568,
//     page: 1,
//     pageCount: 4,
//     packUserId: "5eecf82a3ed8f700042f1186"
//   },
//   "cardsId2": {
//     cards: [
//       { _id: "3", cardsPack_id: "5", user_id: '2', answer: "?", question: '!',
//         grade: 4, shots: '3', created: '', updated: '' },
//       { _id: "3", cardsPack_id: "5", user_id: '2', answer: "?", question: '!',
//         grade: 4, shots: '3', created: '', updated: '' },
//       { _id: "3", cardsPack_id: "5", user_id: '2', answer: "?", question: '!',
//         grade: 4, shots: '3', created: '', updated: '' }
//     ],
//     cardsTotalCount: 3,
//     maxGrade: 4.987525071790364,
//     minGrade: 2.0100984354076568,
//     page: 1,
//     pageCount: 4,
//     packUserId: "5eecf82a3ed8f700042f1186"
//   },
// };

// reducer
export const cardsReducer = (
  state: CardsStateType = initialState,
  action: ActionCardsType,
): CardsStateType => {
  switch (action.type) {
    case 'cards/SET_CARDS':
      return {
        ...state,
        [action.payload.cardsPack_id]: {
          ...action.payload.value,
          cards: action.payload.value.cards.map((el) => ({ ...el })),

          // ...state[action.payload.cardsPack_id],
          // cards: action.payload.value.cards.map((el) => ({ ...el })),
        },
      };
    // case 'app/SET_INITIALIZED':
    //   return { ...state, isInitialized: action.payload.isInitialized };
    // case 'app/SET_STATUS':
    //   return { ...state, status: action.payload.status };
    default:
      return state;
  }
};

// actions
export const setCardsAC = (value: CardsType, cardsPack_id: string) =>
  ({
    type: 'cards/SET_CARDS',
    payload: { value, cardsPack_id },
  } as const);

// thunks
export const setCardsTС = (cardsPack_id: string) => async (dispatch: Dispatch<ActionCardsType>) => {
  dispatch(setAppStatusAC('loading'));
  try {
    let response = await cardsApi.getCards(cardsPack_id);
    dispatch(setCardsAC(response.data, cardsPack_id));
    dispatch(setAppStatusAC('succeeded'));
  } catch (e) {
    handleServerAppError(e as Error | AxiosError, dispatch);
  }
};

// types
export type CardType = {
  answer: string;
  question: string;
  cardsPack_id: string;
  grade: number;
  shots: number;
  user_id: string;
  created: string;
  updated: string;
  _id: string;
};
export type CardsStateType = {
  [key: string]: CardsType;
};

export type CardsType = {
  cards: Array<CardType>;
  cardsTotalCount: number;
  maxGrade: number;
  minGrade: number;
  page: number;
  pageCount: number;
  packUserId: string;
};

export type ActionCardsType = ReturnType<typeof setCardsAC> | ReturnType<typeof setAppStatusAC>;
// | ReturnType<typeof updateTaskAC>
// | ReturnType<typeof addTodolistAC>
// | ReturnType<typeof removeTodolistAC>
// | ReturnType<typeof setTodolistAC>
// | ReturnType<typeof setTasksAC>
// | ReturnType<typeof setAppErrorAC>
// | ReturnType<typeof setAppStatusAC>
// | ReturnType<typeof changeTaskEntityStatusAC>;
