
import Header from "@/components/header";
import AccountPage from "./components/account-page";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function Account() {
  return (
    <SidebarProvider>
      <SidebarInset>
        <div className="flex h-screen flex-col">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <AccountPage />
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
