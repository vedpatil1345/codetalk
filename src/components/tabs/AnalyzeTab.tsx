import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { AnalysisResults } from '../analysis/AnalysisResults';
import { useAnalysisPrompts } from '@/hooks/useAnalysisPrompts';

export const AnalyzeTab = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('JavaScript');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const { getPrompts } = useAnalysisPrompts();

  const handleAnalyze = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const codeMsg = formData.get('code') as string;
    const languageMsg = formData.get('language') as string;
    setCode(codeMsg);
    setLanguage(languageMsg);
    setShowAnalysis(true);
  };

  return (
    <div className="h-full flex flex-col items-center overflow-auto px-4">
      <Card className="w-full max-w-4xl p-6 bg-card border-border mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">Code Analysis</h2>
        <form onSubmit={handleAnalyze} className="space-y-4">
          <div>
            <label htmlFor="code" className="block mb-2 font-medium text-foreground">
              Code
            </label>
            <Textarea
              id="code"
              name="code"
              rows={12}
              className="w-full bg-background text-foreground border-input"
              placeholder="Paste your code here"
              required
            />
          </div>
          <div>
            <label htmlFor="language" className="block mb-2 font-medium text-foreground">
              Language
            </label>
            <Select onValueChange={setLanguage} defaultValue={language}>
              <SelectTrigger className="bg-background text-foreground border-input">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Languages</SelectLabel>
                  <SelectItem value="JavaScript">JavaScript</SelectItem>
                  <SelectItem value="Python">Python</SelectItem>
                  <SelectItem value="Java">Java</SelectItem>
                  <SelectItem value="C++">C++</SelectItem>                
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            Analyze
          </Button>
        </form>
      </Card>
      {showAnalysis && (
        <div className="w-full max-w-4xl mb-6">
          <AnalysisResults prompts={getPrompts(code, language)} />
        </div>
      )}
    </div>
  );
};