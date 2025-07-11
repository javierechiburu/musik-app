"use client";

import { useState } from "react";
import MarketingNavigation from "@/components/marketing/MarketingNavigation";
import MarketingTabContent from "@/components/marketing/MarketingTabContent";

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState("solicitar");

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <MarketingNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      <MarketingTabContent
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
}
