import { type AnalysisPrompt } from '@/types/analysis';

export const useAnalysisPrompts = () => {
  const getPrompts = (code: string, language: string): AnalysisPrompt[] => [
    {
      name: 'Explanation',
      query: `Explain this ${language} code in detail:

${code}

Focus on:
1. Overall purpose
2. Key components
3. Logic flow
4. Important functions/methods`
    },
    {
      name: 'Requirements',
      query: `List requirements for running this ${language} code:

${code}

Include:
1. Dependencies
2. Environment setup
3. System requirements
4. Prerequisites`
    },
    {
      name: 'Error Detection',
      query: `Analyze this ${language} code for potential errors:

${code}

Consider:
1. Syntax errors
2. Logic errors
3. Common pitfalls
4. Edge cases`
    },
    {
      name: 'Improvements',
      query: `Suggest improvements for this ${language} code:

${code}

Focus on:
1. Performance
2. Readability
3. Best practices
4. Security`
    }
  ];

  return { getPrompts };
};