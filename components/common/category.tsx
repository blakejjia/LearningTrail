import { Category } from "@/store/models/category";
import tw from "twrnc";
import { ThemedIcon } from "./ThemedIcon";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export default function CategoryToWidget({ category }: { category: Category }) {
  return (
    <ThemedView style={tw`flex-row gap-1 items-center`}>
      <ThemedIcon name={category.symbol} size={16} />
      <ThemedText>{category.name}</ThemedText>
    </ThemedView>
  );
}
