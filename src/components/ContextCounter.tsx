import { useCounter } from '../context/CounterContext';

export const ContextCounter = () => {
  const { count, increment, decrement } = useCounter();

  return (
    <div style={{ border: '2px solid #4CAF50', padding: '20px', borderRadius: '8px' }}>
      <h2>Context API Counter</h2>
      <h1>{count}</h1>
      <div style={{ gap: '10px', display: 'flex' }}>
        <button onClick={decrement} style={{ padding: '10px 20px' }}>
          - Decrement
        </button>
        <button onClick={increment} style={{ padding: '10px 20px' }}>
          + Increment
        </button>
      </div>
      <p style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
        Использует Context API
      </p>
    </div>
  );
};
