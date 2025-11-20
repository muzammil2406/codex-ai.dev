'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Github, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Icons } from '@/components/icons';

export default function HomeClient() {
  const [repoUrl, setRepoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a repository URL.",
      })
      return;
    }
    
    try {
      const url = new URL(repoUrl);
      if (url.hostname !== 'github.com') {
        throw new Error('Not a GitHub URL');
      }
    } catch(error) {
       toast({
        variant: "destructive",
        title: "Invalid URL",
        description: "Please enter a valid GitHub repository URL.",
      })
      return;
    }

    setIsLoading(true);
    router.push('/analysis/mock-analysis');
  };
  
  const handleDemo = () => {
    setIsLoading(true);
    setRepoUrl('https://github.com/facebook/react');
    router.push('/analysis/mock-analysis');
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(hsl(var(--primary)/0.2)_1px,transparent_1px)] [background-size:32px_32px]"></div>
      
      <div className="z-10 flex flex-col items-center text-center">
        <div className="flex items-center gap-4 mb-4">
          <Icons.logo className="h-16 w-16 text-primary" />
        </div>
        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter text-foreground">
          Codebase Archaeologist
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Unearth the stories hidden within your code. Automated analysis to understand any GitHub repository.
        </p>
      </div>

      <Card className="w-full max-w-2xl bg-card/60 backdrop-blur-lg border-white/10 shadow-lg z-10 mt-8">
        <CardContent className="pt-6">
          <form onSubmit={handleAnalysis} className="flex flex-col gap-4">
            <div className="relative">
              <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="url"
                placeholder="https://github.com/user/repository"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="pl-10 text-base h-12"
                required
                disabled={isLoading}
              />
            </div>
            <Button type="submit" size="lg" disabled={isLoading} className="h-12 text-base">
              {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              {isLoading ? 'Analyzing...' : 'Analyze Repository'}
              {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Button variant="link" onClick={handleDemo} disabled={isLoading}>
              Or try with a demo repository
            </Button>
          </div>
        </CardContent>
      </Card>

      <footer className="z-10 mt-16 text-sm text-muted-foreground">
        <p>Built with Next.js and Firebase.</p>
      </footer>
    </main>
  );
}
