# Simple Counter

We're going to use this repository to get our sea legs when it comes to using hooks in React.

## The Basics

Right now, this application doesn't really do anything. There is a hard-coded `count` and everything else is static.

Let's look at `application.jsx` and get it wired up with some basic state management.

Some quick notes:

- `IncrementBy` and `SetToValue` are broken out right now because I don't want to look at them right now. We'll look at them later.
- None of the buttons are wired up to do anything. There isn't even any state management in place.

### Implementing Some Basic State with `useState`

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

### Using the Previous State

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
