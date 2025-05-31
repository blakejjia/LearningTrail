import "react-native-get-random-values";
import { Symbols } from "./symbols";

export interface Currency {
  id: string;
  name: string;
  symbol: Symbols;
  amount: number;
}
