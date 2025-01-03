import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type AnalysisPrompt } from "@/types/analysis";
import { LlmResponse } from "../LlmResponse";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RefreshCw } from "lucide-react";
import { CodeSection } from "./CodeWithAi";
const ANALYSIS_TYPES = [
  "Normal",
  "Detailed",
  "Concise",
  "Explanatory",
  "Technical",
  "Beginner-friendly",
] as const;
type AnalysisType = (typeof ANALYSIS_TYPES)[number];
export const ErrorAnalysisPage: React.FC = () => {
  const [analysisType, setAnalysisType] = useState<AnalysisType>("Normal");
  const [prompts, setPrompts] = useState<AnalysisPrompt[]>([]);
  const getPrompts = (error: string,type:AnalysisType,context:string): AnalysisPrompt[] => [
    {
      name: "Explanation",
      query: `Explain this error message in ${type} manner:
    
    ${error}
    
    Code Context:
    ${context}
    
    Provide:
    1. What the error means
    2. Specific cause
    3. Programming concept explanation`,
    },
    {
      name: "Solution",
      query: `Provide step-by-step solutions for this error in ${type} manner:
    
    ${error}
    
    Code Context:
    ${context}
    
    Include:
    1. Immediate fix steps
    2. Alternative approaches
    3. Verification methods`,
    },
    {
      name: "Pitfalls",
      query: `Identify common pitfalls related to this error in ${type} manner:
    
    ${error}
    
    Code Context:
    ${context}
    
    List:
    1. Common mistake patterns
    2. Similar error traps
    3. Prevention strategies`,
    },
    {
      name: "Resources",
      query: `Recommend learning resources about this error in ${type} manner:
    
    ${error}
    
    Code Context:
    ${context}
    
    Suggest:
    1. Documentation links
    2. Tutorial references
    3. Related learning paths`,
    },
  ];

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const error = formData.get('error') as string;
    const code = formData.get('code') as string;
    const analysisType = formData.get('analysisType') as AnalysisType;
    setPrompts(getPrompts(error,analysisType,code));
  };
  const handleReset = () => {
    setPrompts([]);
  
    // Clear all elements with the name "error"
    const errorElements = document.getElementsByName("error");
    errorElements.forEach(element => {
      if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
        element.value = ""; // Safely access the `value` property
      }
    });
  
    // Clear all elements with the name "code"
    const codeElements = document.getElementsByName("code");
    codeElements.forEach(element => {
      if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
        element.value = ""; // Safely access the `value` property
      }
    });
    
  };

    return (
        <div className="min-h-fit bg-transparent overflow-auto">
          <div className="lg:top-5 absolute left-0 right-0 mx-0 px-6 py-6 ">
            <h1 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-500 dark:from-blue-400 dark:to-blue-300">
              Error Analysis Tool
            </h1>
    
            <div className="grid lg:grid-cols-[35%_60%] gap-8 ">
              <div className="space-y-6 bg-slate-200/50 dark:bg-slate-900/50 p-4 rounded-lg border-2 border-slate-900/30 dark:border-slate-300/30 shadow-md max-h-[530px]">
                
    
                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xl font-medium mb-2">Error</label>
                    <Textarea
                      name="error"
                      rows={2}
                      className="w-full font-mono border-2 border-slate-900/30 dark:border-slate-300/50"
                      placeholder="Paste your Error here..."
                      required
                      
                    />
                  </div>
                  <div>
                    <label className="block text-xl font-medium mb-2">Code{'(Optional)'}</label>
                    <CodeSection
                      name="code"
                      rows={4}
                      className="w-full font-mono border-2 border-slate-900/30 dark:border-slate-300/50"
                      placeholder="Paste your code here..."
                      
                    />
                  </div>
                  <div className=" max-w-md ">
                  <label className="block text-lg font-medium mb-2">
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
              <div className=" space-y-6 bg-slate-200/50 dark:bg-slate-900/50 p-4 rounded-lg border-2 border-slate-900/30 dark:border-slate-300/30 shadow-md lg:h-[75vh] mb-12">
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