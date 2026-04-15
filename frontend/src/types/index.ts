export interface User {
  id: number;
  name: string;
  email: string;
  tasks?: Task[];
}

export interface Task {
  id: number;
  title: string;
  description: string | null;
  user_id: number;
}

export interface ApiStats {
  requestsCount: number;
  totalDataSize: number;
  loading: boolean;
}