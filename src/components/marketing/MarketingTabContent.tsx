"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import MarketingRequestForm from "./MarketingRequestForm";
import MarketingRequests from "./MarketingRequests";
import MarketingStandards from "./MarketingStandards";
import {
  validateMarketingFormData,
  type MarketingFormData,
} from "@/apis/emailAPI";
import { processMarketingRequest } from "@/apis/marketingAPI";

interface MarketingTabContentProps {
  readonly activeTab: string;
  readonly onTabChange: (tab: string) => void;
}

export default function MarketingTabContent({
  activeTab,
  onTabChange,
}: MarketingTabContentProps) {
  const queryClient = useQueryClient();

  // Mutation para enviar solicitudes de marketing
  const createRequestMutation = useMutation({
    mutationFn: (formData: MarketingFormData) =>
      processMarketingRequest(formData),
    onSuccess: () => {
      // Invalidar y refetch las solicitudes para mostrar la nueva
      queryClient.invalidateQueries({ queryKey: ["marketing-requests"] });

      // Cambiar a la pestaña de solicitudes
      onTabChange("solicitudes");

      // Mostrar mensaje de éxito
      alert("¡Solicitud enviada exitosamente! Recibirás una respuesta pronto.");
    },
    onError: (error) => {
      console.error("Error al enviar la solicitud:", error);

      // Mostrar mensaje de error específico
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Error desconocido al enviar la solicitud";
      alert(
        `Error: ${errorMessage}\n\nPor favor, intenta nuevamente o contacta al equipo de soporte.`
      );
    },
  });

  const handleSubmitRequest = async (formData: MarketingFormData) => {
    try {
      // Validar los datos del formulario
      validateMarketingFormData(formData);

      // Ejecutar la mutación que procesará el flujo
      createRequestMutation.mutate(formData);
    } catch (error) {
      console.error("Error de validación:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Error de validación";
      alert(`Error de validación: ${errorMessage}`);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "solicitudes":
        return <MarketingRequests />;

      case "estandares":
        return <MarketingStandards />;

      default:
        return (
          <MarketingRequestForm
            onSubmit={handleSubmitRequest}
            isLoading={createRequestMutation.isPending}
          />
        );
    }
  };

  return <div className="space-y-6">{renderContent()}</div>;
}
