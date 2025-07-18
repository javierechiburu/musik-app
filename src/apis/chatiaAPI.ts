import { axiosInstance } from "@/config/axios/axiosInstance";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ChatRequest {
  message: string;
  conversationId?: string;
}

export interface ChatResponse {
  id: string;
  message: string;
  conversationId: string;
  timestamp: Date;
}

export const sendChatMessage = async (
  request: ChatRequest
): Promise<ChatResponse> => {
  try {
    console.log("ACAAAA");
    const response = await axiosInstance.post("/api/chat-ia", request);

    if (response.status !== 200) {
      throw new Error("Error al enviar mensaje");
    }

    return response.data;
  } catch (error) {
    console.error("Error en sendChatMessage:", error);
    throw error;
  }
};

export const getChatHistory = async (
  conversationId: string
): Promise<ChatMessage[]> => {
  try {
    const response = await axiosInstance.get(`/api/chat-ia/${conversationId}`);

    if (response.status !== 200) {
      throw new Error("Error al obtener historial");
    }

    return response.data.messages;
  } catch (error) {
    console.error("Error en getChatHistory:", error);
    throw error;
  }
};
