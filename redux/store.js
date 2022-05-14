import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer'
import networkReducer from './reducers/networkReducer'
import { persistStore,persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage"

const persistConfig = {
    key:"root",
    storage,
}

const reducers = combineReducers({
    user:userReducer,
    selectedNetwork:networkReducer,
})

const persistedReducer = persistReducer(persistConfig,reducers)

export default () => {
    let store = createStore(persistedReducer,compose(applyMiddleware(thunk)));
    let persistor = persistStore(store)
    return {store,persistor}
}