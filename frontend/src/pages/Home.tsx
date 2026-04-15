import { useState } from 'react';
import { restClient } from '../api/restClient';
import { graphQLClient } from '../api/graphqlClient';
import type { User } from '../types';

interface Stats {
  rest: { requestsCount: number; totalDataSize: number };
  graphql: { requestsCount: number; totalDataSize: number };
}

export const Home: React.FC = () => {
  const [restUser, setRestUser] = useState<User | null>(null);
  const [graphqlUser, setGraphqlUser] = useState<User | null>(null);
  const [stats, setStats] = useState<Stats>({
    rest: { requestsCount: 0, totalDataSize: 0 },
    graphql: { requestsCount: 0, totalDataSize: 0 },
  });
  const [userId, setUserId] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  const testREST = async () => {
    setLoading(true);
    try {
      const user = await restClient.getUserWithTasks(userId);
      setRestUser(user);
      const statsData = restClient.getStats();
      setStats(prev => ({ ...prev, rest: statsData }));
    } catch (error) {
      console.error('REST Error:', error);
    }
    setLoading(false);
  };

  const testGraphQL = async () => {
    setLoading(true);
    try {
      const user = await graphQLClient.getUserWithTasks(userId);
      setGraphqlUser(user);
      const statsData = graphQLClient.getStats();
      setStats(prev => ({ ...prev, graphql: statsData }));
    } catch (error) {
      console.error('GraphQL Error:', error);
    }
    setLoading(false);
  };

  const testBoth = async () => {
    await testREST();
    await testGraphQL();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>REST vs GraphQL Comparison</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <label>
          User ID: 
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={testREST} disabled={loading}>
          Test REST API
        </button>
        <button onClick={testGraphQL} disabled={loading}>
          Test GraphQL API
        </button>
        <button onClick={testBoth} disabled={loading}>
          Test Both
        </button>
      </div>

      {/* Statistics */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '20px',
        marginBottom: '20px'
      }}>
        <div style={{ 
          border: '2px solid #4CAF50', 
          padding: '15px', 
          borderRadius: '8px',
          backgroundColor: '#90ff90'
        }}>
          <h2 style={{ color: '#4CAF50' }}>REST API</h2>
          <p><strong>Requests:</strong> {stats.rest.requestsCount}</p>
          <p><strong>Data Size:</strong> {stats.rest.totalDataSize} bytes</p>
          <p><strong>Overhead:</strong> {stats.rest.requestsCount > 1 ? '❌ Multiple requests' : '✅ Single request'}</p>
        </div>

        <div style={{ 
          border: '2px solid #2196F3', 
          padding: '15px', 
          borderRadius: '8px',
          backgroundColor: '#abd8ff'
        }}>
          <h2 style={{ color: '#2196F3' }}>GraphQL API</h2>
          <p><strong>Requests:</strong> {stats.graphql.requestsCount}</p>
          <p><strong>Data Size:</strong> {stats.graphql.totalDataSize} bytes</p>
          <p><strong>Overhead:</strong> {stats.graphql.requestsCount === 1 ? '✅ Single request' : '❌ Multiple requests'}</p>
        </div>
      </div>

      {/* Comparison Summary */}
      {stats.rest.requestsCount > 0 && stats.graphql.requestsCount > 0 && (
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#a3a4ff',
          border: '2px solid #1707ff',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h3>📊 Comparison Summary:</h3>
          <ul>
            <li><strong>Requests saved:</strong> {stats.rest.requestsCount - stats.graphql.requestsCount}</li>
            <li><strong>Data difference:</strong> {stats.rest.totalDataSize - stats.graphql.totalDataSize} bytes</li>
            <li><strong>Efficiency:</strong> GraphQL uses {((stats.graphql.requestsCount / stats.rest.requestsCount) * 100).toFixed(0)}% of REST requests</li>
          </ul>
        </div>
      )}

      {/* Results */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <h2>REST Result</h2>
          {restUser ? (
            <div style={{ backgroundColor: '#90ff90', padding: '15px', borderRadius: '8px' }}>
              <h3>{restUser.name}</h3>
              <p>Email: {restUser.email}</p>
              <h4>Tasks ({restUser.tasks?.length || 0}):</h4>
              <ul>
                {restUser.tasks?.map(task => (
                  <li key={task.id}>
                    <strong>{task.title}</strong>
                    {task.description && <p>{task.description}</p>}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No data yet</p>
          )}
        </div>

        <div>
          <h2>GraphQL Result</h2>
          {graphqlUser ? (
            <div style={{ backgroundColor: '#abd8ff', padding: '15px', borderRadius: '8px' }}>
              <h3>{graphqlUser.name}</h3>
              <p>Email: {graphqlUser.email}</p>
              <h4>Tasks ({graphqlUser.tasks?.length || 0}):</h4>
              <ul>
                {graphqlUser.tasks?.map(task => (
                  <li key={task.id}>
                    <strong>{task.title}</strong>
                    {task.description && <p>{task.description}</p>}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No data yet</p>
          )}
        </div>
      </div>
    </div>
  );
};