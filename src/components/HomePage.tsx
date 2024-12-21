import { useState } from 'react';
import { ReactTyped } from 'react-typed';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  BrainCircuit, 
  CheckCircle,    
  Globe,
  Zap,
} from 'lucide-react';
import { ThemeToggle } from './theme/ThemeToggle';
import { ThemeProvider } from './theme/ThemeProvider';
import * as Avatar from '@radix-ui/react-avatar';
import { useNavigate } from 'react-router-dom';



const TypewriterText = () => {
  const strings = ["Talk", "AI", "Future", "Dreams", "Innovation", "Possibilities"];
  
  return (
    <div className="inline-flex items-center">
      <span className="ml-2 font-mono text-orange-400 dark:text-green-500">
        {"{"}
        <ReactTyped className='text-green-500 dark:text-cyan-300'
          strings={strings}
          typeSpeed={150}
          backSpeed={100}
          backDelay={1000}
          loop
          showCursor
          cursorChar="|"
        />
        {"}"}
      </span>
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const features = [
    { icon: <BrainCircuit className="w-6 h-6" />, title: "AI-Powered Debugging", description: "Use AI to automatically analyze and debug your code" },
    { icon: <Globe className="w-6 h-6" />, title: "Access Anywhere", description: "Access your debugging sessions and projects from any device" },
    { icon: <CheckCircle className="w-6 h-6" />, title: "Error Detection", description: "Quickly detect and highlight errors in your code with AI assistance" },
    { icon: <Zap className="w-6 h-6" />, title: "Fast Debugging", description: "Speed up your debugging process with automated AI suggestions" }
  ];

  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <div className="h-screen w-screen bg-gray-200 dark:bg-gray-900">
      <div className="min-h-screen w-screen bg-gray-200 dark:bg-gray-900">
        {/* Navigation */}
        <nav className="border-b bg-white dark:bg-gray-800 rounded-xl flex">
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center flex-wrap">
              <div className="flex-shrink-0 flex cursor-pointer" onClick={ () => navigate('/')}>
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
                
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
          <h1 className=" text-4xl font-bold sm:text-6xl mt-2 mb-6 flex justify-center text-blue-700 dark:text-blue-300">
                  Code
                  <TypewriterText />
                </h1>
            <h1 className="text-2xl font-bold sm:text-4xl mt-6 mb-6">
              The Online Code Analysis Platform
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Analyze, debug, and optimize your code with AI assistance
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" onClick={() => navigate('/code')}>
                Get Started - It's Free
              </Button>
              
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-muted/50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="bg-background">
                  <CardHeader>
                    <div className="mb-2">{feature.icon}</div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>        
      </div>
      </div>
    </ThemeProvider>
  );
};


export default  HomePage ;