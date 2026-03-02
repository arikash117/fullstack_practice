import { Link } from 'react-router-dom';
import { ReduxCounter } from '../components/ReduxCounter';

export const ReduxPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Link to="/" style={{ marginBottom: '20px', display: 'inline-block' }}>
        ← На главную
      </Link>
      <h1>Redux Toolkit Пример</h1>
      <ReduxCounter />
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3>Как это работает:</h3>
        <ul>
          <li>Создаем slice с состоянием и функциями</li>
          <li>Dispatch отправляет действия (actions)</li>
          <li>Selector получает данные из store</li>
          <li>Открой Redux DevTools в браузере! (F12 → Redux)</li>
        </ul>
      </div>
    </div>
  );
};
