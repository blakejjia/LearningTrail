import { Category } from "@/store/models/category";
import tw from "twrnc";
import { ThemedIcon } from "./ThemedIcon";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export default function CategoryWidget({
  category,
  isCompleted,
}: {
  category: Category;
  isCompleted?: boolean;
}) {
  return (
    <ThemedView style={tw`flex-row gap-1 items-center`}>
      <ThemedIcon
        style={isCompleted ? tw`line-through` : undefined}
        name={category.symbol}
        size={24}
      />
      <ThemedText
        style={isCompleted ? tw`line-through` : undefined}
        type="default"
      >
        {category.name}
      </ThemedText>
    </ThemedView>
  );
}
