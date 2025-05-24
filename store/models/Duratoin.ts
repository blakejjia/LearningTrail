export class Duration {
  private readonly milliseconds: number;

  private constructor(ms: number) {
    this.milliseconds = ms;
  }

  static fromSeconds(seconds: number): Duration {
    return new Duration(seconds * 1000);
  }

  static fromMinutes(minutes: number): Duration {
    return new Duration(minutes * 60_000);
  }

  static fromMilliseconds(ms: number): Duration {
    return new Duration(ms);
  }

  toSeconds(): number {
    return this.milliseconds / 1000;
  }

  toMinutes(): number {
    return this.milliseconds / 60_000;
  }

  toMilliseconds(): number {
    return this.milliseconds;
  }

  toString(): string {
    const sec = Math.floor(this.milliseconds / 1000);
    const ms = this.milliseconds % 1000;
    return `${sec}s ${ms}ms`;
  }

  add(other: Duration): Duration {
    return new Duration(this.milliseconds + other.milliseconds);
  }

  subtract(other: Duration): Duration {
    return new Duration(this.milliseconds - other.milliseconds);
  }
}
