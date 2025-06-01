import { Reward } from "../other/reward";
import { Duration } from "./Duratoin";
import { Category } from "./category";

export interface TodoItemDetails {
  title?: string;
  description?: string;
  // timing
  totalTime?: Duration;
  usedTime?: Duration;
  canPause?: boolean;

  // reward regarding
  identifiedCompleted?: boolean;
  completed?: boolean;
  reward?: Reward;
}

export interface TodoItem {
  // general info
  id: string;
  category?: Category;
  created_at?: Date;
  updated_at?: Date;
  // details
  details?: TodoItemDetails;
  // for recurring tasks
  start_time?: Date;
  end_time?: Date;
  rrule?: string;
}
