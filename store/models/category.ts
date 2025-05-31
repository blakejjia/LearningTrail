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
