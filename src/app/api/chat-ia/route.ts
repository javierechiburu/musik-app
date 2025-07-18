import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, conversationId } = body;

    console.log("ACAAAA");
    if (!message) {
      return NextResponse.json({ error: "Mensaje requerido" }, { status: 400 });
    }

    // Crear o continuar conversación
    const messages = [
      {
        role: "system" as const,
        content:
          "Eres un asistente experto en música, distribución musical y análisis de datos musicales. Ayudas a artistas con preguntas sobre su carrera, distribución de música, análisis de streaming, marketing musical y todo lo relacionado con la industria musical.",
      },
      {
        role: "user" as const,
        content: message,
      },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
      max_tokens: 1000,
      temperature: 0.7,
    });

    const responseMessage = completion.choices[0]?.message?.content;

    if (!responseMessage) {
      throw new Error("No se recibió respuesta de OpenAI");
    }

    const response = {
      id: Date.now().toString(),
      message: responseMessage,
      conversationId: conversationId || Date.now().toString(),
      timestamp: new Date(),
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error en API chat-ia:", error);

    if (error instanceof Error && error.message.includes("API key")) {
      return NextResponse.json(
        { error: "Error de configuración de OpenAI" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get("conversationId");

    if (!conversationId) {
      return NextResponse.json(
        { error: "ID de conversación requerido" },
        { status: 400 }
      );
    }

    // Por ahora retornamos un historial vacío
    // En una implementación real, aquí consultarías la base de datos
    const messages: any = [];

    return NextResponse.json({ messages }, { status: 200 });
  } catch (error) {
    console.error("Error en API chat-ia GET:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
