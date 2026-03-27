import { GrammarResponse } from '../types';

interface GrammarResultProps {
  result: GrammarResponse;
}

export const GrammarResult = ({ result }: GrammarResultProps) => {
  return (
    <div className="card">
      <h3 className="text-xl font-bold text-gray-900 mb-4">AI Explanation</h3>

      <div className="mb-6">
        <p className="text-gray-700 leading-relaxed">
          {result.explanation}
        </p>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Examples:</h4>
        <ul className="space-y-3">
          {result.examples.map((example, idx) => (
            <li key={idx} className="bg-gray-50 border-l-4 border-blue-500 pl-4 py-2 text-gray-600">
              {example}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
