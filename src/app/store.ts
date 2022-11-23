import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import { ActionAppType, appReducer } from './appReducer';
import { ActionAuthType, authReducer } from './authReducer';
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ActionProfileType, profileReducer } from '../features/Profile/profileReducer';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { ActionPacksListType, packsListReducer } from '../features/PackList/packsListReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  profile: profileReducer,
  packsList: packsListReducer,
});
export type ActionsType = ActionAuthType | ActionAppType | ActionProfileType | ActionPacksListType;

export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, ActionsType>;
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType,AppRootStateType,unknown,
  ActionsType
  >;

export type AppRootStateType = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector; // спросить ещё у кого
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store = store; // for dev
