import { ThemedView } from "@/components/common/ThemedView";
import { createDuration, durationUtils } from "@/store/models/Duratoin";
import { NonSelectedCategory } from "@/store/models/category";
import { useStore } from "@/store/store";
import { Pressable, Text, View } from "react-native";
import tw from "twrnc";
import { ThemedIcon } from "../../common/ThemedIcon";
import { ThemedText } from "../../common/ThemedText";
import CategoryWidget from "../../common/category";

export default function TodoTile({
  uuid,
  onPress,
}: {
  uuid: string;
  onPress?: () => void;
}) {
  const todo = useStore((state) => state.getTodo(uuid));

  if (!todo) {
    return (
      <ThemedView style={tw`m-4 rounded-2xl`}>
        <View style={tw`flex-1`}>
          <Text>Loading...</Text>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={tw`p-4 rounded-lg`}>
      <Pressable onPress={onPress}>
        <ThemedView
          style={tw`flex-row items-center ${
            todo.details?.identifiedCompleted ? "line-through" : ""
          }`}
        >
          <View
            style={tw`flex-1 ${
              todo.details?.identifiedCompleted ? "opacity-50" : ""
            }`}
          >
            <ThemedText
              type="defaultSemiBold"
              style={tw`text-lg ${
                todo.details?.identifiedCompleted ? "line-through" : ""
              }`}
            >
              {todo.details?.title}
            </ThemedText>
            <View style={tw`flex-row items-center`}>
              <ThemedText
                type="default"
                style={tw`text-sm ${
                  todo.details?.identifiedCompleted ? "line-through" : ""
                }`}
              >
                {durationUtils.toString(
                  todo.details?.time ?? createDuration.fromSeconds(0)
                )}
              </ThemedText>
              <ThemedText type="default">{" · "}</ThemedText>
              <CategoryWidget
                category={todo.category ?? NonSelectedCategory}
                isCompleted={todo.details?.identifiedCompleted}
              />
            </View>
          </View>

          {todo.details?.completed ? (
            <ThemedIcon name="done-all" size={25} />
          ) : (
            todo.details?.identifiedCompleted && (
              <ThemedIcon name="check" size={25} />
            )
          )}
        </ThemedView>
      </Pressable>
    </ThemedView>
  );
}
