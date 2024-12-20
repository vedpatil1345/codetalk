import React from 'react';
import { LlmResponse } from './LlmResponse';
import { type AnalysisPrompt } from '@/types/analysis';

interface AnalysisResultsProps {
  prompts: AnalysisPrompt[];
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ prompts }) => {
  return (
    <div className="mt-6 space-y-4">
      {prompts.map((prompt) => (
        <LlmResponse 
          key={prompt.name}
          query={prompt.query}
          name={prompt.name}
        />
      ))}
    </div>
  );
};