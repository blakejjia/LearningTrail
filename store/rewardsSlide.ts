import { Reward } from "./models/rewards";

export interface RewardsSlide {
  rewards: Reward[];
  setRewards: (rewards: Reward[]) => void;
}

export const createRewardsSlideSlice = (set: any, get: any): RewardsSlide => ({
  rewards: [],
  setRewards: (rewards) => set({ rewards }),
});
