import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementAsync } from "../store/counterSlice";

/**
 * Offers our guest the ability to increment and decrement a counter.
 */
export const Counter = () => {
    const dispatch = useDispatch();
    const count = useSelector((state) => state.counter);

    return (
        <div>
            <h2>Counter</h2>
            <span>
                <button onClick={() => dispatch(increment())}>Increment</button>
                <button onClick={() => dispatch(incrementAsync())}>Increment Async</button>
                <button onClick={() => dispatch(decrement())}>Decrement</button>
            </span>
            <div>{count}</div>
        </div>
    );
};
