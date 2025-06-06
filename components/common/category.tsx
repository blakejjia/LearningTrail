import { Category } from "@/store/models/category";
import tw from "twrnc";
import { ThemedIcon } from "./ThemedIcon";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export default function CategoryWidget({
  category,
  isCompleted,
}: {
  category?: Category;
  isCompleted?: boolean;
}) {
  return (
    <ThemedView style={tw`flex-row gap-1 items-center justify-center`}>
      {isCompleted ? (
        <ThemedIcon
          name={category?.symbol ?? "category"}
          size={16}
          style={tw`line-through`}
        />
      ) : (
        <ThemedIcon name={category?.symbol ?? "category"} size={24} />
      )}
      <ThemedText type={isCompleted ? "strikethrough" : "default"}>
        {category?.name ?? "General"}
      </ThemedText>
    </ThemedView>
  );
}
