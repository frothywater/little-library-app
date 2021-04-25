import { BookRow, BookSearchParams } from "little-library";

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
  minYear?: string;
  maxYear?: string;
  minPrice?: string;
  maxPrice?: string;
}

export interface BookSearchArg {
  params: BookSearchParams;
  sortingKey?: keyof BookRow;
  ascending?: boolean;
}

export interface BorrowArg {
  cardID: number;
  bookID: number;
  managerID: number;
}

export interface ReturnArg {
  cardID: number;
  bookID: number;
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

export interface AdminInfo {
  username: string;
  database: string;
}

export interface ManagerInfo {
  id: number;
  username?: string;
  phone?: string;
}
