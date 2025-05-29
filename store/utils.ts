import { ModelsData } from "./modelsSlide";
import { RewardData } from "./rewardsSlide";
import { StoreState } from "./store";

import { StoreData } from "./store";
import { SystemData } from "./systemSlide";
import { TodoData } from "./todoSlide";

import * as SecureStore from "expo-secure-store";

export function convertStateToData(state: StoreState): StoreData {
  const { sessionId: uuid, rewards, toDoList, categories, currencies } = state;

  const system: SystemData = {
    sessionId: uuid,
  };
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

const SESSION_UUID_KEY = "session_uuid";

export async function getSessionUUID(): Promise<string | null> {
  let uuid = await SecureStore.getItemAsync(SESSION_UUID_KEY);
  return uuid;
}

export async function setSessionUUID(uuid: string) {
  await SecureStore.setItemAsync(SESSION_UUID_KEY, uuid);
}
