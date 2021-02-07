import { put } from "redux-saga/effects";
import { cloneableGenerator } from "@redux-saga/testing-utils";
import { doFetchIp, update, error as ipError, load } from "./ipSlice";
import { action as createAction } from "./reduxAction";

describe("doFetchIp", () => {
    const gen = cloneableGenerator(doFetchIp)();
    const loadYield = gen.next(); // set loading

    it("sets a loading state when fetching", () => {
        expect(loadYield.value).toEqual(put(createAction(load.type)));
    });

    it("populates the store with the IP", () => {
        const iterator = gen.clone();
        const ip = "foo";
        iterator.next(); // call against /ip

        expect(
            iterator.next({ ip }).value // return IP data and update store
        ).toEqual(put(createAction(update.type, { ip })));
    });

    it("populates the store with an error if an error occurs", () => {
        const iterator = gen.clone();
        iterator.next(); // call against /ip

        const error = "boom!";
        expect(
            iterator.throw(error).value // update store
        ).toEqual(put(createAction(ipError.type, { error })));
    });
});
