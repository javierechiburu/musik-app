// API para integración con Sonosuite
// Documentación: https://api.sonosuite.com/docs

export interface SonosuiteEarningsResponse {
  artist_id: string;
  total_earnings: number;
  available_balance: number;
  pending_payments: number;
  last_payment_date: string;
  currency: string;
  monthly_breakdown: Array<{
    year: number;
    month: number;
    gross_earnings: number;
    net_earnings: number;
    streams: number;
    downloads: number;
    platform_breakdown: Array<{
      platform: string;
      earnings: number;
      streams: number;
    }>;
  }>;
  lifetime_stats: {
    total_streams: number;
    total_downloads: number;
    total_royalties: number;
    countries_count: number;
    platforms_count: number;
  };
}

export interface SonosuitePaymentRequest {
  artist_id: string;
  amount: number;
  payment_method: "bank_transfer" | "paypal" | "crypto";
  account_details: {
    bank_name?: string;
    account_number?: string;
    routing_number?: string;
    paypal_email?: string;
    crypto_address?: string;
    crypto_currency?: string;
  };
  notes?: string;
}

export interface SonosuitePaymentHistory {
  payments: Array<{
    payment_id: string;
    amount: number;
    status: "pending" | "processing" | "completed" | "failed";
    payment_method: string;
    request_date: string;
    processed_date?: string;
    transaction_id?: string;
    notes?: string;
  }>;
  total_count: number;
  page: number;
  per_page: number;
}

// Configuración de la API
const SONOSUITE_API_BASE =
  process.env.NEXT_PUBLIC_SONOSUITE_API_URL || "https://api.sonosuite.com/v1";
const SONOSUITE_API_KEY = process.env.SONOSUITE_API_KEY;

// Headers por defecto
const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${SONOSUITE_API_KEY}`,
  "X-API-Version": "1.0",
});

/**
 * Obtiene los ingresos del artista desde Sonosuite
 */
export async function fetchArtistEarnings(
  artistId: string
): Promise<SonosuiteEarningsResponse> {
  try {
    const response = await fetch(
      `${SONOSUITE_API_BASE}/artists/${artistId}/earnings`,
      {
        method: "GET",
        headers: getHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Error fetching earnings: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetchArtistEarnings:", error);
    throw error;
  }
}

/**
 * Solicita un pago/retiro desde Sonosuite
 */
export async function requestPayment(
  paymentRequest: SonosuitePaymentRequest
): Promise<{ success: boolean; payment_id?: string; message: string }> {
  try {
    const response = await fetch(`${SONOSUITE_API_BASE}/payments/request`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(paymentRequest),
    });

    if (!response.ok) {
      throw new Error(
        `Error requesting payment: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in requestPayment:", error);
    throw error;
  }
}

/**
 * Obtiene el historial de pagos del artista
 */
export async function fetchPaymentHistory(
  artistId: string,
  page: number = 1,
  perPage: number = 20
): Promise<SonosuitePaymentHistory> {
  try {
    const response = await fetch(
      `${SONOSUITE_API_BASE}/artists/${artistId}/payments?page=${page}&per_page=${perPage}`,
      {
        method: "GET",
        headers: getHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Error fetching payment history: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetchPaymentHistory:", error);
    throw error;
  }
}

/**
 * Obtiene los detalles de un pago específico
 */
export async function fetchPaymentDetails(paymentId: string): Promise<unknown> {
  try {
    const response = await fetch(
      `${SONOSUITE_API_BASE}/payments/${paymentId}`,
      {
        method: "GET",
        headers: getHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Error fetching payment details: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetchPaymentDetails:", error);
    throw error;
  }
}

/**
 * Función mock para desarrollo (cuando no hay API key de Sonosuite)
 */
export function getMockEarningsData(): SonosuiteEarningsResponse {
  return {
    artist_id: "noiss_artist_001",
    total_earnings: 8450.75,
    available_balance: 2100.25,
    pending_payments: 750.5,
    last_payment_date: "2025-07-11",
    currency: "USD",
    monthly_breakdown: [
      {
        year: 2025,
        month: 6,
        gross_earnings: 1250.0,
        net_earnings: 1125.0,
        streams: 45000,
        downloads: 120,
        platform_breakdown: [
          { platform: "Spotify", earnings: 650.0, streams: 25000 },
          { platform: "Apple Music", earnings: 300.0, streams: 12000 },
          { platform: "YouTube Music", earnings: 200.0, streams: 8000 },
          { platform: "Deezer", earnings: 100.0, streams: 3000 },
        ],
      },
      {
        year: 2025,
        month: 5,
        gross_earnings: 980.5,
        net_earnings: 882.45,
        streams: 38000,
        downloads: 95,
        platform_breakdown: [
          { platform: "Spotify", earnings: 520.0, streams: 20000 },
          { platform: "Apple Music", earnings: 240.0, streams: 10000 },
          { platform: "YouTube Music", earnings: 150.5, streams: 6500 },
          { platform: "Deezer", earnings: 70.0, streams: 2500 },
        ],
      },
      {
        year: 2025,
        month: 4,
        gross_earnings: 1100.75,
        net_earnings: 990.68,
        streams: 42000,
        downloads: 110,
        platform_breakdown: [
          { platform: "Spotify", earnings: 580.0, streams: 22000 },
          { platform: "Apple Music", earnings: 270.0, streams: 11000 },
          { platform: "YouTube Music", earnings: 175.75, streams: 7000 },
          { platform: "Deezer", earnings: 75.0, streams: 2000 },
        ],
      },
    ],
    lifetime_stats: {
      total_streams: 2450000,
      total_downloads: 1250,
      total_royalties: 45680.3,
      countries_count: 45,
      platforms_count: 12,
    },
  };
}
