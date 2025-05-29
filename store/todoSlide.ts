import { v4 as uuidv4 } from "uuid";
import { Reward } from "./additionalModels/rewards";
import { TodoItem } from "./models/todoItem";

export const defaultTodoList: TodoItem[] = [
  {
    id: uuidv4(),
    category: "1",
    details: {
      title: "Add the todos",
      description: "Add the todos to the list",
      completed: false,
      reward: new Reward(10, "1"),
    },
  },
];

export type TodoData = Pick<TodoSlice, "toDoList">;

export interface TodoSlice {
  toDoList: TodoItem[];

  getTodo: (id: string) => TodoItem | null;
  refreshTodoList: () => void;
  identifyTodoAsCompleted: (id: string) => void;
  identifyAsNotCompleted: (id: string) => void;
  completeTodo: (id: string) => void;
  createTodo: (toDoItem: TodoItem) => void;
  removeToDoItem: (id: string) => void;
}

export const createTodoSlice = (set: any, get: any): TodoSlice => ({
  getTodo: (id: string) =>
    get().toDoList.find((item: TodoItem) => item.id === id) || null,
  toDoList: defaultTodoList,
  refreshTodoList: () => set({ toDoList: get().loadFromDb() }),
  createTodo: (toDoItem) => {
    set({ toDoList: [...get().toDoList, toDoItem] });
    get().saveToDb();
  },
  removeToDoItem: (id) => {
    set({
      toDoList: get().toDoList.filter((item: TodoItem) => item.id !== id),
    });
    get().saveToDb();
  },
  identifyTodoAsCompleted: (id: string) => {
    set({
      toDoList: get().toDoList.map((item: TodoItem) =>
        item.id === id
          ? {
              ...item,
              details: { ...item.details, identifiedCompleted: true },
            }
          : item
      ),
    });
    get().saveToDb();
  },
  identifyAsNotCompleted: (id: string) => {
    set({
      toDoList: get().toDoList.map((item: TodoItem) =>
        item.id === id
          ? {
              ...item,
              details: { ...item.details, identifiedCompleted: false },
            }
          : item
      ),
    });
    get().saveToDb();
  },
  completeTodo: (id: string) => {
    set({
      toDoList: get().toDoList.map((item: TodoItem) =>
        item.id === id
          ? {
              ...item,
              details: { ...item.details, completed: true },
            }
          : item
      ),
    });
    get().saveToDb();
  },
});
