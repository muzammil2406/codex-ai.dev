'use client';
import Link from "next/link";
import { useState } from "react";
import { usePathname } from 'next/navigation';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Github, FileDown, Loader2 } from "lucide-react";
import AuthButton from "./auth/auth-button";
import { useToast } from "@/hooks/use-toast";

export default function Header() {
  const pathname = usePathname();
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const isAnalysisPage = pathname.includes('/analysis/');

  const handleExport = async () => {
    const analysisContent = document.getElementById('analysis-content');
    if (!analysisContent) {
      toast({
        variant: "destructive",
        title: "Export Failed",
        description: "Could not find the content to export.",
      });
      return;
    }

    setIsExporting(true);

    try {
      const { default: jsPDF } = await import('jspdf');
      const { default: html2canvas } = await import('html2canvas');

      // Temporarily expand scrollable areas to capture all content
      const scrollAreas = analysisContent.querySelectorAll('[data-radix-scroll-area-viewport]');
      const originalStyles = new Map<HTMLElement, { height: string, maxHeight: string, overflow: string }>();

      scrollAreas.forEach(area => {
          const el = area as HTMLElement;
          originalStyles.set(el, { height: el.style.height, maxHeight: el.style.maxHeight, overflow: el.style.overflow });
          el.style.height = 'auto';
          el.style.maxHeight = 'none';
          el.style.overflow = 'visible';
      });
      
      const canvas = await html2canvas(analysisContent, {
        scale: 2,
        useCORS: true,
        backgroundColor: null, // Use the actual background color
        logging: false,
      });

      // Restore scrollable areas
       scrollAreas.forEach(area => {
          const el = area as HTMLElement;
          const styles = originalStyles.get(el);
          if (styles) {
            el.style.height = styles.height;
            el.style.maxHeight = styles.maxHeight;
            el.style.overflow = styles.overflow;
          }
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('codebase-archaeologist-report.pdf');
      
      toast({
        title: "Export Successful",
        description: "Your PDF report has been downloaded.",
      });

    } catch (error) {
      console.error("PDF Export Error:", error);
      toast({
        variant: "destructive",
        title: "Export Failed",
        description: "An unexpected error occurred while generating the PDF.",
      });
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
        <Link href="/" className="flex items-center gap-2" aria-label="Go to homepage">
          <Icons.logo className="h-6 w-6 text-primary" />
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {isAnalysisPage && (
           <Button variant="outline" size="sm" onClick={handleExport} disabled={isExporting}>
            {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileDown className="mr-2 h-4 w-4" />}
            {isExporting ? 'Exporting...' : 'Export PDF'}
          </Button>
        )}
        <Button variant="ghost" size="icon" asChild>
          <a href="https://github.com/firebase/genkit" target="_blank" rel="noopener noreferrer" aria-label="View on GitHub">
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
        </Button>
        <AuthButton />
      </div>
    </header>
  );
}
