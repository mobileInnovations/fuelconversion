import { useAuthStore } from "@/stores/auth";
import { useLoadingStore } from "@/stores/loading"; // ✅ new global loader
import router from "@/router";
import Swal from "sweetalert2";

export const fetchWrapper = {
  get: request("GET"),
  post: request("POST"),
  patch: request("PATCH"),
  put: request("PUT"),
  delete: request("DELETE"),
};

function request(method) {
  return async (url, body, contentType) => {
    const loadingStore = useLoadingStore();
    loadingStore.startLoading(); // 🧩 start global loader

    const requestOptions = {
      method,
      headers: authHeader(url),
    };

    if (body) {
      if (body instanceof FormData) {
        requestOptions.body = body;
      } else {
        requestOptions.body = JSON.stringify(body);
        requestOptions.headers["Content-Type"] =
          contentType || "application/json";
      }
    } else if (contentType) {
      requestOptions.headers["Content-Type"] = contentType;
    }

    try {
      // 🔁 call with automatic retry for 429
      const response = await fetchWithRetry(url, requestOptions, 3);
      return handleResponse(response);
    } finally {
      loadingStore.stopLoading(); // 🧩 stop global loader
    }
  };
}

/* -------------------
   Retry logic for 429
-------------------- */
async function fetchWithRetry(url, options, maxRetries = 3) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const response = await fetch(url, options);

    if (response.status !== 429) return response; // ✅ success or other error

    // ⚠️ Too many requests
    const retryAfterHeader = response.headers.get("Retry-After");
    const retryAfterSeconds = retryAfterHeader
      ? parseInt(retryAfterHeader, 10)
      : Math.pow(2, attempt + 1);

    console.warn(
      `[429] Too many requests — retrying in ${retryAfterSeconds}s (attempt ${
        attempt + 1
      }/${maxRetries})`,
    );

    // optional user feedback
    Swal.fire({
      icon: "warning",
      title: "Too Many Requests",
      text: `Please wait ${retryAfterSeconds} seconds before retrying.`,
      showConfirmButton: false,
      timer: retryAfterSeconds * 1000,
      timerProgressBar: true,
    });

    await new Promise((res) => setTimeout(res, retryAfterSeconds * 1000));

    if (attempt === maxRetries)
      throw new Error("Too many requests (429) — max retries reached");
  }
}

/* -------------------
   Auth header
-------------------- */
function authHeader(url) {
  const { access_token } = useAuthStore();
  const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL);

  if (isApiUrl && access_token)
    return { Authorization: `Bearer ${access_token}` };
  else return {};
}

/* -------------------
   Response handler
-------------------- */
async function handleResponse(response) {
  const contentType = response.headers.get("content-type");
  const { user, logout } = useAuthStore();

  let data;

  // JSON response
  if (contentType && contentType.includes("application/json")) {
    const text = await response.text();

    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = null;
    }

    if (!response.ok) {
      // 🔒 Unauthorized
      if ([401, 403].includes(response.status) && user) {
        Swal.fire({
          icon: "error",
          title: "Session expired",
          text: "Invalid or expired token. Please login again.",
          footer: "Please contact IT Admin",
          confirmButtonText: "Logout",
          confirmButtonColor: "red",
        }).then((result) => {
          if (result.isConfirmed) logout();
        });

        router.push("/auth/login");
      }

      // ✅ support error / message / statusText
      const error =
        data?.error ||
        data?.message ||
        response.statusText ||
        "Internal Server Error";

      return Promise.reject(error);
    }

    return data;
  }

  // Blob (e.g. file download)
  const blobData = await response.blob();

  if (!response.ok) {
    if (response.status === 429) {
      Swal.fire({
        icon: "warning",
        title: "Too Many Requests",
        text: "Please wait a moment before downloading again.",
        confirmButtonText: "OK",
      });
    }

    return Promise.reject("Unexpected non-JSON error response");
  }

  return blobData;
}
