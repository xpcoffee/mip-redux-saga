import { createSlice } from "@reduxjs/toolkit";
import { put, takeEvery } from "redux-saga/effects";
import { action as createAction } from "./reduxAction";

const INITIAL_IP_STATE = { ip: "-", loading: false, error: undefined };
const ipSlice = createSlice({
    name: "ip",
    initialState: INITIAL_IP_STATE,
    reducers: {
        load: (state) => {
            state.loading = true;
            return state;
        },
        update: (state, action) => {
            state.ip = action.payload.ip;
            state.loading = false;
            state.error = undefined;
            return state;
        },
        error: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
            return state;
        },
        reset: () => INITIAL_IP_STATE,
    },
});
const { reducer, actions } = ipSlice;
export const { load, update, error, reset } = actions;
export default reducer;

/**** Sagas - for side-effectful/asynchronous actions ****/

function* doFetchIp() {
    yield put(createAction(load.type));
    const apiData = yield fetch("/ip").then((res) => res.json());
    yield put(createAction(update.type, { ip: apiData.ip }));
}

function* watchFetchIp() {
    yield takeEvery(fetchIp().type, doFetchIp);
}
export const fetchIp = () => createAction("FETCH_IP");

// Utility function used to create the root saga that encapsulates all the individual sagas defined here.
export const runSagas = () => [watchFetchIp].map((saga) => saga());
