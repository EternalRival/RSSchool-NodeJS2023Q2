export class User {
  constructor(
    public readonly id: string,
    public username: string,
    public age: number,
    public hobbies: string[],
  ) {}

  public static isUser(obj: unknown): boolean {
    if (typeof obj !== 'object' || obj === null) return false;
    return (
      'username' in obj &&
      typeof obj.username === 'string' &&
      'age' in obj &&
      typeof obj.age === 'number' &&
      'hobbies' in obj &&
      Array.isArray(obj.hobbies) &&
      obj.hobbies.every((hobby) => typeof hobby === 'string')
    );
  }
}
