import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { Symbols } from "./symbols";

export interface Category {
  id: string;
  name: string;
  description: string;
  symbol: Symbols;
}

export const defaultCategories: Category[] = [
  {
    id: uuidv4(),
    name: "语文",
    description: "语文作业",
    symbol: "BookOpenText",
  },
  {
    id: uuidv4(),
    name: "数学",
    description: "数学作业",
    symbol: "Calculator",
  },
  {
    id: uuidv4(),
    name: "英语",
    description: "英语作业",
    symbol: "CaseSensitive",
  },
  {
    id: uuidv4(),
    name: "物理",
    description: "物理作业",
    symbol: "Atom",
  },
  {
    id: uuidv4(),
    name: "化学",
    description: "化学作业",
    symbol: "TestTube",
  },
  {
    id: uuidv4(),
    name: "生物",
    description: "生物作业",
    symbol: "Dna",
  },
  {
    id: uuidv4(),
    name: "历史",
    description: "历史作业",
    symbol: "History",
  },
  {
    id: uuidv4(),
    name: "地理",
    description: "地理作业",
    symbol: "Map",
  },
];
