export enum UserRole {
  ADMIN = 'ADMIN',
  PM = 'PM',
  TEAM = 'TEAM',
  HR = 'HR',
  CLIENT = 'CLIENT',
  FINANCE = 'FINANCE'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEW = 'REVIEW',
  DONE = 'DONE'
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId: string;
  projectId: string;
  dueDate: string;
}

export interface Project {
  id: string;
  name: string;
  status: 'ACTIVE' | 'COMPLETED' | 'DELAYED' | 'ON_HOLD';
  progress: number;
  clientName: string;
  dueDate: string;
}

export interface Invoice {
  id: string;
  clientName: string;
  amount: number;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
  dueDate: string;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  status: 'ACTIVE' | 'LEAVE' | 'OFFLINE';
  avatar: string;
}

export interface EODReport {
  id: string;
  userId: string;
  date: string;
  content: string;
  summary?: string; // AI Generated summary
}