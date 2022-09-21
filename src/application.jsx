import SetToValue from './components/set-to-value';
import IncrementBy from './components/increment-by';
import { useReducer, useState } from 'react';

const action = {
  type: 'SOMETHING_HAPPENED',
};

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const RESET = 'RESET';
const SET_INCREMENT = 'SET_INCREMENT';

const defaultState = {
  count: 0,
  incrementAmount: 1,
};

const reducer = (state = defaultState, action) => {
  const { count, incrementAmount } = state;

  if (action.type === INCREMENT) {
    return { ...state, count: count + incrementAmount };
  }

  if (action.type === DECREMENT) {
    return { ...state, count: count - incrementAmount };
  }

  if (action.type === RESET) {
    return defaultState;
  }

  if (action.type === SET_INCREMENT) {
    return { ...state, incrementAmount: Number(action.payload) };
  }

  return state;
};

const inc = () => ({ type: 'INCREMENT' });
const dec = () => ({ type: 'DECREMENT' });
const res = () => ({ type: 'RESET' });
const setIncrement = (event) => ({
  type: SET_INCREMENT,
  payload: event.target.value,
});

const bindDispatch = (dispatch, ...actions) =>
  actions.map((action) => dispatch(action()));

export const Application = () => {
  const [{ count, incrementAmount }, dispatch] = useReducer(
    reducer,
    defaultState,
  );

  const [increment, decrement, reset] = bindDispatch(dispatch, inc, dec, res);

  return (
    <main className="m-auto mx-8 my-8 border-8 border-pink-300 p-4 flex flex-col gap-4">
      <section className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-center">Current Count</h2>
        <p className="text-6xl text-center">{count}</p>
      </section>
      <section className="flex flex-col md:flex-row justify-center gap-2">
        <button className="w-full" onClick={decrement}>
          Decrement
        </button>
        <button className="w-full" onClick={reset}>
          Reset
        </button>
        <button className="w-full" onClick={increment}>
          Increment
        </button>
      </section>
      <IncrementBy amount={incrementAmount} onChange={setIncrement} />
      <SetToValue count={count} />
    </main>
  );
};

export default Application;
