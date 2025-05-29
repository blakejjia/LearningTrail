import { v4 as uuidv4 } from "uuid";
import { Prize } from "./models/prize";

export type PrizeData = Pick<RewardsSlide, "prizes">;
export const defaultPrizeData: PrizeData = {
  prizes: [
    {
      id: uuidv4(),
      details: {
        title: "Reward 1",
        description: "Reward 1 description",
        requirements: "Reward 1 requirements",
      },
    },
  ],
};

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
