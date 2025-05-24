import { create } from "zustand";
import { createModelsSlide, ModelsData, ModelsSlide } from "./modelsSlide";
import {
  createRewardsSlideSlice,
  RewardData,
  RewardsSlide,
} from "./rewardsSlide";
import { createSystemSlice, SystemData, SystemSlice } from "./systemSlide";
import { createTodoSlice, TodoData, TodoSlice } from "./todoSlide";

export type StoreState = SystemSlice & RewardsSlide & TodoSlice & ModelsSlide;
export type StoreData = {
  system?: SystemData;
  rewards?: RewardData;
  todo?: TodoData;
  models?: ModelsData;
};

export const useStore = create<StoreState>()((set, get) => ({
  ...createSystemSlice(set, get),
  ...createRewardsSlideSlice(set, get),
  ...createTodoSlice(set, get),
  ...createModelsSlide(set, get),
}));

export default useStore;
