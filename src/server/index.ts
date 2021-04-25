import {
  adminLoginChannel,
  adminLogoutChannel,
  managerLoginChannel,
  managerLogoutChannel,
  searchBookChannel,
} from "@/shared/channels";
import { LittleLibraryError } from "@/shared/error";
import {
  AdminLoginInfo,
  BookSearchArg,
  ManagerLoginInfo,
} from "@/utilities/typing";
import { Database, Library } from "little-library";
import { answer } from "./ipc";

let db: Database | null;
let library: Library | null;

export default function listen(): void {
  answer(adminLoginChannel, async (info: AdminLoginInfo) => {
    try {
      console.log(info);
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
}
