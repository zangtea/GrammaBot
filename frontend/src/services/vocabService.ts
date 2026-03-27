import api from './apiService';
import { Vocabulary } from '../types';

interface VocabRequest {
  userId: string;
  word: string;
}

export const vocabService = {
  getVocabulary: async (userId: string): Promise<Vocabulary[]> => {
    const response = await api.get<Vocabulary[]>(`/vocab/${userId}`);
    return response.data;
  },

  addVocabulary: async (data: VocabRequest): Promise<Vocabulary> => {
    const response = await api.post<Vocabulary>('/vocab', data);
    return response.data;
  },

  markAsLearned: async (vocabId: string): Promise<Vocabulary> => {
    const response = await api.patch<Vocabulary>(`/vocab/${vocabId}/learned`);
    return response.data;
  },
};
