import { fetchWrapper } from "@/utils/helpers/fetch-wrapper";

export const fetchRetry = {
  get: (url, retries = 1, delay = 500) =>
    fetchWithRetry("GET", url, null, retries, delay),
  post: (url, body, retries = 1, delay = 500) =>
    fetchWithRetry("POST", url, body, retries, delay),
  put: (url, body, retries = 1, delay = 500) =>
    fetchWithRetry("PUT", url, body, retries, delay),
  patch: (url, body, retries = 1, delay = 500) =>
    fetchWithRetry("PATCH", url, body, retries, delay),
  delete: (url, retries = 1, delay = 500) =>
    fetchWithRetry("DELETE", url, null, retries, delay),
};

async function fetchWithRetry(
  method = "GET",
  url,
  body = null,
  maxRetries = 1,
  delayMs = 3000
) {
  let attempt = 0;

  while (attempt <= maxRetries) {
    try {
      const data = await fetchWrapper[method.toLowerCase()](url, body);
      return data;
    } catch (error) {
      attempt++;
      if (typeof error === "string") {
        if (attempt < maxRetries) {
          console.warn(
            `🟡 ${method.toUpperCase()} ${url} failed with message: "${error}", retrying... (attempt ${
              attempt + 1
            })`
          );
          await new Promise((res) => setTimeout(res, delayMs));
        } else {
          console.error(
            `❌ Max retries reached for ${method.toUpperCase()} ${url}`
          );
          throw error;
        }
      } else {
        throw error; // Non-string or network/authorization/server errors
      }
    }
  }
}
