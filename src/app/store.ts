import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import { ActionAppType, appReducer } from './appReducer';
import { ActionAuthType, authReducer } from './authReducer';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';
import { ActionProfileType, profileReducer } from '../features/Profile/profileReducer';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  profile: profileReducer,
});
export type ActionsType = ActionAuthType | ActionAppType | ActionProfileType;
export type AppThunkType = ThunkDispatch<AppRootStateType, unknown, ActionsType>;
export type AppRootStateType = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector; // спросить ещё у кого
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store = store; // for dev
