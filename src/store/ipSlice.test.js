import { put } from "redux-saga/effects";
import { cloneableGenerator } from "@redux-saga/testing-utils";
import { doFetchIp, update, error as ipError, load } from "./ipSlice";

describe("doFetchIp", () => {
    const gen = cloneableGenerator(doFetchIp)();

    it("populates the store with the IP", () => {
        const iterator = gen.clone();
        const ip = "foo";
        iterator.next(); // call against /ip

        expect(
            iterator.next({ ip }).value // return IP data and update store
        ).toEqual(put(update({ ip })));
    });

    it("populates the store with an error if an error occurs", () => {
        const iterator = gen.clone();
        iterator.next(); // call against /ip

        const error = "boom!";
        expect(
            iterator.throw(error).value // update store
        ).toEqual(put(ipError({ error })));
    });
});
