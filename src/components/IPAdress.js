import { useSelector, useDispatch } from "react-redux";
import { load, reset } from "../store/ipSlice";

/**
 * Displays our guest's current IP address.
 */
export function IPAddress() {
    const dispatch = useDispatch();
    const { ip, error, loading } = useSelector((state) => state.ip);

    const ipDisplay = (function () {
        if (loading) {
            return "Loading...";
        } else if (error !== undefined) {
            return error;
        } else {
            return ip;
        }
    })();

    return (
        <div>
            <h2>IP Address</h2>
            <button onClick={() => dispatch(load())}>Fetch my IP</button>
            <button onClick={() => dispatch(reset())}>Reset</button>
            <div>
                <label>
                    IP address: <span>{ipDisplay}</span>
                </label>
            </div>
        </div>
    );
}
