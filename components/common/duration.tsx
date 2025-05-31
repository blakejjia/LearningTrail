import { Duration, durationUtils } from "@/store/models/Duratoin";
import { ThemedText } from "./ThemedText";

export default function DurationWidget({ duration }: { duration: Duration }) {
  if (durationUtils.isZero(duration)) {
    return <ThemedText>Unlimited</ThemedText>;
  }
  return <ThemedText>{durationUtils.toString(duration)}</ThemedText>;
}
