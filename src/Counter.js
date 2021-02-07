import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {increment, decrement} from "./counterSlice";

export const Counter = () => {
    const dispatch = useDispatch();
    const count = useSelector(state => state.counter);

    return (
        <div>
            <span>
                <button onClick={() => dispatch(increment())}>Increment</button>
                <button onClick={() => dispatch(decrement())}>Decrement</button>
            </span>
            <h1>{count}</h1>
        </div>
    )
}
