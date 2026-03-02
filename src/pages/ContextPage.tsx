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
        <div style={{ marginTop: '20px', padding: '15px'}}>
          <h3>Как это работает:</h3>
          <ul>
            <li>Создаем Context с помощью createContext()</li>
            <li>Оборачиваем компоненты в CounterProvider</li>
            <li>Используем useCounter() для доступа к данным</li>
            <li>При изменении count - все компоненты обновляются</li>
          </ul>
        </div>
      </CounterProvider>
    </div>
  );
};
