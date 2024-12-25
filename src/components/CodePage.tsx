import { AnalyzeTab } from './tabs/AnalyzeTab';
import { ErrorTab } from './tabs/ErrorTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, AlertTriangle } from "lucide-react";
import { ThemeToggle } from './theme/ThemeToggle';
import { ThemeProvider } from './theme/ThemeProvider';
import * as Avatar from '@radix-ui/react-avatar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingChatButton from './ChatSection';
import { useAuth } from './auth/AuthContext';
import UserMenu from './UserMenu';
const CodePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Code-analyzer");
  const { user } = useAuth();

  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <nav className="border-b bg-white dark:bg-gray-800 rounded-xl flex">
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center flex-wrap" >
              <div className="flex-shrink-0 flex cursor-pointer" onClick={() => navigate('/')}>
                <Avatar.Root className="h-8 w-8 mt-1 mr-1 text-2xl font-bold flex justify-center text-blue-700 dark:text-blue-300">
                  <svg width="30" height="30" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 2H8V7H13V2.5C13 2.22386 12.7761 2 12.5 2ZM13 8H8V13H12.5C12.7761 13 13 12.7761 13 12.5V8ZM7 7V2H2.5C2.22386 2 2 2.22386 2 2.5V7H7ZM2 8V12.5C2 12.7761 2.22386 13 2.5 13H7V8H2ZM2.5 1C1.67157 1 1 1.67157 1 2.5V12.5C1 13.3284 1.67157 14 2.5 14H12.5C13.3284 14 14 13.3284 14 12.5V2.5C14 1.67157 13.3284 1 12.5 1H2.5Z" 
                      fill="currentColor" 
                      fillRule="evenodd" 
                      clipRule="evenodd"
                    />
                  </svg>
                </Avatar.Root>
                <h1 className="text-2xl font-bold flex justify-center text-blue-700 dark:text-blue-300">
                  CodeTalk
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <UserMenu email={user?.email || ''} />
              </div>
            </div>
          </div>
        </nav>
      <div className="h-screen w-screen bg-background transition-colors duration-300 dark:bg-gray-900 dark:text-white">
        <div className="h-screen w-full flex flex-col p-4 text-black bg-gray-200 dark:text-white dark:bg-gray-900">
          <main className="flex-1 overflow-hidden text-black bg-gray-200 dark:text-white dark:bg-gray-900">
            <Tabs defaultValue="Code-analyzer" className="h-full flex flex-col items-center w-full text-black bg-gray-200 dark:text-white dark:bg-gray-900">
              <TabsList className="h-fit justify-center align-middle w-full max-w-2xl mx-auto grid grid-cols-2 px-4 m-1 gap-2 text-black bg-gray-200 dark:text-white dark:bg-gray-900">
                <TabsTrigger 
                  value="Code-analyzer"
                  onClick={() => setActiveTab("Code-analyzer")}
                  className={`flex items-center gap-2 bg-white text-black dark:bg-gray-700 dark:text-white ${
                    activeTab != "Code-analyzer" ? "border-1 border-black dark:border-cyan-700" : "border-2 border-green-700 dark:border-white"
                  }`}
                >
                  <Code className="h-4 w-4" />
                  Code Analyzer
                </TabsTrigger>
                <TabsTrigger 
                  value="Error-analyzer"
                  onClick={() => setActiveTab("Error-analyzer")}
                  className={`flex items-center gap-2 bg-white text-black dark:bg-gray-700 dark:text-white ${
                    activeTab != "Error-analyzer" ? "border-1 border-black dark:border-cyan-700" : "border-2 border-green-700  dark:border-white"
                  }`}
                >
                  <AlertTriangle className="h-4 w-4" />
                  Error Analyzer
                </TabsTrigger>
              </TabsList>
              
              <div className="flex-1 overflow-auto w-full">
                <TabsContent 
                  value="Code-analyzer"
                  className="h-full focus-visible:outline-none focus-visible:ring-0"
                >
                  <AnalyzeTab />
                </TabsContent>
                
                <TabsContent 
                  value="Error-analyzer"
                  className="h-full focus-visible:outline-none focus-visible:ring-0"
                >
                  <ErrorTab />
                </TabsContent>
              </div>
            </Tabs>
          </main>
        </div>
      </div>
      <FloatingChatButton />
    </ThemeProvider>
  );
};export default CodePage;