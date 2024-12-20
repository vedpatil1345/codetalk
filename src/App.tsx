
import { AnalyzeTab } from './components/tabs/AnalyzeTab';
import { ErrorTab } from './components/tabs/ErrorTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, AlertTriangle } from "lucide-react";
import { ThemeToggle } from './components/theme/ThemeToggle';
import { ThemeProvider } from './components/theme/ThemeProvider';

const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <div className="h-screen w-screen bg-background transition-colors duration-300">
        <div className="h-screen w-screen flex flex-col p-4">
          <header className="flex justify-between items-center mb-8 px-4">
            <div className="text-center flex-1">
              <h1 className="text-4xl font-bold text-foreground">
                CodeTalk
              </h1>
              <p className="text-muted-foreground mt-2">
                Analyze your code and debug errors with AI assistance
              </p>
            </div>
            <ThemeToggle />
          </header>
          
          <main className="flex-1 overflow-hidden">
            <Tabs defaultValue="Code-analyzer" className="h-full flex flex-col">
              <TabsList className="w-full max-w-2xl mx-auto grid grid-cols-2 px-4">
                <TabsTrigger 
                  value="Code-analyzer"
                  className="flex items-center gap-2"
                >
                  <Code className="h-4 w-4" />
                  Code Analyzer
                </TabsTrigger>
                <TabsTrigger 
                  value="Error-analyzer"
                  className="flex items-center gap-2"
                >
                  <AlertTriangle className="h-4 w-4" />
                  Error Analyzer
                </TabsTrigger>
              </TabsList>
              
              <div className="flex-1 overflow-auto mt-6">
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
    </ThemeProvider>
  );
};

export default App;