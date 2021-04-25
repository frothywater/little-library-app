import { LittleLibraryError } from "./error";

export type IpcResult<T> = Result<T, LittleLibraryError>;

interface Result<T, TError> {
  value?: T;
  error?: TError;
}
