import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import counterReducer, { runSagas as counterSagas } from "./counterSlice";

const rootReducer = combineReducers({
    counter: counterReducer,
});

const sagas = createSagaMiddleware();
function* rootSaga() {
    yield all([...counterSagas()]);
}

export default configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagas),
});
sagas.run(rootSaga);
