import { ToDoItem } from "./models/todoItem";

export interface TodoSlice {
  toDoList: ToDoItem[];
  setToDoList: (toDoList: ToDoItem[]) => void;
}

export const createTodoSlice = (set: any, get: any): TodoSlice => ({
  toDoList: [],
  setToDoList: (toDoList) => set({ toDoList }),
});
