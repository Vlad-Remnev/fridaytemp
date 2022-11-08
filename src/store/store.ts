import {combineReducers, legacy_createStore as createStore} from "redux";
import {someReducer} from "../reducers/someReducer";

const rootReducer =combineReducers({
    someState: someReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store