export const API_BASE_URL = 'http://localhost:3000';

export const API_ENDPOINTS = {
  AUTH_LOGIN: '/auth/login',
  AUTH_REGISTER: '/auth/register',
  VOCAB_GET: '/vocab/:userId',
  VOCAB_CREATE: '/vocab',
  VOCAB_MARK_LEARNED: '/vocab/:id/learned',
  AI_GRAMMAR: '/ai/grammar',
};

export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'user_data',
};
