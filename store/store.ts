import { create } from "zustand";
import { AuthData, AuthSlice, createAuthSlice } from "./authSlide";
import { createModelsSlide, ModelsData, ModelsSlide } from "./modelsSlide";
import { createPrizesSlideSlice, PrizeData, PrizesSlide } from "./prizesSlide";
import { createStorageSlide, StorageSlide } from "./storageSlide";
import { createTodoSlice, TodoData, TodoSlice } from "./todoSlide";

export type StoreState = AuthSlice &
  PrizesSlide &
  TodoSlice &
  ModelsSlide &
  StorageSlide;
export type StoreData = {
  auth: AuthData;
  prizes: PrizeData;
  todo: TodoData;
  models: ModelsData;
};

export const useStore = create<StoreState>()((set, get) => ({
  ...createAuthSlice(set, get),
  ...createPrizesSlideSlice(set, get),
  ...createTodoSlice(set, get),
  ...createModelsSlide(set, get),
  ...createStorageSlide(set, get),
}));

export default useStore;
