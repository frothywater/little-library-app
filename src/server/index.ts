import { LittleLibraryError } from "@/shared/error";
import {
  adminLoginChannel,
  adminLogoutChannel,
  managerLoginChannel,
  managerLogoutChannel,
} from "@/shared/ipcChannel";
import { AdminLoginInfo, ManagerLoginInfo } from "@/utilities/typing";
import { Database, Library } from "little-library";
import { listen } from "./ipc";

let db: Database | null;
let library: Library | null;

listen(adminLoginChannel, async (info: AdminLoginInfo) => {
  try {
    db = new Database(info.username, info.password, info.database);
    await db.connect();
  } catch {
    throw Error(LittleLibraryError.databaseError);
  }
});

listen(managerLoginChannel, async (info: ManagerLoginInfo) => {
  if (!db) throw Error(LittleLibraryError.adminNotLoggedIn);
  try {
    library = new Library(db);
    return await library.checkManager(info.username, info.password);
  } catch {
    throw Error(LittleLibraryError.databaseError);
  }
});

listen(adminLogoutChannel, async () => {
  if (library) await library.close();
  library = null;
  db = null;
});

listen(managerLogoutChannel, async () => {
  library = null;
});
