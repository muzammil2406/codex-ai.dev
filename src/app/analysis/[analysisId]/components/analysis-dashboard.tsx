'use client';
import { useState } from "react";
import type { AnalysisResult, RepoMetadata } from "@/lib/mock-data";
import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import Header from "@/components/header";
import AnalysisSidebar from "./analysis-sidebar";
import CodeNarrative from "./code-narrative";
import CodeExplorer from "./code-explorer";
import DependencyGraph from "./dependency-graph";
import TechDebt from "./tech-debt";
import DeadCode from "./dead-code";
import GitHistory from "./git-history";

interface AnalysisDashboardProps {
  analysisResult: AnalysisResult;
  repoMetadata: RepoMetadata;
}

export default function AnalysisDashboard({ analysisResult, repoMetadata }: AnalysisDashboardProps) {
  const [activeView, setActiveView] = useState('story');
  
  const renderContent = () => {
    switch (activeView) {
      case 'story': 
        return <CodeNarrative initialStory={analysisResult.story} repoUrl={repoMetadata.repoUrl} />;
      case 'dependencies':
        return <DependencyGraph />;
      case 'explorer':
        return <CodeExplorer fileTree={analysisResult.fileTree} />;
      case 'tech-debt':
        return <TechDebt metrics={analysisResult.techDebt} />;
      case 'dead-code':
        return <DeadCode items={analysisResult.deadCode} />;
      case 'git-history':
        return <GitHistory gitHistory={analysisResult.gitHistory} contributors={analysisResult.contributors} />;
      default: 
        return <CodeNarrative initialStory={analysisResult.story} repoUrl={repoMetadata.repoUrl} />;
    }
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <AnalysisSidebar 
          repoName={repoMetadata.repoName} 
          activeView={activeView} 
          setActiveView={setActiveView} 
        />
      </Sidebar>
      <SidebarInset>
        <div className="flex h-screen flex-col">
            <Header />
            <main id="analysis-content" className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                {renderContent()}
            </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
