import type { ApiError } from "@/types/api/error.type";

function isApiError(error: unknown): error is ApiError {
  return typeof error == "object" && error !== null && "response" in error;
}

export function handleAxiosError(error: unknown, shouldThrow: boolean): null | never {
  if (isApiError(error)) {
    console.error("API Error:", error.response?.data);
  } else {
    console.log("Unknown Error:", error);
  }

  if (shouldThrow) {
    throw error;
  }
  return null;
}
