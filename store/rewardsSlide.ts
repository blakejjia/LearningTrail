import { Prize } from "./models/prize";

export type PrizeData = Pick<RewardsSlide, "prizes">;

export interface RewardsSlide {
  prizes: Prize[];
  getPrize: (id: string) => Prize | null;
  addPrize: (prize: Prize) => void;
  removePrize: (id: string) => void;
}

export const createRewardsSlideSlice = (set: any, get: any): RewardsSlide => ({
  prizes: [],
  getPrize: (id: string) =>
    get().prizes.find((prize: Prize) => prize.id === id) || null,
  addPrize: (prize) => set({ prizes: [...get().prizes, prize] }),
  removePrize: (id) =>
    set({
      prizes: get().prizes.filter((prize: Prize) => prize.id !== id),
    }),
});
