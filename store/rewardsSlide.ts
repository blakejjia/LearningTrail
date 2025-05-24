import { db, usersTable } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import { Reward } from "./models/rewards";
import { convertStateToData } from "./utils";

export type RewardData = Pick<RewardsSlide, "rewards">;

export interface RewardsSlide {
  rewards: Reward[];
  setRewards: (rewards: Reward[]) => void;
  getReward: (id: string) => Reward | null;
  addReward: (reward: Reward) => void;
  removeReward: (id: string) => void;

  loadFromDb: (uuid: string) => void;
  saveToDb: (uuid: string) => void;
}

export const createRewardsSlideSlice = (set: any, get: any): RewardsSlide => ({
  rewards: [],
  getReward: (id: string) =>
    get().rewards.find((reward: Reward) => reward.id === id) || null,
  setRewards: (rewards) => set({ rewards }),
  addReward: (reward) => set({ rewards: [...get().rewards, reward] }),
  removeReward: (id) =>
    set({
      rewards: get().rewards.filter((reward: Reward) => reward.id !== id),
    }),

  loadFromDb: async (uuid: string) => {
    const data = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, uuid));
    if (data[0].data.rewards) {
      set(data[0].data.rewards);
    } else {
      set({ rewards: [] });
    }
  },
  saveToDb: async (uuid: string) => {
    const newData = convertStateToData(get());

    await db
      .update(usersTable)
      .set({ data: newData })
      .where(eq(usersTable.id, uuid));
  },
});
