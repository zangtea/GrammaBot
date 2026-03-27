export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Vocabulary {
  id: string;
  userId: string;
  word: string;
  phonetic: string;
  definition: string;
  examples: string[];
  learned: boolean;
  createdAt: string;
}

export interface GrammarQuestion {
  question: string;
}

export interface GrammarResponse {
  explanation: string;
  examples: string[];
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
  status?: number;
}
