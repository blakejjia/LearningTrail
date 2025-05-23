import { create } from "zustand";
import { createModelsSlide, ModelsSlide } from "./modelsSlide";
import { createRewardsSlideSlice, RewardsSlide } from "./rewardsSlide";
import { createSystemSlice, SystemSlice } from "./systemSlide";
import { createTodoSlice, TodoSlice } from "./todoSlide";

type StoreState = SystemSlice & RewardsSlide & TodoSlice & ModelsSlide;

const useStore = create<StoreState>()((set, get) => ({
  ...createSystemSlice(set, get),
  ...createRewardsSlideSlice(set, get),
  ...createTodoSlice(set, get),
  ...createModelsSlide(set, get),
}));

export default useStore;
