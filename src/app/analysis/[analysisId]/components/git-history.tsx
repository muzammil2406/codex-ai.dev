'use client';

import { useState, useEffect } from 'react';
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

import type { Contributor, GitHistoryPoint } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartTooltip, ChartTooltipContent, ChartContainer } from "@/components/ui/chart";
import { ScrollArea } from '@/components/ui/scroll-area';
import ContributorCard from './contributor-card';

interface GitHistoryProps {
  gitHistory: GitHistoryPoint[];
  contributors: Contributor[];
}

const chartConfig = {
  locAdded: { label: "Lines Added", color: "hsl(var(--chart-2))" },
  locDeleted: { label: "Lines Deleted", color: "hsl(var(--chart-4))" },
  commits: { label: "Commits", color: "hsl(var(--chart-1))" }
};

const pieChartColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export default function GitHistory({ gitHistory, contributors }: GitHistoryProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  const pieChartData = contributors.map(c => ({
    name: c.name,
    value: c.commits
  }));

  return (
    <div className="grid gap-6">

      {/* ---------------- Repository Evolution ---------------- */}
      <Card className="glassmorphism">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Repository Evolution</CardTitle>
          <CardDescription>A timeline of commits and lines of code changes per month.</CardDescription>
        </CardHeader>
        <CardContent>
          {isClient ? (
            <ChartContainer config={chartConfig} className="h-[400px] w-full">
              <ResponsiveContainer>
                <BarChart data={gitHistory}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                  <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" />
                  <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="locAdded" fill="var(--color-locAdded)" radius={4} name="Lines Added" />
                  <Bar yAxisId="left" dataKey="locDeleted" fill="var(--color-locDeleted)" radius={4} name="Lines Deleted" />
                  <Line yAxisId="right" type="monotone" dataKey="commits" stroke="var(--color-commits)" strokeWidth={2} dot={false} name="Commits" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : (
            <div className="h-[400px] w-full" />
          )}
        </CardContent>
      </Card>


      {/* ---------------- Top Contributors + Commit Distribution ---------------- */}
      <div className="grid gap-6 md:grid-cols-3">

        {/* ---- Contributors List ---- */}
        <Card className="md:col-span-2 glassmorphism">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Top Contributors</CardTitle>
            <CardDescription>Key individuals shaping the codebase.</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-4 pr-4">
                {contributors.map(c => (
                  <ContributorCard key={c.name} contributor={c} />
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>


        {/* ---- Pie Chart ---- */}
        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Commit Distribution</CardTitle>
            <CardDescription>Share of commits among top contributors.</CardDescription>
          </CardHeader>
          <CardContent>
            {isClient ? (
              <ChartContainer config={{}} className="h-[300px] w-full">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={index} fill={pieChartColors[index % pieChartColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            ) : (
              <div className="h-[300px] w-full" />
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
