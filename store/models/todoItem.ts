import { Duration } from "./Duratoin";

export interface TodoItemDetails {
  title?: string;
  category?: string;
  time?: Duration;
  description?: string;
  completed?: boolean;
}

export interface TodoItem {
  // general info
  id: string;
  category?: string;
  created_at?: Date;
  updated_at?: Date;
  // details
  details?: TodoItemDetails;
  // for recurring tasks
  start_time?: Date;
  end_time?: Date;
  rrule?: string;
}
