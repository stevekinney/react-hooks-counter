# Simple Counter

We're going to use this repository to get our sea legs when it comes to using hooks in React.

## The basics

Right now, this application doesn't really do anything. There is a hard-coded `count` and everything else is static.

Let's look at `application.jsx` and get it wired up with some basic state management.

Some quick notes:

- `IncrementBy` and `SetToValue` are broken out right now because I don't want to look at them right now. We'll look at them later.
- None of the buttons are wired up to do anything. There isn't even any state management in place.

### Implementing some basic state with `useState`

The first step is to swap out that hard-coded `count` with some state.

```jsx
const [count, setCount] = useState(0);
```

The reason that we return an array here is because we want to be able to have control over what we name these two things: the current value of the state and a function that lets us update it. We're going to call them `count` and `setCount`, respectively.

Now, theoretically, we've updated the component to use `count` as a value we're storing in state, but with no real way to update it, it doesn't _really_ matter.

We can update them as follows:

```jsx
<button className="w-full" onClick={() => setCount(count - 1)}>
  Decrement
</button>
<button className="w-full" onClick={() => setCount(0)}>
  Reset
</button>
<button className="w-full" onClick={() => setCount(count + 1)}>
  Increment
</button>
```

That works about as well as we might expect. We've haven't exactly blazed any new trails here, but at the very least, we got our sea legs.

### Using the previous state

If you use `setCount` and provide it a value, it will update the state to that value. There aren't really any big surprises here. But, since all of this has to happen inside of the component. It could be somewhat difficult to test.

You know what's really easy to test? Regular ol' JavaScript functiuons.

What if we had something like this:

```js
const decrement = (n) => n - 1;
const increment = (n) => n + 1;
```

You could easily test these somewhere.

Your first instinct, might be to do something like this:

```jsx
<button className="w-full" onClick={() => setCount(decrement(count))}>
  Decrement
</button>
```

And, that'll work. But, it's even simpler than that. The updater function that comes out of `useState` can actually take a function and will pass in the previous state to that function.

This means that all of the following are the same:

```jsx
setCount(count + 1);
setCount((n) => n + 1);
setCount(increment);
```

We can update our component as follows:

```jsx
<button className="w-full" onClick={() => setCount(decrement)}>
  Decrement
</button>
<button className="w-full" onClick={() => setCount(0)}>
  Reset
</button>
<button className="w-full" onClick={() => setCount(increment)}>
  Increment
</button>
```

If you wanted to be real fancy, I guess you could create `reset` function, but that seems like a bit much—even for this contrived example.

## Using reducers

`useState` is really just an abstraction around `useReducer`. If you've used Redux before, then a lot of this will sound pretty familiar. You have roughly three concepts that you need to wrap your head around.

- `state` can be any JavaScript value (string, number, object, array, etc).
- An `action` is a thing that happened. It's _usually_ a JavaScript object. But, I guess it doesn't have to be. But, it totally should be. Don't innovate here. No one needs it.
- A `reducer` is a JavaScript function that takes the current state of thw world and an action. It returns what the state should look like in light of whatever that new action that occured was.

### What do actions look like?

There are technically no rules, but the civilized among us tend to structure them as follows:

```js
const action = {
  type: 'INCREMENT', // The name of the thing that happened.
  payload: 2, // Anything else we need to know to do our jobs.
};
```

### What does a reducer look like?

And then your reducer, might look something like this:

```js
const reducer = (state, action) => {
  if (action.type === 'INCREMENT') {
    return state + action.payload;
  }

  return state;
};
```

You know what's super cool about all of this? It's just JavaScript. This means that you can test it super easily.

## Refactoring to use a reducer

Yea, this component is still dumbly simple. But, it's a good place to get started—and then we'll tie it into something a little more real.

There are a bunch of ways that we could do this, but let's start dumbly-simple.

```js
const reducer = (state = 0, action) => {
  if (action === 'INCREMENT') return increment(state);
  if (action === 'DECREMENT') return decrement(state);
  if (action === 'RESET') return 0;
  return state;
};
```

And then in your component:

```jsx
<button className="w-full" onClick={() => dispatch('DECREMENT')}>
          Decrement
</button>
<button className="w-full" onClick={() => dispatch('RESET')}>
  Reset
</button>
<button className="w-full" onClick={() => dispatch('INCREMENT')}>
  Increment
</button>
```

This isn't much different than what we had with `useState`, but this also gives us the groundwork for some interesting ideas.

## Using `useReducer` when dealing with multiple values

`useReducer` becomes a little more interesting when you need to juggle multiple values in order to figure out what to do. So, let's get that `IncrementBy` component working.

**Steve's Rule That No One Asked For**: The moment you find yourself using more than two `useStates` or writing weird functions thate are juggling more than one piece of state, then it's probably time to look at `useReducer`.

Now we have to things we need to keep track of:

- The current `count`
- How much we should `incrementBy` when incrementing or decrementing.

As such, the state in our reducer might look like this:

```js
const defaultState = {
  count: 0,
  incrementAmount: 1,
};
```

And we could start by doing something like this:

```js
const defaultState = {
  count: 0,
  incrementAmount: 1,
};

const reducer = (state = defaultState, action) => {
  if (action === 'INCREMENT') {
    return { ...state, count: state.count + state.incrementAmount };
  }

  if (action === 'DECREMENT') {
    return { ...state, count: state.count - state.incrementAmount };
  }

  if (action === 'RESET') {
    return defaultState;
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
      {/* Omitted for brevity… */}
      <IncrementBy amount={incrementAmount} />
      <SetToValue />
    </main>
  );
};
```

This should basically have the same effect as our previous iteraction, but we're setting ourselves up for great things.

### Rethinking our actions

`INCREMENT`, `DECREMENT`, and `RESET` didn't require any additional information. So, we just cheated by using strings for the action names. But, when we want to set the amount that we should be incrementing and decrementing by, we're probably going to need to tell it _what_ we want to set that value you to. That's where that `payload` property comes in handy.

But, it'd be wierd (and annoying) to have strings for some kinds of actions and objects for the rest. So, let's just do this. Let's grow up and refactor our code accordingly.

We could do something like this:

```js
<button onClick={() => dispatch({ type: 'DECREMENT' })}>
  Decrement
</button>
<button onClick={() => dispatch({ type: 'RESET' })}>
  Reset
</button>
<button onClick={() => dispatch({ type: 'INCREMENT' })}>
  Increment
</button>
```

And then we could update our reducer accordingly:

```js
const reducer = (state = defaultState, action) => {
  if (action.type === 'INCREMENT') {
    return { ...state, count: state.count + state.incrementAmount };
  }

  if (action.type === 'DECREMENT') {
    return { ...state, count: state.count - state.incrementAmount };
  }

  if (action.type === 'RESET') {
    return defaultState;
  }

  return state;
};
```

**TL;DR**: We're just replacing those strings with objects where the string is now the value of the `type` property.

## Wiring up the `IncrementBy` component

We can add thhe following logic to our reducer:

```js
if (action.type === 'SET_INCREMENT_AMOUNT') {
  return { ...state, incrementAmount: Number(action.payload) };
}
```

And it'll definitely do the trick if we send it an action that looks something like this:

```js
dispatch({
  type: 'SET_INCREMENT_AMOUNT',
  payload: 5,
});
```

Let's take the easy road and hand `IncrementBy` a reference to `dispatch` for now.

```js
<IncrementBy amount={incrementAmount} dispatch={dispatch} />
```

In `components/increment-by`, we'll do the following:

```jsx
const IncrementBy = ({ amount, dispatch }) => {
  return (
    <section className="flex gap-2 items-center justify-center">
      <label className="whitespace-nowrap" htmlFor="increment-by">
        Increment By
      </label>
      <input
        id="increment-by"
        className="w-full"
        type="number"
        placeholder="Increment by…"
        value={amount}
        onChange={(event) => {
          /* 👀 LOOK HERE 👀 */
          dispatch({
            type: 'SET_INCREMENT_AMOUNT',
            payload: event.target.value,
          });
        }}
      />
    </section>
  );
};
```

And it should work as expected. Albeit, it could use some refactoring.
