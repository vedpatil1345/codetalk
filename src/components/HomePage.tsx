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
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  

  const navigate = useNavigate();
  

  const handleLogin = () => {
    //login logic    
    navigate('/code');
  };

  const handleSignup = () => {
    //Signup logic
    setIsLoginOpen(true);
  };


  const features = [
    { icon: <BrainCircuit className="w-6 h-6" />, title: "AI-Powered Debugging", description: "Use AI to automatically analyze and debug your code" },
    { icon: <Globe className="w-6 h-6" />, title: "Access Anywhere", description: "Access your debugging sessions and projects from any device" },
    { icon: <CheckCircle className="w-6 h-6" />, title: "Error Detection", description: "Quickly detect and highlight errors in your code with AI assistance" },
    { icon: <Zap className="w-6 h-6" />, title: "Fast Debugging", description: "Speed up your debugging process with automated AI suggestions" }
  ];

  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <div className="min-h-screen w-screen bg-background">
        {/* Navigation */}
        <nav className="border-b">
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold flex items-center text-blue-700 dark:text-blue-300">
                  CodeTalk
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <Button 
                  variant="ghost"
                  className="bg-white text-black hover:bg-gray-100 dark:bg-black dark:text-white dark:hover:bg-gray-800"
                  onClick={() => setIsLoginOpen(true)}
                >
                  Login
                </Button>
                <Button 
                  className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                  onClick={() => setIsSignupOpen(true)}
                >
                  Register
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
          <h1 className=" text-4xl font-bold sm:text-6xl mt-6 mb-6 flex justify-center text-blue-700 dark:text-blue-300">
                  Code
                  <TypewriterText />
                </h1>
            <h1 className="text-4xl font-bold sm:text-6xl mt-6 mb-6">
              The Online Code Analysis Platform
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Analyze, debug, and optimize your code with AI assistance
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" onClick={() => setIsSignupOpen(true)}>
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

        {/* Login Dialog */}
        <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Login to CodeTalk</DialogTitle>
              <DialogDescription>
                Enter your credentials to access your account
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" />
              </div>
              <Button className="w-full" onClick={handleLogin}>
                Login
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Signup Dialog */}
        <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create an Account</DialogTitle>
              <DialogDescription>
                Join CodeTalk to start analyzing your code
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" type="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" type="password" placeholder="Create a password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" placeholder="Confirm your password" />
              </div>
              <Button className="w-full" onClick={handleSignup}>
                Create Account
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </ThemeProvider>
  );
};


export default  HomePage ;