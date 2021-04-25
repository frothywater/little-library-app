import {
  addBookChannel,
  addCardChannel,
  adminLoginChannel,
  adminLogoutChannel,
  borrowChannel,
  getCardsChannel,
  managerLoginChannel,
  managerLogoutChannel,
  returnChannel,
  searchBookChannel,
  showCardChannel,
} from "@/shared/channels";
import { LittleLibraryError } from "@/shared/error";
import {
  AdminLoginInfo,
  BookSearchArg,
  BorrowArg,
  ManagerLoginInfo,
  ReturnArg,
} from "@/utilities/typing";
import { BookInfo, CardInfo, Database, Library } from "little-library";
import { answer } from "./ipc";

let db: Database | null;
let library: Library | null;

export default function listen(): void {
  answer(adminLoginChannel, async (info: AdminLoginInfo) => {
    try {
      db = new Database(info.username, info.password, info.database);
      await db.connect();
    } catch {
      throw Error(LittleLibraryError.databaseError);
    }
  });

  answer(managerLoginChannel, async (info: ManagerLoginInfo) => {
    if (!db) throw Error(LittleLibraryError.adminNotLoggedIn);
    try {
      library = new Library(db);
      return await library.checkManager(info.username, info.password);
    } catch {
      throw Error(LittleLibraryError.databaseError);
    }
  });

  answer(adminLogoutChannel, async () => {
    if (library) await library.close();
    library = null;
    db = null;
  });

  answer(managerLogoutChannel, async () => {
    library = null;
  });

  answer(searchBookChannel, async (arg: BookSearchArg) => {
    if (!library) throw Error(LittleLibraryError.managerNotLoggedIn);
    try {
      return await library.searchBook(
        arg.params,
        arg.sortingKey,
        arg.ascending
      );
    } catch {
      throw Error(LittleLibraryError.databaseError);
    }
  });

  answer(getCardsChannel, async () => {
    if (!library) throw Error(LittleLibraryError.managerNotLoggedIn);
    try {
      return await library.getAllCards();
    } catch {
      throw Error(LittleLibraryError.databaseError);
    }
  });

  answer(showCardChannel, async (cardID: number) => {
    if (!library) throw Error(LittleLibraryError.managerNotLoggedIn);
    try {
      return await library.getBorrowedBooks(cardID);
    } catch {
      throw Error(LittleLibraryError.databaseError);
    }
  });

  answer(addBookChannel, async (infos: BookInfo[]) => {
    if (!library) throw Error(LittleLibraryError.managerNotLoggedIn);
    try {
      await library.addBooks(infos);
    } catch {
      throw Error(LittleLibraryError.databaseError);
    }
  });

  answer(addCardChannel, async (info: CardInfo) => {
    if (!library) throw Error(LittleLibraryError.managerNotLoggedIn);
    try {
      await library.addCard(info);
    } catch {
      throw Error(LittleLibraryError.databaseError);
    }
  });

  answer(borrowChannel, async (arg: BorrowArg) => {
    if (!library) throw Error(LittleLibraryError.managerNotLoggedIn);
    try {
      return await library.borrowBook(arg.cardID, arg.bookID, arg.managerID);
    } catch {
      throw Error(LittleLibraryError.databaseError);
    }
  });

  answer(returnChannel, async (arg: ReturnArg) => {
    if (!library) throw Error(LittleLibraryError.managerNotLoggedIn);
    try {
      return await library.returnBook(arg.cardID, arg.bookID);
    } catch {
      throw Error(LittleLibraryError.databaseError);
    }
  });
}
