import api from './client';
import type { GrammarRequest, GrammarResponse } from '../types';

export const grammarApi = {
  askGrammar: async (data: GrammarRequest): Promise<GrammarResponse> => {
    const response = await api.post('/ai/grammar', data);
    return response.data;
  },
};