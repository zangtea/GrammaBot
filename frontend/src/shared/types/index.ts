export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface Vocab {
  id: string;
  userId: string;
  word: string;
  learned: boolean;
  createdAt?: string;
  meaning?: string; // AI-generated meaning
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface GrammarRequest {
  question: string;
}

export interface GrammarResponse {
  response: string;
}

export interface ApiError {
  message: string;
  status?: number;
}

// Form validation schemas
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface VocabForm {
  word: string;
}

// UI State
export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

export interface NotificationState {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}