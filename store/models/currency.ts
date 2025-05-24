import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { Symbols } from "./symbols";

export interface Currency {
  id: string;
  name: string;
  symbol: Symbols;
}

export const defaultCurrencies: Currency[] = [
  {
    id: uuidv4(),
    name: "学习币",
    symbol: "CircleDollarSign",
  },
  {
    id: uuidv4(),
    name: "金币",
    symbol: "Gem",
  },
];
