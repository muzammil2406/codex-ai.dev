import { analysisResult, repoMetadata } from "@/lib/mock-data";
import AnalysisDashboard from "./[analysisId]/components/analysis-dashboard";

export default async function AnalysisPage({ params }: { params: { analysisId: string } }) {
  // In a real app, you'd fetch this data based on params.analysisId
  const { analysisId } = params;

  // Forcing a delay to simulate data fetching
  await new Promise(resolve => setTimeout(resolve, 500));

  return (
    <AnalysisDashboard analysisResult={analysisResult} repoMetadata={repoMetadata} />
  );
}
