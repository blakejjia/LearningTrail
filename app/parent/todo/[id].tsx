import { ThemedIcon } from "@/components/common/ThemedIcon";
import { createDuration } from "@/store/models/Duratoin";
import { TodoItem } from "@/store/models/todoItem";
import useStore from "@/store/store";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable } from "react-native";
import tw from "twrnc";

import { ThemedView } from "@/components/common/ThemedView";
import CategorySelector from "@/components/parent/todo/CategorySelector";
import DateSelector from "@/components/parent/todo/DateSelector";
import TimeSelector from "@/components/parent/todo/TimeSelector";
import { Category, NonSelectedCategory } from "@/store/models/category";
import { v4 as uuidv4 } from "uuid";

export default function TodoDetail() {
  const { id } = useLocalSearchParams();
  let todo: TodoItem | null = null;
  if (id) {
    todo = useStore((state) => state.getTodo(id as string));
  }
  const [title, setTitle] = useState(todo?.details?.title || "");
  const [description, setDescription] = useState(
    todo?.details?.description || ""
  );
  const [category, setCategory] = useState<Category>(
    todo?.category || NonSelectedCategory
  );
  const [date, setDate] = useState(todo?.start_time || new Date());
  const [time, setTime] = useState(
    todo?.details?.time || createDuration.fromSeconds(0)
  );

  return (
    <ThemedView style={tw`p-4`}>
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

      <ThemedView style={tw`flex-row gap-2`}>
        <DateSelector date={date} setDate={setDate} />
        <CategorySelector
          category={category}
          setCategory={setCategory}
          categories={useStore((state) => state.categories)}
        />
        <TimeSelector time={time} setTime={setTime} />
      </ThemedView>

      <ThemedView style={tw` flex-row`}>
        <ThemedView style={{ flex: 1 }} />
        <Pressable
          style={tw`m-4 bg-orange-500 rounded-2xl w-15 h-12 items-center justify-center`}
          onPress={() => {
            if (todo === null) {
              useStore.getState().createTodo({
                id: uuidv4(),
                details: {
                  title,
                  description,
                  time,
                },
                start_time: date,
                category,
                created_at: new Date(),
                updated_at: new Date(),
              });
            } else {
              useStore.getState().updateTodo(todo.id, {
                id: todo.id,
                details: {
                  title,
                  description,
                  time,
                },
                start_time: date,
                category,
                created_at: todo.created_at,
                updated_at: new Date(),
              });
            }
            setTitle("");
            setDescription("");
            setCategory(NonSelectedCategory);
            setDate(new Date());
            setTime(createDuration.fromSeconds(0));
            // TODO: pop up a toast saying success
          }}
        >
          <ThemedIcon name="send" style={tw`text-white`} size={24} />
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}
