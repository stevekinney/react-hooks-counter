import SetToValue from './components/set-to-value';
import IncrementBy from './components/increment-by';

export const Application = () => {
  const count = 0;

  return (
    <main className="m-auto mx-8 my-8 border-8 border-pink-300 p-4 flex flex-col gap-4">
      <section className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-center">Current Count</h2>
        <p className="text-6xl text-center">{count}</p>
      </section>
      <section className="flex flex-col md:flex-row justify-center gap-2">
        <button className="w-full">Decrement</button>
        <button className="w-full">Reset</button>
        <button className="w-full">Increment</button>
      </section>
      <IncrementBy amount={1} />
      <SetToValue count={count} />
    </main>
  );
};

export default Application;
