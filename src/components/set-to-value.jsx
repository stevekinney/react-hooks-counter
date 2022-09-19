const SetToValue = ({ count }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
      <div className="flex gap-2 items-center justify-center">
        <label htmlFor="set-count" className="whitespace-nowrap">
          Set To
        </label>
        <input
          id="set-count"
          className="w-full"
          type="number"
          placeholder="Value"
          defaultValue={count}
        />
      </div>
      <button className="w-full">Submit</button>
    </form>
  );
};

export default SetToValue;
