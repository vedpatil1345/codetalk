import { type AnalysisPrompt } from '@/types/analysis';

export const useErrorPrompts = () => {
  const getPrompts = (error: string, context: string): AnalysisPrompt[] => [
    {
      name: 'Explanation',
      query: `Explain this error message in detail:

${error}

Code Context:
${context}

Provide:
1. What the error means
2. Specific cause
3. Programming concept explanation`
    },
    {
      name: 'Solution',
      query: `Provide step-by-step solutions for this error:

${error}

Code Context:
${context}

Include:
1. Immediate fix steps
2. Alternative approaches
3. Verification methods`
    },
    {
      name: 'Pitfalls',
      query: `Identify common pitfalls related to this error:

${error}

Code Context:
${context}

List:
1. Common mistake patterns
2. Similar error traps
3. Prevention strategies`
    },
    {
      name: 'Resources',
      query: `Recommend learning resources about this error:

${error}

Code Context:
${context}

Suggest:
1. Documentation links
2. Tutorial references
3. Related learning paths`
    }
  ];

  return { getPrompts };
};