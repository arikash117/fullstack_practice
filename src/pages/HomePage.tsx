import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>State Management Comparison</h1>
      <p style={{ fontSize: '18px', color: '#666', marginBottom: '40px' }}>
        Выбери подход для управления состоянием:
      </p>
      <div style={{ display: 'flex', gap: '30px', justifyContent: 'center' }}>
        <Link
          to="/context"
          style={{
            textDecoration: 'none',
            padding: '30px 50px',
            border: '3px solid #4CAF50',
            borderRadius: '12px',
            backgroundColor: '#f1f8f1',
            color: '#333',
          }}
        >
          <h2>Context API</h2>
          <p>Встроен в React<br />Простой API</p>
        </Link>
        <Link
          to="/redux"
          style={{
            textDecoration: 'none',
            padding: '30px 50px',
            border: '3px solid #2196F3',
            borderRadius: '12px',
            backgroundColor: '#e3f2fd',
            color: '#333',
          }}
        >
          <h2>Redux Toolkit</h2>
          <p>Глобальный store<br />DevTools</p>
        </Link>
      </div>
    </div>
  );
};
