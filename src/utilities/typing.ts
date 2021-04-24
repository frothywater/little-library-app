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

export interface AdminLoginInfo {
  username: string;
  password: string;
  database: string;
}

export interface ManagerLoginInfo {
  username: string;
  password: string;
}
