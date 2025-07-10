"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const queryClient = new QueryClient({
    defaultOptions: {},
  });

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-900 flex">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        <div className="flex-1 flex flex-col lg:ml-64">
          <Header onMenuToggle={toggleSidebar} />

          <main className="flex-1 pt-16">
            <div className="p-6">{children}</div>
          </main>
        </div>
      </div>
    </QueryClientProvider>
  );
}
