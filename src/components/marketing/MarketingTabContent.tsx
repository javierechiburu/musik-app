"use client";

import MarketingRequestForm from "./MarketingRequestForm";
import MarketingRequests from "./MarketingRequests";
import MarketingStandards from "./MarketingStandards";

interface MarketingTabContentProps {
  activeTab: string;
  requestsData: any[];
  standardsData: any[];
  onSubmitRequest: (formData: any) => void;
}

export default function MarketingTabContent({ 
  activeTab, 
  requestsData, 
  standardsData,
  onSubmitRequest
}: MarketingTabContentProps) {
  const renderContent = () => {
    switch (activeTab) {
      case "solicitar":
        return <MarketingRequestForm onSubmit={onSubmitRequest} />;
      
      case "solicitudes":
        return <MarketingRequests requests={requestsData} />;
      
      case "estandares":
        return <MarketingStandards standards={standardsData} />;
      
      default:
        return <MarketingRequestForm onSubmit={onSubmitRequest} />;
    }
  };

  return (
    <div className="space-y-6">
      {renderContent()}
    </div>
  );
}