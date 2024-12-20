import { useState, useEffect } from 'react';
import { ChatGroq } from '@langchain/groq';
import { HumanMessage } from '@langchain/core/messages';

export const useLlmResponse = (query: string) => {
  const [response, setResponse] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchResponse = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!import.meta.env.VITE_GROQ_API_KEY) {
        throw new Error('GROQ API key is not configured');
      }

      const llm = new ChatGroq({
        modelName: 'llama-3.2-90b-vision-preview',
        apiKey: import.meta.env.VITE_GROQ_API_KEY,
        temperature: 0.7,
        
      });

      const messages = [new HumanMessage(query)];
      const res = await llm.invoke(messages);
      setResponse(typeof res.content === 'string' ? res.content : JSON.stringify(res.content));
      setIsOpen(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch response';
      setError(errorMessage);
      console.error('LLM Error:', err);
    } finally {
      setIsLoading(false);
    }
  };  useEffect(() => {
    if (query) {
      fetchResponse();
    }
  }, [query, retryCount]);

  const retry = () => setRetryCount(prev => prev + 1);

  return {
    response,
    error,
    isLoading,
    retry,
    isOpen,
    setIsOpen
  };
};