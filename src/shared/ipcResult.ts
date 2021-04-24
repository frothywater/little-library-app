export interface IpcResult<T, TError> {
  success: boolean;
  value: T;
  error?: TError;
}
