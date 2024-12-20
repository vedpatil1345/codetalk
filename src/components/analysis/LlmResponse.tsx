import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Loader2, ChevronDown, ChevronUp, RefreshCcw, AlertCircle } from 'lucide-react';
import { useLlmResponse } from '@/hooks/useLlmResponse';

interface LlmResponseProps {
  query: string;
  name: string;
}

export const LlmResponse: React.FC<LlmResponseProps> = ({ query, name }) => {
  const { response, error, isLoading, retry, isOpen, setIsOpen } = useLlmResponse(query);

  return (
    <Collapsible 
      open={isOpen} 
      onOpenChange={setIsOpen}
      className="w-full space-y-2 rounded-lg border border-border bg-card transition-all duration-200"
    >
      <CollapsibleTrigger className="flex w-full items-center justify-between p-4 hover:bg-muted rounded-t-lg transition-colors duration-200">
        <div className="flex items-center gap-3">
          <h2 className="font-semibold text-foreground">{name}</h2>
          {isLoading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
          {error && <AlertCircle className="h-4 w-4 text-destructive" />}
        </div>
        <div className="flex items-center gap-2">
          {error && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                retry();
              }}
              className="h-8 w-8 p-0"
            >
              <RefreshCcw className="h-4 w-4" />
            </Button>
          )}
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent className="p-4 overflow-y-auto max-h-[500px] border-t border-border">
        {error ? (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="ml-2">
              {error}
              <Button variant="link" onClick={retry} className="ml-2 text-sm underline">
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown>{response}</ReactMarkdown>
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};