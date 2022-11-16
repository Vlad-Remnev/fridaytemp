import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import { ActionAppType, appReducer } from './appReducer';
import { ActionAuthType, authReducer } from './authReducer';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';

const rootReducer = combineReducers({
  someState: appReducer,
  auth: authReducer,
  app: appReducer,
});
export type ActionsType = ActionAuthType | ActionAppType;
export type AppThunkType = ThunkDispatch<AppRootStateType, void, ActionsType>;
export type AppRootStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store = store;
