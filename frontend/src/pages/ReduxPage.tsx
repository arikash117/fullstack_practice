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
    </div>
  );
};
