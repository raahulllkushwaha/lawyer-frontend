import { useQuery } from '@tanstack/react-query';
import api from '../lib/api.js';

// Thin wrapper around react-query for GET endpoints (api already unwraps `data`).
export function useApiQuery(key, url, { params, enabled = true } = {}) {
  return useQuery({
    queryKey: Array.isArray(key) ? key : [key, params],
    queryFn: () => api.get(url, { params }),
    enabled,
  });
}
