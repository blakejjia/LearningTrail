import { createDuration, Duration } from "@/store/models/Duratoin";
import useStore from "@/store/store";
import { router } from "expo-router";
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
import { Reward, RewardNone } from "@/store/other/reward";
import { v4 as uuidv4 } from "uuid";

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category | undefined>(undefined);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState<Duration | undefined>(undefined);
  const [reward, setReward] = useState<Reward>(RewardNone);
  const [canPause, setCanPause] = useState(true);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
      <ThemedView style={tw`p-4 gap-4`}>
        <ThemedText type="title">Add a new todo</ThemedText>
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

        {/* Date, category, timing, reward */}
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
                    categories={useStore((state) => state.categories)}
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
                    currencies={useStore((state) => state.currencies)}
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

        <ThemedButton
          type={ThemedButtonType.primary}
          title="Add"
          onPress={() => {
            useStore.getState().createTodo({
              id: uuidv4(),
              details: {
                title,
                description,
                totalTime: time,
                canPause,
                reward,
              },
              start_time: date,
              category,
              created_at: new Date(),
              updated_at: new Date(),
            });
            router.back();
            setTitle("");
            setDescription("");
            setCategory(NonSelectedCategory);
            setDate(new Date());
            setTime(createDuration.fromSeconds(0));
            // TODO: pop up a toast saying success
          }}
        />
      </ThemedView>
    </SafeAreaView>
  );
}
