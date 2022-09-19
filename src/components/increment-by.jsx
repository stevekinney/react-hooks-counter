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
          dispatch({
            type: 'SET_INCREMENT_AMOUNT',
            payload: event.target.value,
          });
        }}
      />
    </section>
  );
};

export default IncrementBy;
