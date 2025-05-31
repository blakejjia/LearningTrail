import ThemedButton from "@/components/common/ThemedButton";
import { ThemedIcon } from "@/components/common/ThemedIcon";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import CategoryWidget from "@/components/common/category";
import DurationWidget from "@/components/common/duration";
import { rewardToWidget as rewardWidget } from "@/components/common/reward";
import { createDuration } from "@/store/models/Duratoin";
import { useStore } from "@/store/store";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import tw from "twrnc";

export default function TodoPage() {
  const { id } = useLocalSearchParams();
  const [isDoing, setIsDoing] = useState(false);
  const item = useStore((state) => state.getTodo(id as string));

  const [elapsed, setElapsed] = useState(
    item?.details?.usedTime?.milliseconds ?? 0
  );
  const timerRef = useRef<number | null>(null);

  // 页面结束清除计时器
  useEffect(() => {
    return () => {
      setIsDoing(false);
      timerRef.current = null;
    };
  }, []);

  // 每秒更新逻辑
  useEffect(() => {
    if (isDoing) {
      timerRef.current = setInterval(() => {
        setElapsed((prev) => prev + 1000);
      }, 1000);
    } else {
      clearInterval(timerRef.current!);
      timerRef.current = null;
    }

    return () => clearInterval(timerRef.current!);
  }, [isDoing]);

  // 时刻更新计时器
  useEffect(() => {
    useStore
      .getState()
      .setTodoTiming(item!.id, createDuration.fromMilliseconds(elapsed));
  }, [elapsed]);

  if (!item) {
    return (
      <ThemedView>
        <ThemedText type="title">Todo not found</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={tw`p-8 flex-col gap-4`}>
      {/* title */}
      <ThemedText type="title">{item.details?.title}</ThemedText>
      {/* description */}
      <ThemedView style={tw`flex-row items-center gap-2`}>
        {item.category && <CategoryWidget category={item.category} />}
        {item.details?.reward && (
          <>
            <ThemedIcon name="redeem" size={24} />
            {rewardWidget(useStore.getState().currencies, item.details.reward)}
          </>
        )}
        {item.details?.totalTime && (
          <>
            <ThemedIcon name="schedule" size={24} />
            <DurationWidget duration={item.details.totalTime} />
          </>
        )}
      </ThemedView>
      {/* description */}
      {item.details?.description && (
        <ThemedText type="default">{item.details?.description}</ThemedText>
      )}
      {/* completed or not? */}
      {item.details?.usedTime && item.details?.usedTime?.milliseconds > 0 && (
        <ThemedView style={tw`flex-row items-center gap-2`}>
          <ThemedText type="defaultSemiBold">Time used:</ThemedText>
          <DurationWidget duration={item.details.usedTime} />
        </ThemedView>
      )}
      {item.details?.completed ? (
        <ThemedText type="defaultSemiBold" style={tw`text-green-500`}>
          You have completed this todo
        </ThemedText>
      ) : (
        <>
          {/* doing */}
          {isDoing ? (
            <>
              <ThemedButton
                onPress={() => {
                  setIsDoing(false);
                  useStore.getState().saveToDb();
                }}
                title="Pause"
              />
            </>
          ) : item.details?.identifiedCompleted ? (
            <>
              {/* identified completed */}
              <ThemedText type="defaultSemiBold" style={tw`text-yellow-500`}>
                Pending parents' confirmation
              </ThemedText>
              <ThemedButton
                onPress={() => {
                  useStore.getState().identifyAsNotCompleted(item.id);
                }}
                title="I haven't finished this!"
              />
            </>
          ) : (
            <>
              {/* not completed */}
              <ThemedButton
                onPress={() => setIsDoing(true)}
                title={
                  item.details?.usedTime &&
                  item.details?.usedTime?.milliseconds > 0
                    ? "Continue"
                    : "Start Now"
                }
              />
            </>
          )}
          {/* start to do */}
          {isDoing && (
            <ThemedButton
              onPress={() => {
                setIsDoing(false);
                useStore.getState().identifyTodoAsCompleted(item.id);
              }}
              title="I have finished this!"
            />
          )}
        </>
      )}
    </ThemedView>
  );
}
