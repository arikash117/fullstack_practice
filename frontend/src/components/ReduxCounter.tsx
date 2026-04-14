import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { increment, decrement, incrementByAmount, reset } from '../store/counterSlice';

export const ReduxCounter = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState('5');

  return (
    <div style={{ border: '2px solid #2196F3', padding: '20px', borderRadius: '8px' }}>
      <h2>Redux Toolkit Counter</h2>
      <h1>{count}</h1>
      <div style={{ gap: '10px', display: 'flex', marginBottom: '10px' }}>
        <button onClick={() => dispatch(decrement())} style={{ padding: '10px 20px' }}>
          - Decrement
        </button>
        <button onClick={() => dispatch(increment())} style={{ padding: '10px 20px' }}>
          + Increment
        </button>
      </div>
      <div style={{ gap: '10px', display: 'flex', alignItems: 'center' }}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ padding: '8px', width: '80px' }}
        />
        <button
          onClick={() => dispatch(incrementByAmount(Number(amount) || 0))}
          style={{ padding: '10px 20px' }}
        >
          Add Amount
        </button>
        <button
          onClick={() => dispatch(reset())}
          style={{ padding: '10px 20px', backgroundColor: '#f44336', color: 'white' }}
        >
          Reset
        </button>
      </div>
      <p style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
        Использует Redux Toolkit + DevTools
      </p>
    </div>
  );
};
