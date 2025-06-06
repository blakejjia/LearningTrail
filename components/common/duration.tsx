import {
  createDuration,
  Duration,
  durationUtils,
} from "@/store/models/Duratoin";
import { ThemedText } from "./ThemedText";

export default function DurationWidget({
  duration,
  isCompleted,
}: {
  duration?: Duration;
  isCompleted?: boolean;
}) {
  return (
    <ThemedText type={isCompleted ? "strikethrough" : "default"}>
      {durationUtils.toString(duration ?? createDuration.fromSeconds(0))}
    </ThemedText>
  );
}
