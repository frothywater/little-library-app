import { LittleLibraryError } from "@/utilities/error";
import { IpcChannels } from "@/utilities/ipcChannels";
import { AdminLoginInfo, ManagerLoginInfo } from "@/utilities/typing";
import { ipcMain as ipc } from "electron-better-ipc";
import { Database, Library } from "little-library";

let db: Database | undefined;
let library: Library | undefined;

ipc.answerRenderer(IpcChannels.adminLogin, async (info: AdminLoginInfo) => {
  db = new Database(info.username, info.password, info.database);
  try {
    await db.connect();
  } catch {
    throw LittleLibraryError.databaseError;
  }
});

ipc.answerRenderer(IpcChannels.managerLogin, async (info: ManagerLoginInfo) => {
  if (!db) throw LittleLibraryError.adminNotLoggedIn;
  library = new Library(db);
  try {
    const result = await library.checkManager(info.username, info.password);
    if (!result) return undefined;
    else return result.name;
  } catch {
    throw LittleLibraryError.databaseError;
  }
});
