import { ModelsData } from "./modelsSlide";
import { RewardData } from "./rewardsSlide";
import { StoreState } from "./store";

import { StoreData } from "./store";
import { SystemData } from "./systemSlide";
import { TodoData } from "./todoSlide";

export function convertStateToData(state: StoreState): StoreData {
  const { parentPassword, shortId, rewards, toDoList, categories, currencies } =
    state;

  const system: SystemData = { parentPassword, shortId };
  const rewardsData: RewardData = { rewards };
  const todoData: TodoData = { toDoList };
  const modelsData: ModelsData = { categories, currencies };

  return {
    system,
    rewards: rewardsData,
    todo: todoData,
    models: modelsData,
  };
}
