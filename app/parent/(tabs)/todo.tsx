import ThemedButton from "@/components/common/ThemedButton";
import { ThemedIcon } from "@/components/common/ThemedIcon";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import TodoTile from "@/components/student/todo/TodoTile";
import { useStore } from "@/store/store";
import { router } from "expo-router";
import { ScrollView, View } from "react-native";
import tw from "twrnc";

export default function TodoItem() {
  const toDoList = useStore((state) => state.toDoList);

  return (
    <ThemedView style={tw`flex-1`}>
      <ScrollView>
        <ThemedView>
          {toDoList.map((item: any) => (
            <TodoTile
              key={item.id}
              uuid={item.id}
              onPress={() => {
                router.push({
                  pathname: "/parent/todo/[id]",
                  params: { id: item.id },
                });
              }}
            />
          ))}
        </ThemedView>

        <View style={tw`p-4 items-center justify-center w-full`}>
          <ThemedButton
            onPress={() => {
              router.push({
                pathname: "/parent/todo/add",
              });
            }}
            style={tw`p-4 w-2/3 rounded-2xl`}
          >
            <ThemedIcon name="add" size={24} />
            <ThemedText>Add a new todo</ThemedText>
          </ThemedButton>
        </View>
      </ScrollView>
    </ThemedView>
  );
}
