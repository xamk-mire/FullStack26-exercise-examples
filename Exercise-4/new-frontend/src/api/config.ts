const baseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';

export function getApiBaseUrl(): string {
  return baseUrl.replace(/\/$/, '');
}
