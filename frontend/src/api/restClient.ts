import axios from 'axios';
import type { User, Task } from '../types/index';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export class RestClient {
  private requestCount = 0;
  private totalBytes = 0;

  resetStats() {
    this.requestCount = 0;
    this.totalBytes = 0;
  }

  getStats() {
    return {
      requestsCount: this.requestCount,
      totalDataSize: this.totalBytes,
    };
  }

  private trackRequest(dataSize: number) {
    this.requestCount++;
    this.totalBytes += dataSize;
    console.log(`REST Request #${this.requestCount} - Size: ${dataSize} bytes`);
  }

  // Получить всех пользователей
  async getUsers(): Promise<User[]> {
    const response = await axios.get<User[]>(`${API_BASE_URL}/users`);
    this.trackRequest(JSON.stringify(response.data).length);
    return response.data;
  }

  // Получить пользователя по ID (ОДИН запрос)
  async getUserById(id: number): Promise<User> {
    const response = await axios.get<User>(`${API_BASE_URL}/users/${id}`);
    this.trackRequest(JSON.stringify(response.data).length);
    return response.data;
  }

  // Получить задачи пользователя (ОТДЕЛЬНЫЙ запрос)
  async getUserTasks(userId: number): Promise<Task[]> {
    const response = await axios.get<Task[]>(`${API_BASE_URL}/tasks`);
    const tasks = response.data.filter(task => task.user_id === userId);
    this.trackRequest(JSON.stringify(response.data).length);
    return tasks;
  }

  // Получить пользователя с задачами (ТРЕБУЕТ 2 ЗАПРОСА!)
  async getUserWithTasks(userId: number): Promise<User & { tasks: Task[] }> {
    this.resetStats();
    
    // Запрос 1: получаем пользователя
    const user = await this.getUserById(userId);
    
    // Запрос 2: получаем задачи
    const tasks = await this.getUserTasks(userId);
    
    return { ...user, tasks };
  }

  // Создать пользователя
  async createUser(name: string, email: string): Promise<User> {
    const response = await axios.post<User>(`${API_BASE_URL}/users`, { name, email });
    this.trackRequest(JSON.stringify(response.data).length);
    return response.data;
  }

  // Создать задачу
  async createTask(title: string, description: string, userId: number): Promise<Task> {
    const response = await axios.post<Task>(`${API_BASE_URL}/tasks`, {
      title,
      description,
      user_id: userId,
    });
    this.trackRequest(JSON.stringify(response.data).length);
    return response.data;
  }
}

export const restClient = new RestClient();