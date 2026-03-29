import api from './client';
import type { Vocab } from '../types';

export const vocabApi = {
  getVocab: async (userId: string): Promise<Vocab[]> => {
    const response = await api.get(`/vocab/${userId}`);
    return response.data;
  },

  addVocab: async (data: { userId: string; word: string }): Promise<Vocab> => {
    const response = await api.post('/vocab', data);
    return response.data;
  },

  markLearned: async (id: string): Promise<Vocab> => {
    const response = await api.patch(`/vocab/${id}/learned`);
    return response.data;
  },
};