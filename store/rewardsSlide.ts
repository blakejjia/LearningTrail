import { Prize } from "./models/prize";

export type RewardData = Pick<RewardsSlide, "rewards">;

export interface RewardsSlide {
  rewards: Prize[];
  getReward: (id: string) => Prize | null;
  addReward: (reward: Prize) => void;
  removeReward: (id: string) => void;
}

export const createRewardsSlideSlice = (set: any, get: any): RewardsSlide => ({
  rewards: [],
  getReward: (id: string) =>
    get().rewards.find((reward: Prize) => reward.id === id) || null,
  addReward: (reward) => set({ rewards: [...get().rewards, reward] }),
  removeReward: (id) =>
    set({
      rewards: get().rewards.filter((reward: Prize) => reward.id !== id),
    }),
});
