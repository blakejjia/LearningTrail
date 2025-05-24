import { ThemedIcon } from "@/components/ThemedIcon";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Duration } from "@/store/models/Duratoin";
import useStore from "@/store/store";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import tw from "twrnc";

import { v4 as uuidv4 } from "uuid";

export default function TodoDetail({ id }: { id: string | null }) {
  // create new todo
  if (!id) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState(0);

    return (
      <View style={tw`p-4`}>
        <BottomSheetTextInput
          value={title}
          onChangeText={setTitle}
          style={[{ fontSize: 24 }]}
          placeholder="Task name"
        />

        <BottomSheetTextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Description"
          multiline
        />

        <View style={tw`flex-row gap-2`}>
          <Pressable
            style={tw`rounded-xl p-2 border-2 border-gray-200 flex-row items-center gap-2`}
          >
            <ThemedIcon name="calendar-today" size={24} />
            <Text>Date</Text>
          </Pressable>
          <Pressable
            style={tw`rounded-xl p-2 border-2 border-gray-200 flex-row items-center gap-2`}
          >
            <ThemedIcon name="schedule" size={24} />
            <Text>Time</Text>
          </Pressable>
          <Pressable
            style={tw`rounded-xl p-2 border-2 border-gray-200 flex-row items-center gap-2`}
          >
            <ThemedIcon name="category" size={24} />
            <Text>Category</Text>
          </Pressable>
        </View>

        <View style={tw` flex-row`}>
          <View style={{ flex: 1 }} />
          <Pressable
            style={tw`m-4 bg-orange-500 rounded-2xl w-15 h-12 items-center justify-center`}
            onPress={() => {
              setTitle("");
              setDescription("");
              setCategory("");
              setDate("");
              setTime(0);
              useStore.getState().createTodo({
                id: uuidv4(),
                details: {
                  title,
                  description,
                  category,
                  time: Duration.fromSeconds(time),
                },
                created_at: new Date(),
                updated_at: new Date(),
              });
            }}
          >
            <ThemedIcon name="send" style={tw`text-white`} size={24} />
          </Pressable>
        </View>
      </View>
    );
  }

  // modify existing todo
  const todo = useStore((state) => state.getTodo(id));
  return (
    <ThemedView>
      <ThemedText>Modify todo</ThemedText>
    </ThemedView>
  );
}
