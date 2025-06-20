import { createDuration } from "@/store/models/Duratoin";
import useStore from "@/store/store";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

import ThemedButton, {
  ThemedButtonType,
} from "@/components/common/ThemedButton";
import ThemedSwitch from "@/components/common/ThemedSwitch";
import { ThemedText } from "@/components/common/ThemedText";
import ThemedTextInput, {
  ThemedTextInputType,
} from "@/components/common/ThemedTextInput";
import { ThemedView } from "@/components/common/ThemedView";
import CategorySelector from "@/components/parent/todo/CategorySelector";
import DateSelector from "@/components/parent/todo/DateSelector";
import RewardSelector from "@/components/parent/todo/rewardSelector";
import TimeSelector from "@/components/parent/todo/TimeSelector";
import { Category, NonSelectedCategory } from "@/store/models/category";
import { RewardNone } from "@/store/other/reward";

export default function ModifyTodo() {
  const { id } = useLocalSearchParams();
  const todo = useStore((state) => state.getTodo(id as string));
  const categories = useStore((state) => state.categories);
  const currencies = useStore((state) => state.currencies);
  const removeTodo = useStore((state) => state.removeTodo);
  const updateTodo = useStore((state) => state.updateTodo);

  const [title, setTitle] = useState(todo?.details?.title || "");
  const [description, setDescription] = useState(
    todo?.details?.description || ""
  );
  const [category, setCategory] = useState<Category>(
    todo?.category || NonSelectedCategory
  );
  const [date, setDate] = useState(todo?.start_time || new Date());
  const [time, setTime] = useState(
    todo?.details?.totalTime || createDuration.fromSeconds(0)
  );
  const [reward, setReward] = useState(todo?.details?.reward || RewardNone);
  const [canPause, setCanPause] = useState<boolean>(
    todo?.details?.canPause ?? true
  );

  if (!id || typeof id !== "string") {
    return <ThemedText>Loading...</ThemedText>;
  }
  if (!todo) {
    return <ThemedText>Todo not found</ThemedText>;
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
      <ThemedView style={tw`p-4 gap-4`}>
        <ThemedText type="title">Modify the todo</ThemedText>
        <ThemedTextInput
          value={title}
          onChangeText={setTitle}
          style={tw`text-2xl pl-4`}
          placeholder="Task name"
        />

        <ThemedTextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Description"
          type={ThemedTextInputType.TextInputMultiline}
          style={tw`pl-4`}
        />

        {/* Date, category, timing, */}
        <ThemedText type="defaultSemiBold">Settings</ThemedText>
        <ThemedView style={tw`flex-col gap-2 w-full`}>
          <FlatList
            data={[
              {
                id: "date",
                component: <DateSelector date={date} setDate={setDate} />,
              },
              {
                id: "category",
                component: (
                  <CategorySelector
                    category={category}
                    setCategory={setCategory}
                    categories={categories}
                  />
                ),
              },
              {
                id: "time",
                component: <TimeSelector time={time} setTime={setTime} />,
              },
              {
                id: "reward",
                component: (
                  <RewardSelector
                    reward={reward}
                    setReward={setReward}
                    currencies={currencies}
                  />
                ),
              },
            ]}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item }) => (
              <ThemedView style={tw`flex-1 m-1`}>{item.component}</ThemedView>
            )}
            columnWrapperStyle={tw`justify-between`}
          />
        </ThemedView>

        {/* advanced */}
        <ThemedView style={tw`flex-col gap-2`}>
          <ThemedView style={tw`flex-row gap-2 items-center`}>
            <ThemedText type="defaultSemiBold">Allow pause</ThemedText>
            <ThemedView style={tw`flex-1`} />
            <ThemedSwitch value={canPause} onValueChange={setCanPause} />
          </ThemedView>
        </ThemedView>

        {/* modify or delete */}
        <ThemedView style={tw`flex-row gap-2 items-center`}>
          <ThemedButton
            style={tw`flex-1`}
            title="Delete"
            onPress={() => {
              removeTodo(todo.id).then((success) => {
                if (success) {
                  router.push("/parent/todo");
                }
              });
            }}
          />
          <ThemedButton
            type={ThemedButtonType.primary}
            style={tw`flex-1`}
            title="Modify"
            onPress={() => {
              updateTodo(todo.id, {
                id: todo.id,
                details: {
                  title,
                  description,
                  totalTime: time,
                  canPause,
                },
                start_time: date,
                category,
                created_at: todo.created_at,
                updated_at: new Date(),
              });
              router.back();
              // TODO: pop up a toast saying success
            }}
          />
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}
