import { createSlice } from "@reduxjs/toolkit";
import { put, takeEvery } from "redux-saga/effects";
import { action as createAction } from "./reduxAction";
import { delay } from "../async";

const INITIAL_IP_STATE = { ip: "127.0.0.1", loading: false, error: undefined };
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
    yield delay(500);
    const mockData = { ip: "hello" };
    yield put(createAction(update.type, mockData));
}

function* watchFetchIp() {
    yield takeEvery(fetchIp().type, doFetchIp);
}
export const fetchIp = () => createAction("FETCH_IP");

// Utility function used to create the root saga that encapsulates all the individual sagas defined here.
export const runSagas = () => [watchFetchIp].map((saga) => saga());
