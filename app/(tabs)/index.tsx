import { ScrollView } from "react-native";

import TodoTile from "@/components/tiles/TodoTile";
import { useStore } from "@/store/store";

export default function HomeScreen() {
  const toDoList = useStore((state) => state.toDoList);
  return (
    <ScrollView>
      {toDoList.map((item) => (
        <TodoTile uuid={item.id} />
      ))}
    </ScrollView>
  );
}
