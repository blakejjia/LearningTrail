import { ScrollView, Text, View } from "react-native";

import { ThemedIcon } from "@/components/common/ThemedIcon";
import TodoTile from "@/components/student/todo/TodoTile";
import { useStore } from "@/store/store";
import { router } from "expo-router";
import tw from "twrnc";

export default function HomeScreen() {
  const toDoList = useStore((state) => state.toDoList);

  if (toDoList.length === 0) {
    return (
      <View style={tw`flex-1 items-center justify-center p-20`}>
        <ThemedIcon name="add" size={64} />
        <Text style={tw`text-xl font-bold text-center`}>
          ask your parent to add your first todo Now!
        </Text>
      </View>
    );
  }

  return (
    <ScrollView>
      {toDoList.map((item) => (
        <TodoTile
          uuid={item.id}
          key={item.id}
          onPress={() => {
            router.push({
              pathname: "/student/todo/[id]",
              params: { id: item.id },
            });
          }}
        />
      ))}
    </ScrollView>
  );
}
