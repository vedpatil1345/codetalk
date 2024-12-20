import { AnalyzeTab } from './tabs/AnalyzeTab';
import { ErrorTab } from './tabs/ErrorTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, AlertTriangle } from "lucide-react";
import { ThemeToggle } from './theme/ThemeToggle';
import { ThemeProvider } from './theme/ThemeProvider';
import * as Avatar from '@radix-ui/react-avatar';
const CodePage = () => (<ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <div className="h-screen w-screen bg-background transition-colors duration-300">
        <div className="h-screen w-screen flex flex-col p-4">
          <header className="flex justify-between items-center mb-8 px-4">
            <div className="text-center flex-1">
              <h1 className="text-4xl font-bold text-foreground">
              <Avatar.Root className=" h-12 w-12 mr-4">
              <svg className='inline-block' width="50" height="50" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 2H8V7H13V2.5C13 2.22386 12.7761 2 12.5 2ZM13 8H8V13H12.5C12.7761 13 13 12.7761 13 12.5V8ZM7 7V2H2.5C2.22386 2 2 2.22386 2 2.5V7H7ZM2 8V12.5C2 12.7761 2.22386 13 2.5 13H7V8H2ZM2.5 1C1.67157 1 1 1.67157 1 2.5V12.5C1 13.3284 1.67157 14 2.5 14H12.5C13.3284 14 14 13.3284 14 12.5V2.5C14 1.67157 13.3284 1 12.5 1H2.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>

              </Avatar.Root>
              
                CodeTalk
              </h1>
              <p className="text-muted-foreground mt-2">
                Analyze your code and debug errors with AI assistance
              </p>
            </div>
            <ThemeToggle />
          </header>
          
          <main className="flex-1 overflow-hidden">
            <Tabs defaultValue="" className="h-full flex flex-col items-center w-full">
              <TabsList className="bg-gray-400 w-full max-w-2xl mx-auto grid grid-cols-2 px-4 m-1 gap-2 content-center">
                <TabsTrigger 
                  value="Code-analyzer"
                  className="flex items-center gap-2 focus:border-white "
                >
                  <Code className="h-4 w-4" />
                  Code Analyzer
                </TabsTrigger>
                <TabsTrigger 
                  value="Error-analyzer"
                  className="flex items-center gap-2 focus:border-white "
                >
                  <AlertTriangle className="h-4 w-4" />
                  Error Analyzer
                </TabsTrigger>
              </TabsList>
              
              <div className="flex-1 overflow-auto mt-6 w-full">
                <TabsContent 
                  value="Code-analyzer"
                  className="h-full focus-visible:outline-none focus-visible:ring-0 w-full"
                >
                  <AnalyzeTab />
                </TabsContent>
                
                <TabsContent 
                  value="Error-analyzer"
                  className="h-full focus-visible:outline-none focus-visible:ring-0 w-full"
                >
                  <ErrorTab />
                </TabsContent>
              </div>
            </Tabs>
          </main>
        </div>
      </div>
    </ThemeProvider>

);
export const Page = () => {
  return (
    <CodePage />
  );
};
