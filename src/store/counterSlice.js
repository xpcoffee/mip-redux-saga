import { createSlice } from "@reduxjs/toolkit";
import { put, takeEvery } from "redux-saga/effects";
import { delay } from "../async";

const counterSlice = createSlice({
    name: "counter",
    initialState: 0,
    reducers: {
        increment: (state) => state + 1,
        incrementAsync: (state) => state, // do nothing to state (though you'd likely want to set a loading state here)
        decrement: (state) => state - 1,
    },
});
const { reducer, actions } = counterSlice;
export const { increment, decrement, incrementAsync } = actions;
export default reducer;

/**** Sagas - for side-effectful/asynchronous actions ****/

/**
 * Perform an asynchronous mutation of the counter state
 */
function* incrementAsyncSaga() {
    yield delay(500);
    yield put(increment());
}

/**
 * "Listener" saga which triggers on a redux action and runs the async increment saga.
 * Without this saga the increment would run only once, at initialization of the sagas.
 */
function* watchIncrementAsync() {
    yield takeEvery(incrementAsync().type, incrementAsyncSaga);
}

// Utility function used to create the root saga that encapsulates all the individual sagas defined here.
export const runSagas = () => [watchIncrementAsync].map((saga) => saga());
