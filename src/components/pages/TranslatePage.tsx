import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useLlmResponse } from '@/hooks/useLlmResponse';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MarkDown } from '@/components/MarkDown';
import { CodeSection } from './CodeWithAi';



export const TranslatePage: React.FC = () => {
  
    
  const [prompt, setPrompt] = useState('');
  const { response, error, isLoading, retry } = useLlmResponse(prompt);
  const getPrompt = (code: string, language:string) => {
    const query = `Translate the following code into ${language}:\n\n${code}\n\n`;
    return query;

  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const code = formData.get('code') as string;
    const language = formData.get('language') as string;
    setPrompt(getPrompt(code, language));
    
  };
const handleReset = () => {
    setPrompt('');

    const codeElements = document.getElementsByName("code");
    const languageElements = document.getElementsByName("language");
    languageElements.forEach((element) => {
      if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
        element.value = ""; // Safely access the `value` property
      }
    });
    codeElements.forEach(element => {
      if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
        element.value = ""; // Safely access the `value` property
      }
    });
  };


  return (
    <div className="min-h-fit w-screen bg-transparent overflow-auto">
      <div className=" mx-auto px-6 py-6 ">
        <h1 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-500 dark:from-blue-400 dark:to-blue-300">
          Code Translator
        </h1>

        <div className=" mx-auto grid lg:grid-cols-[35%_60%]  gap-8 mb-12 overflow-y-auto max-h-[80%] px-2 py-2">
          <div className=" space-y-6 bg-slate-200/50 dark:bg-slate-900/50 p-4 rounded-lg border-2 border-slate-900/30 dark:border-slate-300/30 shadow-md max-h-[470px]">
            

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-2xl font-medium mb-2">Code</label>
                <CodeSection
                  name="code"
                  rows={4}
                  className="w-full font-mono border-2 border-slate-900/30 dark:border-slate-300/50"
                  placeholder="Paste your code here..."
                  required
                />
              </div>
            <div>
                <label className="block text-2xl font-medium mb-2">Language</label>
                <Input
                  name="language"
                  className="w-full font-mono border-2 border-slate-900/30 dark:border-slate-300/50"
                  placeholder="Enter the language you want to translate to..."
                  required
                />
              </div>
              <Button type="submit" className="w-[70%] bg-blue-500 hover:bg-blue-600 text-white">
                Translate Code
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
            <div className="overflow-y-auto flex flex-col space-y-6 bg-slate-200/50 dark:bg-slate-900/50 p-4 rounded-lg border-2 border-slate-900/30 dark:border-slate-300/30 shadow-md mb-12 max-h-[550px]">
            <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Translation</h2>
                {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin mt-4" />
        ) : error ? (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-5 w-5 max-w-5" />
            <AlertDescription>{error}</AlertDescription>
            <button onClick={retry}>retry</button>
          </Alert>
        ) : (
          <div className="relative p-4 text-black dark:text-white bg-slate-200/50 dark:bg-slate-900/50 shadow-lg dark:shadow-blue-500/50 rounded-lg hover:-translate-y-1 border-2 border-slate-900/30 dark:border-slate-300/30  transition-transform duration-300 max-h-[450px] overflow-auto">
            <MarkDown>{response}</MarkDown>
          </div>
        )}
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};
