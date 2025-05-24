import { ThemedView } from "@/components/ThemedView";
import { TodoItem } from "@/store/models/todoItem";
import { useStore } from "@/store/store";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import tw from "twrnc";
import { ThemedIcon } from "../ThemedIcon";
import { ThemedText } from "../ThemedText";

export default function TodoTile({
  uuid,
  onPress,
}: {
  uuid: string;
  onPress?: () => void;
}) {
  const [todo, setTodo] = useState<TodoItem | null>(null);
  useEffect(() => {
    const todo = useStore.getState().getTodo(uuid);
    setTodo(todo);
  }, [uuid]);

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
        <ThemedView style={tw`flex-row items-center`}>
          <View style={tw`flex-1`}>
            <ThemedText type="defaultSemiBold" style={tw`text-lg`}>
              {todo.details?.title}
            </ThemedText>
            <View style={tw`flex-row`}>
              <ThemedText type="default" style={tw`text-sm`}>
                {todo.details?.time?.toString()}
              </ThemedText>
              <ThemedText type="default" style={tw`text-sm`}>
                {" · " + todo.details?.category}
              </ThemedText>
            </View>
          </View>

          <ThemedText type="default" style={tw`text-sm`}>
            {onPress && <ThemedIcon name="edit" size={25} />}
          </ThemedText>
        </ThemedView>
      </Pressable>
    </ThemedView>
  );
}
