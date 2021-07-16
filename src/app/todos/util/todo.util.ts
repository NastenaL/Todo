// TODO: Check if we can use angular Injectable instead
export class TodoUtil {
  // TODO: Check if we can use getter instead
  public static getId(): string {
    return Math.random().toString(16);
  }
}
