import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {appReducer} from "./appReducer";
import {authReducer} from "./authReducer";
import thunkMiddleware from 'redux-thunk';

const rootReducer =combineReducers({
    someState: appReducer,
    auth: authReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// @ts-ignore
window.store = store