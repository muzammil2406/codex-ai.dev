
import Header from "@/components/header";
import SettingsPage from "./components/settings-page";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function Settings() {
  return (
    <SidebarProvider>
      <SidebarInset>
        <div className="flex h-screen flex-col">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <SettingsPage />
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
