import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { Symbols } from "./symbols";

export interface Category {
  id: string;
  name: string;
  description?: string;
  symbol: Symbols;
}

export const NonSelectedCategory: Category = {
  id: uuidv4(),
  name: "NotSelected",
  symbol: "question-mark",
};

export const defaultCategories: Category[] = [
  {
    id: uuidv4(),
    name: "语文",
    description: "语文作业",
    symbol: "menu-book",
  },
  {
    id: uuidv4(),
    name: "数学",
    description: "数学作业",
    symbol: "calculate",
  },
  {
    id: uuidv4(),
    name: "英语",
    description: "英语作业",
    symbol: "language",
  },
  {
    id: uuidv4(),
    name: "物理",
    description: "物理作业",
    symbol: "science",
  },
  {
    id: uuidv4(),
    name: "化学",
    description: "化学作业",
    symbol: "science",
  },
  {
    id: uuidv4(),
    name: "生物",
    description: "生物作业",
    symbol: "biotech",
  },
  {
    id: uuidv4(),
    name: "历史",
    description: "历史作业",
    symbol: "history",
  },
  {
    id: uuidv4(),
    name: "地理",
    description: "地理作业",
    symbol: "map",
  },
];
