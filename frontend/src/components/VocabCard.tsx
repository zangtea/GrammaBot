import { Vocabulary } from '../types';

interface VocabCardProps {
  vocab: Vocabulary;
  onMarkLearned: (id: string) => void;
  isLoading?: boolean;
}

export const VocabCard = ({ vocab, onMarkLearned, isLoading = false }: VocabCardProps) => {
  return (
    <div className="card hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900">{vocab.word}</h3>
          <p className="text-sm text-gray-500 italic">{vocab.phonetic}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          vocab.learned
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {vocab.learned ? '✓ Learned' : 'Learning'}
        </span>
      </div>

      <div className="mb-4">
        <p className="text-gray-700 mb-3">
          <span className="font-semibold text-gray-900">Definition:</span><br />
          {vocab.definition}
        </p>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-gray-900 mb-2">Examples:</p>
        <ul className="space-y-2">
          {vocab.examples.map((example, idx) => (
            <li key={idx} className="text-gray-600 text-sm">
              • {example}
            </li>
          ))}
        </ul>
      </div>

      {!vocab.learned && (
        <button
          onClick={() => onMarkLearned(vocab.id)}
          disabled={isLoading}
          className="btn-secondary w-full"
        >
          {isLoading ? 'Marking...' : 'Mark as Learned'}
        </button>
      )}
    </div>
  );
};
