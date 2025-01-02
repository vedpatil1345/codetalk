import React from 'react';
import { Card, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, Loader2, X } from 'lucide-react';
import { useLlmResponse } from '@/hooks/useLlmResponse';
import { MarkDown } from './MarkDown';
import classNames from 'classnames';

interface LlmResponseProps {
  query: string;
  name: string;
}



export const LlmResponse: React.FC<LlmResponseProps> = ({ query, name }) => {
  const { response, error, isLoading, retry } = useLlmResponse(query);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-4 lg:h-[32vh]">
      <Card
        onClick={() => setIsOpen(true)}
        className={classNames(
          'relative p-4 text-black dark:text-white bg-slate-200/50 dark:bg-slate-900/50 shadow-lg dark:shadow-blue-500/50 rounded-lg hover:-translate-y-1 border-2 border-slate-900/30 dark:border-slate-300/30  transition-transform duration-300 overflow-hidden',
          { 'cursor-pointer': !isOpen }
        )}
      >
        <CardTitle className="text-lg font-semibold">{name}</CardTitle>
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin mt-4" />
        ) : error ? (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-5 w-5 max-w-5" />
            <AlertDescription>{error}</AlertDescription>
            <button onClick={retry}>retry</button>
          </Alert>
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-[90%] mt-4  overflow-hidden p-4">
            <MarkDown>{response}</MarkDown>
          </div>
        )}
      </Card>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white dark:bg-slate-900/90 rounded-lg shadow-lg p-6 w-[90%] max-w-4xl max-h-[90%] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{name}</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            {error ? (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-5 w-5" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin mt-4" />
            ) : (
              <div className="prose prose-sm dark:prose-invert max-w-none mt-4 ">
                <MarkDown>{response}</MarkDown>
              </div>
            )}
            
          </div>
        </div>
      )}
    </div>
  );
};
