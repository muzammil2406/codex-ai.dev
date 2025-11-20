
'use client';
import type { Contributor } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUp, ArrowDown } from "lucide-react";

interface ContributorCardProps {
  contributor: Contributor;
}

export default function ContributorCard({ contributor }: ContributorCardProps) {
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`;
    }
    return name.substring(0, 2);
  }

  return (
    <div className="flex items-center gap-4 rounded-lg border border-border/50 p-3 bg-background/50 hover:bg-accent/50 transition-colors">
      <Avatar className="h-12 w-12">
        <AvatarImage src={contributor.avatarUrl} alt={contributor.name} />
        <AvatarFallback>{getInitials(contributor.name)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <p className="font-semibold text-primary-foreground">{contributor.name}</p>
        <p className="text-sm text-muted-foreground">{contributor.commits.toLocaleString()} commits</p>
      </div>
      <div className="flex items-center text-sm gap-4">
        <div className="flex items-center text-green-400">
          <ArrowUp className="h-4 w-4 mr-1" />
          <span>{contributor.locAdded.toLocaleString()}</span>
        </div>
        <div className="flex items-center text-red-400">
          <ArrowDown className="h-4 w-4 mr-1" />
          <span>{contributor.locDeleted.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
