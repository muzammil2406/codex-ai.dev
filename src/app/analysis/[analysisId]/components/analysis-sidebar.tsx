'use client';
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarContent
} from "@/components/ui/sidebar";
import { Github, BookText, Code, GitMerge, ShieldAlert, Trash2, Settings, User } from "lucide-react";

interface AnalysisSidebarProps {
  repoName: string;
  activeView: string;
  setActiveView: (view: string) => void;
}

export default function AnalysisSidebar({ repoName, activeView, setActiveView }: AnalysisSidebarProps) {
  const menuItems = [
    { id: 'story', label: 'Code Narrative', icon: BookText },
    { id: 'dependencies', label: 'Dependencies', icon: GitMerge },
    { id: 'explorer', label: 'Code Explorer', icon: Code },
    { id: 'tech-debt', label: 'Tech Debt', icon: ShieldAlert },
    { id: 'dead-code', label: 'Dead Code', icon: Trash2 },
  ];

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-3">
          <Github className="h-8 w-8 text-primary-foreground/80"/>
          <div className="flex flex-col">
            <span className="font-headline text-lg font-bold tracking-tight text-primary-foreground whitespace-nowrap">
              {repoName}
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                onClick={() => setActiveView(item.id)}
                isActive={activeView === item.id}
                tooltip={item.label}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Account">
                <User className="h-5 w-5" />
                <span>My Account</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
