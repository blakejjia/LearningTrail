import { Prize } from "./models/prize";

export type PrizeData = Pick<PrizesSlide, "prizes">;

export interface PrizesSlide {
  prizes: Prize[];
  getPrize: (id: string) => Prize | null;
  addPrize: (prize: Prize) => void;
  removePrize: (id: string) => void;
}

export const createPrizesSlideSlice = (set: any, get: any): PrizesSlide => ({
  prizes: [],
  getPrize: (id: string) =>
    get().prizes.find((prize: Prize) => prize.id === id) || null,
  addPrize: (prize) => set({ prizes: [...get().prizes, prize] }),
  removePrize: (id) =>
    set({
      prizes: get().prizes.filter((prize: Prize) => prize.id !== id),
    }),
});
