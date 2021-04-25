import {
  AdminLoginInfo,
  BookSearchArg,
  BorrowArg,
  ManagerLoginInfo,
  ReturnArg,
} from "@/utilities/typing";
import {
  BookInfo,
  BookRow,
  BorrowResult,
  CardInfo,
  CardRow,
  ManagerRow,
} from "little-library";
import { createIpcChannel } from "./ipcChannel";

export const adminLoginChannel = createIpcChannel<AdminLoginInfo, void>(
  "admin-login"
);
export const adminLogoutChannel = createIpcChannel<never, void>("admin-logout");
export const managerLoginChannel = createIpcChannel<
  ManagerLoginInfo,
  ManagerRow | null
>("manager-login");
export const managerLogoutChannel = createIpcChannel<never, void>(
  "manager-logout"
);

export const searchBookChannel = createIpcChannel<BookSearchArg, BookRow[]>(
  "search-book"
);
export const getCardsChannel = createIpcChannel<void, CardRow[]>("get-cards");
export const showCardChannel = createIpcChannel<number, BookRow[]>("show-card");

export const addBookChannel = createIpcChannel<BookInfo[], void>("add-book");
export const addCardChannel = createIpcChannel<CardInfo, void>("add-card");

export const borrowChannel = createIpcChannel<BorrowArg, BorrowResult>(
  "borrow"
);
export const returnChannel = createIpcChannel<ReturnArg, boolean>("return");
