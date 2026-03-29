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