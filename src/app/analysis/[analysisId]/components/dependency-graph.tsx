import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function DependencyGraph() {
  const placeholder = PlaceHolderImages.find(p => p.id === 'dependency-graph');

  return (
    <Card className="glassmorphism">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Interactive Dependency Graph</CardTitle>
        <CardDescription>
          Visualize files as nodes and imports as edges. (Interactive version coming soon)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
          {placeholder && (
            <Image 
              src={placeholder.imageUrl}
              alt={placeholder.description}
              fill
              className="object-cover"
              data-ai-hint={placeholder.imageHint}
            />
          )}
           <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
           <div className="absolute bottom-4 left-4 text-white">
             <h3 className="font-headline text-xl font-bold">Dependency Visualization</h3>
             <p className="text-sm">Click & drag to explore connections in a future update.</p>
           </div>
        </div>
      </CardContent>
    </Card>
  );
}
