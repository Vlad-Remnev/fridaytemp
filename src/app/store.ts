import {combineReducers, legacy_createStore as createStore} from "redux";
import {appReducer} from "./appReducer";

const rootReducer =combineReducers({
    someState: appReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store