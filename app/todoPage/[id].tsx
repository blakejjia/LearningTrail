import ThemedButton from "@/components/common/ThemedButton";
import { ThemedIcon } from "@/components/common/ThemedIcon";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { rewardToWidget } from "@/components/common/reward";
import { TodoItem } from "@/store/models/todoItem";
import { useStore } from "@/store/store";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import tw from "twrnc";

export default function TodoPage() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const [item, setItem] = useState<TodoItem | null>(null);
  const [isDoing, setIsDoing] = useState(false);
  useEffect(() => {
    const item = useStore.getState().getTodo(id as string);
    setItem(item);
    if (item?.details?.title) {
      navigation.setOptions({ title: item.details.title });
    }
  }, [id, navigation, isDoing]);

  if (!item) {
    return (
      <ThemedView>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }
  return (
    <ThemedView style={tw`p-8 flex-col gap-4`}>
      {/* title */}
      <ThemedText style={tw`text-2xl font-bold`}>
        {item.details?.title}
      </ThemedText>
      {/* description */}
      <ThemedView style={tw`flex-row items-center gap-2`}>
        <ThemedIcon name="schedule" size={24} />
        <ThemedText>{item.details?.time?.toString() ?? "unlimited"}</ThemedText>
        {item.details?.reward && (
          <>
            <ThemedIcon name="redeem" size={24} />
            {rewardToWidget(
              useStore.getState().currencies,
              item.details.reward
            )}
          </>
        )}
      </ThemedView>
      <ThemedText style={tw`text-lg`}>{item.details?.description}</ThemedText>
      {/* completed */}
      {item.details?.completed ? (
        <ThemedText>You have completed this todo</ThemedText>
      ) : (
        <>
          {/* doing */}
          {isDoing ? (
            <ThemedButton onPress={() => setIsDoing(false)}>
              <ThemedText>Pause</ThemedText>
            </ThemedButton>
          ) : item.details?.identifiedCompleted ? (
            <>
              {/* identified completed */}
              <ThemedText style={tw`font-bold`}>
                Pending parents' confirmation
              </ThemedText>
              <ThemedButton
                onPress={() => {
                  setIsDoing(true);
                  useStore.getState().identifyAsNotCompleted(item.id);
                }}
              >
                <ThemedText>I haven't finished this!</ThemedText>
              </ThemedButton>
            </>
          ) : (
            <>
              {/* not completed */}
              <ThemedButton onPress={() => setIsDoing(true)}>
                <ThemedText>Start Now</ThemedText>
              </ThemedButton>
            </>
          )}
          {/* start to do */}
          {isDoing && (
            <ThemedButton
              onPress={() => {
                setIsDoing(false);
                useStore.getState().identifyTodoAsCompleted(item.id);
              }}
            >
              <ThemedText>I have finished this!</ThemedText>
            </ThemedButton>
          )}
        </>
      )}
    </ThemedView>
  );
}
