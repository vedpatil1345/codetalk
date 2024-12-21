import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { AnalysisResults } from '../analysis/AnalysisResults';
import { useErrorPrompts } from '@/hooks/useErrorPrompts';

export const ErrorTab = () => {
  const [error, setError] = useState('');
  const [codeContext, setCodeContext] = useState('');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const { getPrompts } = useErrorPrompts();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const errorMsg = formData.get('error') as string;
    const contextMsg = formData.get('codeContext') as string;
    setError(errorMsg);
    setCodeContext(contextMsg);
    setShowAnalysis(true);
  };

  return (
    <div className="h-full flex flex-col items-center overflow-auto px-4">
      <Card className="w-full max-w-4xl p-6 bg-card border-border mb-6 bg-gray-100 dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-blue-800 dark:text-cyan-600 mb-6 ">Error Analysis</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="error" className="block mb-2 font-medium text-orange-600 dark:text-blue-400 ">
              Error Message
            </label>
            <Input
              type="text"
              id="error"
              name="error"
              className="w-full bg-white text-black border-input"
              placeholder="Paste your error message here"
              required
            />
          </div>
          <div>
            <label htmlFor="codeContext" className="block mb-2 font-medium text-orange-600 dark:text-blue-400">
              Code Context (optional)
            </label>
            <Textarea
              id="codeContext"
              name="codeContext"
              className="w-full bg-background text-foreground border-input"
              placeholder="Add relevant code context here"
              rows={8}
            />
          </div>
          <Button 
            type="submit" 
            className="justify-center m-auto block w-full max-w-sm border-1 border-black dark:border-white bg-blue-500 text-white dark:bg-gray-700 dark:text-white"

          >
            Analyze
          </Button>
        </form>
      </Card>
      {showAnalysis && (
        <div className="w-full max-w-4xl mb-6">
          <AnalysisResults prompts={getPrompts(error, codeContext)} />
        </div>
      )}
    </div>
  );
};