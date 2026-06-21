import { useQuery } from '@tanstack/react-query';
import api from '../lib/api.js';

export function useApiQuery(key, url, { params, enabled = true, ...rest } = {}) {
  return useQuery({
    queryKey: Array.isArray(key) ? key : [key, params],
    queryFn: () => api.get(url, { params }),
    enabled,
    ...rest,
  });
}