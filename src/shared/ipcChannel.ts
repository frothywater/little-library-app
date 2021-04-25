export interface IpcChannel<TArg, TResult> {
  channelName: string;
  askChannel: string;
  answerChannel: string;
  arg: TArg;
  result: TResult;
}

abstract class IpcChannelBase<TArg, TResult>
  implements IpcChannel<TArg, TResult> {
  abstract channelName: string;

  // False properties only to "store" type information, not actually store data
  arg!: TArg;
  result!: TResult;

  get askChannel(): string {
    return `${this.channelName}-ask`;
  }

  get answerChannel(): string {
    return `${this.channelName}-answer`;
  }
}

export function createIpcChannel<TArg, TResult>(
  channelName: string
): IpcChannel<TArg, TResult> {
  // Create local class extends the generic base inside the function
  // Instead of using decorator or mixin, both of which cannot provide extra type information
  class IpcChannelClass extends IpcChannelBase<TArg, TResult> {
    channelName = channelName;
  }

  return new IpcChannelClass();
}
