export class Counter {
  private i = 0;

  public next(): number {
    this.i += 1;
    return this.i - 1;
  }

  public reset(): number {
    this.i = 0;
    return this.i;
  }

  public get value(): number {
    return this.i;
  }
}
