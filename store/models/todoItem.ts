export interface ToDoItemDetails {
  title: string;
  category: string;
  description: string;
}

export interface ToDoItem {
  id: string;
  category: string;
  details: ToDoItemDetails;
  completed: boolean;
}
