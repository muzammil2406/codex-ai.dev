'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2, Loader2 } from 'lucide-react';
import { getStory } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

interface CodeNarrativeProps {
  initialStory: string;
  repoUrl: string;
}

export default function CodeNarrative({ initialStory, repoUrl }: CodeNarrativeProps) {
  const [story, setStory] = useState(initialStory);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateStory = async () => {
    setIsLoading(true);
    const result = await getStory(repoUrl);
    setIsLoading(false);

    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Error generating story',
        description: result.error,
      });
    } else if (result.story) {
      setStory(result.story);
       toast({
        title: 'Story Regenerated',
        description: 'A new story has been generated.',
      });
    }
  };

  return (
    <Card className="h-full glassmorphism">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1.5">
          <CardTitle className="font-headline text-2xl">Code Narrative</CardTitle>
          <p className="text-muted-foreground">The story of your codebase's evolution.</p>
        </div>
        <Button onClick={handleGenerateStory} disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-4 w-4" />
          )}
          Regenerate Story
        </Button>
      </CardHeader>
      <CardContent>
        <div className="prose prose-invert max-w-none prose-headings:font-headline prose-p:text-foreground/80 prose-headings:text-primary-foreground">
          {story.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('###')) {
              return <h3 key={index} className="text-xl font-bold mt-6 mb-2">{paragraph.replace('### ', '')}</h3>
            }
            return <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>
          })}
        </div>
      </CardContent>
    </Card>
  );
}
