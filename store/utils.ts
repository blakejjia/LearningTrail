import { AuthData } from "./authSlide";
import { ModelsData } from "./modelsSlide";
import { PrizeData } from "./rewardsSlide";
import { StoreData, StoreState } from "./store";
import { TodoData } from "./todoSlide";

import * as SecureStore from "expo-secure-store";

export interface SystemFeedback {
  success: boolean;
  message: string;
}

export function convertStateToData(state: StoreState): StoreData {
  const { sessionId: uuid, prizes, toDoList, categories, currencies } = state;

  const system: AuthData = {
    sessionId: uuid,
    parentPassword: state.parentPassword || null,
  };
  const prizeData: PrizeData = { prizes };
  const todoData: TodoData = { toDoList };
  const modelsData: ModelsData = { categories, currencies };

  return {
    system,
    prizes: prizeData,
    todo: todoData,
    models: modelsData,
  };
}

export function convertDataToState(data: StoreData): Partial<StoreState> {
  const { system, prizes, todo, models } = data;
  return {
    ...system,
    ...prizes,
    ...todo,
    ...models,
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
