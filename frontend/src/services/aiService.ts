import api from './apiService';
import { GrammarResponse } from '../types';

interface GrammarRequest {
  question: string;
}

export const aiService = {
  getGrammarExplanation: async (data: GrammarRequest): Promise<GrammarResponse> => {
    const response = await api.post<GrammarResponse>('/ai/grammar', data);
    return response.data;
  },
};
