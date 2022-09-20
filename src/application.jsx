import { useReducer, useState } from 'react';

import SetToValue from './components/set-to-value';
import IncrementBy from './components/increment-by';

const defaultState = {
  count: 0,
  incrementAmount: 1,
};

const reducer = (state = defaultState, action) => {
  if (action.type === 'INCREMENT') {
    return { ...state, count: state.count + state.incrementAmount };
  }

  if (action.type === 'DECREMENT') {
    return { ...state, count: state.count - state.incrementAmount };
  }

  if (action.type === 'RESET') {
    return { ...state, count: 0 };
  }

  if (action.type === 'SET_INCREMENT_AMOUNT') {
    return { ...state, incrementAmount: Number(action.payload) };
  }

  if (action.type === 'SET_COUNT') {
    return { ...state, count: Number(action.payload) };
  }

  return state;
};

export const Application = () => {
  const [{ count, incrementAmount }, dispatch] = useReducer(
    reducer,
    defaultState,
  );

  return (
    <main className="m-auto mx-8 my-8 border-8 border-pink-300 p-4 flex flex-col gap-4">
      <section className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-center">Current Count</h2>
        <p className="text-6xl text-center">{count}</p>
      </section>
      <section className="flex flex-col md:flex-row justify-center gap-2">
        <button
          className="w-full"
          onClick={() => dispatch({ type: 'DECREMENT' })}
        >
          Decrement
        </button>
        <button className="w-full" onClick={() => dispatch({ type: 'RESET' })}>
          Reset
        </button>
        <button
          className="w-full"
          onClick={() => dispatch({ type: 'INCREMENT' })}
        >
          Increment
        </button>
      </section>
      <IncrementBy amount={incrementAmount} dispatch={dispatch} />
      <SetToValue dispatch={dispatch} />
    </main>
  );
};

export default Application;
