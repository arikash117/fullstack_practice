import { Link } from 'react-router-dom';
import { CounterProvider } from '../context/CounterContext';
import { ContextCounter } from '../components/ContextCounter';

export const ContextPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Link to="/" style={{ marginBottom: '20px', display: 'inline-block' }}>
        ← На главную
      </Link>
      <h1>Context API Пример</h1>
      <CounterProvider>
        <ContextCounter />
      </CounterProvider>
    </div>
  );
};
