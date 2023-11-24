import { RequestInfo } from "undici-types";

export async function apiClient(url: RequestInfo) {
  try {
    console.log(url);
    const response = await fetch(url);
    return response;
  } catch (error) {
    return error;
  }
}

export class FetchError extends Error {
  response: Response;
  data: {
    message: string;
  };
  constructor({
    message,
    response,
    data,
  }: {
    message: string;
    response: Response;
    data: {
      message: string;
    };
  }) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(message);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError);
    }

    this.name = "FetchError";
    this.response = response;
    this.data = data ?? { message: message };
  }
}

export default async function fetchJson<JSON = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const response = await fetch(input, init);

  if (response.ok) {
    // Parse JSON response only if successful
    const data = await response.json();
    return data;
  } else {
    // Handle error response
    const error = new Error(`Fetch error: ${response.statusText}`);
    error.cause = response;
    throw error;
  }
}
