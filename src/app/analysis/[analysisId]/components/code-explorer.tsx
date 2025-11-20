'use client';

import { useState, useMemo, type ReactNode } from 'react';
import type { FileNode } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Folder, File as FileIcon, ChevronRight, ChevronDown, Wand2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getCodeExplanation } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

interface FileTreeItemProps {
  node: FileNode;
  onFileSelect: (file: FileNode) => void;
  selectedFile: FileNode | null;
  level?: number;
}

function FileTreeItem({ node, onFileSelect, selectedFile, level = 0 }: FileTreeItemProps) {
  const [isOpen, setIsOpen] = useState(level < 2);

  if (node.type === 'folder') {
    return (
      <div>
        <div 
          className="flex items-center py-1.5 px-2 rounded-md hover:bg-sidebar-accent cursor-pointer" 
          style={{ paddingLeft: `${level * 1 + 0.5}rem` }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <ChevronDown className="h-4 w-4 mr-2" /> : <ChevronRight className="h-4 w-4 mr-2" />}
          <Folder className="h-4 w-4 mr-2 text-primary" />
          <span>{node.name}</span>
        </div>
        {isOpen && node.children?.map(child => (
          <FileTreeItem key={child.path} node={child} onFileSelect={onFileSelect} selectedFile={selectedFile} level={level + 1} />
        ))}
      </div>
    );
  }

  return (
    <div 
      className={`flex items-center py-1.5 px-2 rounded-md hover:bg-sidebar-accent cursor-pointer ${selectedFile?.path === node.path ? 'bg-sidebar-accent' : ''}`}
      style={{ paddingLeft: `${level * 1 + 0.5}rem` }}
      onClick={() => onFileSelect(node)}
    >
      <FileIcon className="h-4 w-4 mr-2 text-muted-foreground" />
      <span>{node.name}</span>
    </div>
  );
}

interface CodeExplorerProps {
  fileTree: FileNode;
}

const findInitialFile = (node: FileNode): FileNode | null => {
  if (node.type === 'file') return node;
  if (node.children) {
    for (const child of node.children) {
      const file = findInitialFile(child);
      if (file) return file;
    }
  }
  return null;
};

export default function CodeExplorer({ fileTree }: CodeExplorerProps) {
  const initialFile = useMemo(() => findInitialFile(fileTree), [fileTree]);

  const [selectedFile, setSelectedFile] = useState<FileNode | null>(initialFile);
  const [explanation, setExplanation] = useState('');
  const [isExplaining, setIsExplaining] = useState(false);
  const { toast } = useToast();

  const handleExplainCode = async () => {
    if (!selectedFile || !selectedFile.content || !selectedFile.language) {
      toast({ variant: 'destructive', title: 'Cannot explain file', description: 'File content or language not available.' });
      return;
    }
    setIsExplaining(true);
    setExplanation('');
    const result = await getCodeExplanation(selectedFile.content, selectedFile.language);
    setIsExplaining(false);
    if (result.error) {
      toast({ variant: 'destructive', title: 'Explanation failed', description: result.error });
    } else {
      setExplanation(result.explanation || 'No explanation was returned.');
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 h-[calc(100vh-10rem)]">
      <Card className="md:col-span-1 lg:col-span-1 glassmorphism">
        <CardHeader>
          <CardTitle className="font-headline text-lg">File Explorer</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-15rem)]">
            <div className="p-2">
              <FileTreeItem node={fileTree} onFileSelect={setSelectedFile} selectedFile={selectedFile} />
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      <Card className="md:col-span-2 lg:col-span-3 glassmorphism h-full flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline text-lg">{selectedFile?.path || 'Select a file'}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col min-h-0">
        {selectedFile ? (
          <>
            <div className="bg-background/50 rounded-md p-4 flex-1 overflow-auto">
              <pre className="font-code text-sm">
                <code>
                  {selectedFile.content}
                </code>
              </pre>
            </div>
            <div className="mt-4">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                   <AccordionTrigger
                      onClick={(e) => {
                        if (isExplaining) e.preventDefault();
                        if (!explanation) handleExplainCode();
                      }}
                      disabled={isExplaining}
                      className={cn(buttonVariants({ variant: 'outline' }), 'no-underline hover:no-underline w-fit gap-2')}
                    >
                      {isExplaining ? <Loader2 className="animate-spin" /> : <Wand2 />}
                      {isExplaining ? 'Thinking...' : explanation ? 'Explanation' : 'Explain this Code'}
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    {isExplaining && !explanation && (
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    )}
                    {explanation && (
                      <div className="prose prose-invert max-w-none text-foreground/80">
                        {explanation}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>Select a file from the explorer to view its content.</p>
          </div>
        )}
        </CardContent>
      </Card>
    </div>
  );
}
