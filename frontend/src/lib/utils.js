import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getBackendUrl() {
  const envUrl = (process.env.REACT_APP_BACKEND_URL || '').trim();
  if (!envUrl) {
    return typeof window !== 'undefined' ? window.location.origin : '';
  }
  if (/^https?:\/\//i.test(envUrl)) {
    return envUrl.replace(/\/$/, '');
  }
  const protocol = typeof window !== 'undefined' ? window.location.protocol : 'https:';
  return `${protocol}//${envUrl}`.replace(/\/$/, '');
}
