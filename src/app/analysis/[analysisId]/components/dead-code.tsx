import type { DeadCodeItem } from "@/lib/mock-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface DeadCodeProps {
  items: DeadCodeItem[];
}

export default function DeadCode({ items }: DeadCodeProps) {
    const getConfidenceVariant = (confidence: number): "default" | "secondary" | "destructive" => {
        if (confidence > 90) return "destructive";
        if (confidence > 70) return "default";
        return "secondary";
    };

  return (
    <Card className="glassmorphism">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Dead Code Detector</CardTitle>
        <CardDescription>
          Unused files and functions with a confidence score.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File</TableHead>
              <TableHead>Element</TableHead>
              <TableHead>Lines</TableHead>
              <TableHead className="text-right">Confidence</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-code">{item.file}</TableCell>
                <TableCell className="font-code text-primary">{item.functionName || 'Entire File'}</TableCell>
                <TableCell>{item.lines}</TableCell>
                <TableCell className="text-right">
                    <Badge variant={getConfidenceVariant(item.confidence)}>
                        {item.confidence}%
                    </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
