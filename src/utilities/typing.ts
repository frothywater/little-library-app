export enum SnackbarType {
  info = "info",
  error = "error",
  success = "success",
}

export interface SearchParams {
  title?: string;
  author?: string;
  press?: string;
  category?: string;
  minYear?: number;
  maxYear?: number;
  minPrice?: number;
  maxPrice?: number;
}