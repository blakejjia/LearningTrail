export interface Duration {
  milliseconds: number;
}

// 构造函数
export const createDuration = {
  fromMilliseconds: (ms: number): Duration => ({ milliseconds: ms }),
  fromSeconds: (s: number): Duration => ({ milliseconds: s * 1000 }),
  fromMinutes: (m: number): Duration => ({ milliseconds: m * 60_000 }),
};

// 工具函数
export const durationUtils = {
  toMilliseconds: (d: Duration) => d.milliseconds,
  toSeconds: (d: Duration) => d.milliseconds / 1000,
  toMinutes: (d: Duration) => d.milliseconds / 60_000,
  toString: (d: Duration) => {
    const minutes = Math.floor(d.milliseconds / 60_000);
    const seconds = Math.floor((d.milliseconds % 60_000) / 1000);
    return `${minutes}m ${seconds}s`;
  },
  add: (a: Duration, b: Duration): Duration => ({
    milliseconds: a.milliseconds + b.milliseconds,
  }),
  subtract: (a: Duration, b: Duration): Duration => ({
    milliseconds: a.milliseconds - b.milliseconds,
  }),
  isZero: (d: Duration): boolean => d.milliseconds === 0,
};
