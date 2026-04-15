// src/api/graphqlClient.ts
import type { TypedDocumentNode } from '@apollo/client'; // ← добавили type
import { ApolloClient, InMemoryCache, gql, HttpLink } from '@apollo/client';
import type { User, Task } from '../types';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://127.0.0.1:8000/graphql',
  }),
  cache: new InMemoryCache(),
});

type GetUserWithTasksData = {
  user: {
    id: number;
    name: string;
    email: string;
    tasks: Array<{
      id: number;
      title: string;
      description: string | null;
    }>;
  } | null;
};

type GetUserWithTasksVars = {
  userId: number;
};

export const GET_USER_WITH_TASKS: TypedDocumentNode<
  GetUserWithTasksData,
  GetUserWithTasksVars
> = gql`
  query GetUserWithTasks($userId: Int!) {
    user(id: $userId) {
      id
      name
      email
      tasks {
        id
        title
        description
      }
    }
  }
`;

export class GraphQLClient {
  private requestCount = 0;
  private totalBytes = 0;

  resetStats(): void {
    this.requestCount = 0;
    this.totalBytes = 0;
  }

  getStats(): { requestsCount: number; totalDataSize: number } {
    return {
      requestsCount: this.requestCount,
      totalDataSize: this.totalBytes,
    };
  }

  private trackRequest(dataSize: number): void {
    this.requestCount++;
    this.totalBytes += dataSize;
    console.log(`GraphQL Request #${this.requestCount} - Size: ${dataSize} bytes`);
  }

  async getUserWithTasks(userId: number): Promise<User & { tasks: Task[] }> {
    this.resetStats();

    const result = await client.query<GetUserWithTasksData, GetUserWithTasksVars>({
      query: GET_USER_WITH_TASKS,
      variables: { userId },
    });

    if (!result.data?.user) {
      throw new Error('User not found');
    }

    const dataSize: number = JSON.stringify(result.data).length;
    this.trackRequest(dataSize);

    const user = result.data.user;
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      tasks: user.tasks.map((task: {
        id: number;
        title: string;
        description: string | null;
      }): Task => ({
        id: task.id,
        title: task.title,
        description: task.description,
        user_id: user.id,
      })),
    };
  }
}

export const graphQLClient = new GraphQLClient();