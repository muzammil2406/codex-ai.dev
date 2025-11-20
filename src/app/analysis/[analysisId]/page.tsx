import { analysisResult, repoMetadata } from "@/lib/mock-data";
import AnalysisDashboard from "./components/analysis-dashboard";

export default async function AnalysisPage({ params }: { params: { analysisId: string } }) {

  // allow any dynamic route, including "mock-analysis"
  const { analysisId } = params;

  // (Optional) You can use analysisId later to fetch real data
  // For now we ignore it and use mock data

  return (
    <AnalysisDashboard
      analysisResult={analysisResult}
      repoMetadata={repoMetadata}
    />
  );
}
