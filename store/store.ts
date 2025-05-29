import { create } from "zustand";
import { AuthData, AuthSlice, createAuthSlice } from "./authSlide";
import { createModelsSlide, ModelsData, ModelsSlide } from "./modelsSlide";
import {
  createRewardsSlideSlice,
  PrizeData,
  RewardsSlide,
} from "./rewardsSlide";
import { createTodoSlice, TodoData, TodoSlice } from "./todoSlide";

export type StoreState = AuthSlice & RewardsSlide & TodoSlice & ModelsSlide;
export type StoreData = {
  system: AuthData;
  prizes: PrizeData;
  todo: TodoData;
  models: ModelsData;
};

export const useStore = create<StoreState>()((set, get) => ({
  ...createAuthSlice(set, get),
  ...createRewardsSlideSlice(set, get),
  ...createTodoSlice(set, get),
  ...createModelsSlide(set, get),
}));

export default useStore;
