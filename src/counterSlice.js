import { createSlice } from "@reduxjs/toolkit";
import { put, takeEvery } from "redux-saga/effects";
import { action } from "./reduxAction";
import { delay } from "./async";

const counterSlice = createSlice({
    name: "counter",
    initialState: 0,
    reducers: {
        increment: (state) => state + 1,
        decrement: (state) => state - 1,
    },
});
const { reducer, actions } = counterSlice;
export const { increment, decrement } = actions;
export default reducer;

/**** Sagas - for side-effectful/asynchronous actions ****/

/**
 * Perform an asynchronous mutation of the counter state
 */
function* incrementAsyncSaga() {
    yield delay(500);
    // We can run the synchronous increment at this point.
    // Note: we need to convert redux toolkit's augmented action into a pure action; the augmented action can't be serialized by the saga middleware.
    yield put(action(increment.type));
}

/**
 * "Listener" saga which triggers on a redux action and runs the async increment saga.
 * Without this saga the increment would run only once, at initialization of the sagas.
 */
function* watchIncrementAsync() {
    yield takeEvery(incrementAsync().type, incrementAsyncSaga);
}
export const incrementAsync = () => action("INCREMENT_ASYNC"); // We need to manually define an action; sagas are independent of the redux slices we set up with redux toolkit

// Utility function used to create the root saga that encapsulates all the individual sagas defined here.
export const runSagas = () => [watchIncrementAsync].map((saga) => saga());
