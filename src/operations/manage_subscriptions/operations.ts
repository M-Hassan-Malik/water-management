export class SubscriptionOperations {
  static async helloWorld<T>(value: T): Promise<T> {
    throw new Error(`Method not implemented.${value}`);
  }
}
