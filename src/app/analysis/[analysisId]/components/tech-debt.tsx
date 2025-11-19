'use client';
import type { TechDebtMetrics } from "@/lib/mock-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartTooltip, ChartTooltipContent, ChartContainer } from "@/components/ui/chart";

interface TechDebtProps {
  metrics: TechDebtMetrics;
}

const chartData: any[] = []; // This will be populated from metrics

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col space-y-1">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              {label}
            </span>
            <span className="font-bold text-muted-foreground">
              {payload[0].value}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};


export default function TechDebt({ metrics }: TechDebtProps) {
    const chartData = [
        { name: 'Complexity', value: metrics.complexity, fill: "hsl(var(--chart-1))" },
        { name: 'Duplication', value: metrics.duplication, fill: "hsl(var(--chart-2))" },
        { name: 'Test Coverage', value: metrics.testCoverage, fill: "hsl(var(--chart-3))" },
        { name: 'Outdated Deps', value: metrics.outdatedDependencies, fill: "hsl(var(--chart-4))" },
    ];

    const chartConfig = {
        value: {
            label: 'Score'
        },
        complexity: {
            label: 'Complexity',
            color: 'hsl(var(--chart-1))',
        },
        duplication: {
            label: 'Duplication',
            color: 'hsl(var(--chart-2))',
        },
        testCoverage: {
            label: 'Test Coverage',
            color: 'hsl(var(--chart-3))',
        },
        outdatedDependencies: {
            label: 'Outdated Deps',
            color: 'hsl(var(--chart-4))',
        },
    }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="lg:col-span-4 glassmorphism">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Technical Debt Report</CardTitle>
          <CardDescription>
            An overview of the codebase's health. Higher scores are better.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="h-[300px] w-full">
                <ChartContainer config={chartConfig} className="h-full w-full">
                    <BarChart data={chartData} accessibilityLayer>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="value" radius={4} />
                    </BarChart>
                </ChartContainer>
            </div>
        </CardContent>
      </Card>
      
      <MetricCard title="Overall Score" value={metrics.overallScore} />
      <MetricCard title="Code Complexity" value={metrics.complexity} description="Lower is better" invertScore />
      <MetricCard title="Code Duplication" value={metrics.duplication} description="Lower is better" invertScore />
      <MetricCard title="Test Coverage" value={metrics.testCoverage} description="Higher is better" />
    </div>
  );
}

interface MetricCardProps {
    title: string;
    value: number;
    description?: string;
    invertScore?: boolean;
}

function MetricCard({ title, value, description, invertScore = false }: MetricCardProps) {
    const displayValue = invertScore ? 100 - value : value;
    return (
        <Card className="glassmorphism">
            <CardHeader>
                <CardTitle className="font-headline text-lg">{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-4">
                    <span className="font-headline text-3xl font-bold">{displayValue}</span>
                    <Progress value={displayValue} className="w-full" />
                </div>
            </CardContent>
        </Card>
    );
}
