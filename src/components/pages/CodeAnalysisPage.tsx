import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type AnalysisPrompt } from '@/types/analysis';
import {LlmResponse} from '../LlmResponse';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { CodeSection } from './CodeWithAi';

const ANALYSIS_TYPES = ['Normal', 'Detailed', 'Concise', 'Explanatory', 'Technical', 'Beginner-friendly'] as const;
type AnalysisType = typeof ANALYSIS_TYPES[number];

export const CodeAnalysisPage: React.FC = () => {
  
  const [analysisType, setAnalysisType] = useState<AnalysisType>('Normal');
  const [prompts, setPrompts] = useState<AnalysisPrompt[]>([]);

  const getPrompts = (code: string, analysisType: AnalysisType): AnalysisPrompt[] => [
    {
      name: 'Explanation',
      query: `Explain this code in a ${analysisType} manner:\n\n${code}\n\nFocus on:\n1. Overall purpose\n2. Key components\n3. Logic flow\n4. Important functions/methods`,
    },
    {
      name: 'Requirements',
      query: `List requirements for running this code in a ${analysisType} manner:\n\n${code}\n\nInclude:\n1. Dependencies\n2. Environment setup\n3. System requirements\n4. Prerequisites`,
    },
    {
      name: 'Error Detection',
      query: `Analyze this code for potential errors in a ${analysisType} manner:\n\n${code}\n\nConsider:\n1. Syntax errors\n2. Logic errors\n3. Common pitfalls\n4. Edge cases`,
    },
    {
      name: 'Improvements',
      query: `Suggest improvements for this code in a ${analysisType} manner:\n\n${code}\n\nFocus on:\n1. Performance\n2. Readability\n3. Best practices\n4. Security`,
    }
  ];
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const code = formData.get('code') as string;
    const analysisType = formData.get('analysisType') as AnalysisType;
    setPrompts(getPrompts(code, analysisType));
  };
const handleReset = () => {
    setPrompts([]);
    const codeElements = document.getElementsByName("code");
    codeElements.forEach(element => {
      if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
        element.value = ""; // Safely access the `value` property
      }
    });
  };


  return (
    <div className="min-h-fit bg-transparent">
      <div className="lg:top-5 absolute left-0 right-0  mx-0 px-6 py-6 ">
        <h1 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-500 dark:from-blue-400 dark:to-blue-300">
          Code Analysis Tool
        </h1>

        <div className="grid lg:grid-cols-[35%_60%] gap-8">
          <div className="space-y-6 bg-slate-200/50 dark:bg-slate-900/50 p-4 rounded-lg border-2 border-slate-900/30 dark:border-slate-300/30 shadow-md max-h-[500px] lg:h-[75vh]">
            

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="max-w-md lg:max-h-[300px]">
                <label className="block text-2xl font-medium mb-2">Code</label>
                <CodeSection
                  name="code"
                  rows={7}
                  placeholder="Paste your code here..."

                  required
                />
              </div>
              <div className=" max-w-md">
              <label className="block text-sm font-medium mb-2">
                Analysis Type
              </label>
              <Select value={analysisType} onValueChange={(value: AnalysisType) => setAnalysisType(value)}>
                <SelectTrigger className="border-2 border-slate-900/30 dark:border-slate-300/50">
                  <SelectValue placeholder="Select analysis type" />
                </SelectTrigger>
                <SelectContent>
                  {ANALYSIS_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
              <Button 
                type="submit" 
                className="w-[70%] bg-blue-500 hover:bg-blue-600 text-white"
              >
                Analyze Code
              </Button>
              <Button
              type="button"
              onClick={handleReset}
              className="flex "
            ><RefreshCw className="mr-2 h-4 w-4 " />
              Reset
            </Button>
            </form>
          </div>
          <div className=" space-y-6 bg-slate-200/50 dark:bg-slate-900/50 p-4 rounded-lg border-2 border-slate-900/30 dark:border-slate-300/30 lg:h-[75vh]  mb-12">
          <h2 className='block text-lg font-bold mb-2'>Analysis:</h2>

          <div className=" grid lg:grid-cols-2 gap-4">
          {prompts.map((prompt, index) => (
            <LlmResponse key={index} query={prompt.query} name={prompt.name} />
          ))}
          
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeAnalysisPage;