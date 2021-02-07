import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import counterReducer, { runSagas as counterSagas } from "./counterSlice";
import ipReducer, { runSagas as ipSagas } from "./ipSlice";

const rootReducer = combineReducers({
    counter: counterReducer,
    ip: ipReducer,
});

const sagas = createSagaMiddleware();
function* rootSaga() {
    yield all([...counterSagas(), ...ipSagas()]);
}

export default configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagas),
});
sagas.run(rootSaga);
