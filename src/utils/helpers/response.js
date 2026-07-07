export function formatSuccess(message, data = null) {
  return {
    success: true,
    message,
    data,
  };
}

export function formatError(message, error = null) {
  return {
    success: false,
    message,
    error,
  };
}
