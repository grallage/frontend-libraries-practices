import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { useSelector, useDispatch } from "@/libs/redux/hooks";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from "@/libs/redux/slices/counter/counterSlice";
import styles from "./Counter.module.css";

export interface CounterProps {}

const Counter: React.FC<CounterProps> = (props) => {
  const {} = props;
  // The `state` arg is correctly typed as `RootState` already
  // const count = useSelector((state) => state.counter.value);
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  // const count = useSelector((state) => state.counter.value);
  // const dispatch = useDispatch();

  const [incrementAmount, setIncrementAmount] = useState("2");

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() =>
            dispatch(incrementByAmount(Number(incrementAmount) || 0))
          }
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
        >
          Add Async
        </button>
      </div>
    </div>
  );
};

export default Counter;
